// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollFactory is PollsStatistics {}

contract PollsStatisticsTest is Test {
    PollFactory public pollFactory;

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // readPollStatistics

    function test_readPollStatistics1() public {
        address voterA = address(1);
        address voterB = address(2);
        address voterC = address(3);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterC);
        pollFactory.vote(pollId, choiceA);
        PollStatistics memory pollStatistics = pollFactory.readPollStatistics(pollId);
        assertEq(pollStatistics.numberOfValidVotes, 3);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
    }

    function test_readPollStatistics2() public {
        address voterA = address(1);
        address voterB = address(2);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismiss(pollId);
        PollStatistics memory pollStatistics = pollFactory.readPollStatistics(pollId);
        assertEq(pollStatistics.numberOfValidVotes, 1);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
    }

    function test_readPollStatistics3() public {
        address voterA = address(1);
        address voterB = address(2);
        address voterC = address(3);
        uint32 pollId = 42;
        uint8 choiceA = 10;
        uint8 choiceB = 20;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterC);
        pollFactory.vote(pollId, BLANK_VOTE);
        PollStatistics memory pollStatistics = pollFactory.readPollStatistics(pollId);
        assertEq(pollStatistics.numberOfValidVotes, 2);
        assertEq(pollStatistics.numberOfBlankVotes, 1);
    }

    function test_readPollStatistics4() public {
        address voterA = address(2);
        address voterB = address(3);
        address voterC = address(4);
        uint32 pollId = 42;
        uint8 choiceA = 11;
        uint8 choiceB = 22;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.startPrank(voterC);
        pollFactory.vote(pollId, BLANK_VOTE);
        pollFactory.dismiss(pollId);
        PollStatistics memory pollStatistics = pollFactory.readPollStatistics(pollId);
        assertEq(pollStatistics.numberOfValidVotes, 2);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
    }

    // vote

    function test_vote_updates_poll_results() public {
        address voterA = address(1);
        address voterB = address(2);
        address voterC = address(3);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint8 numChoices = 3;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterC);
        pollFactory.vote(pollId, choiceB);
        uint256[] memory pollResults = pollFactory.readPollResults(pollId, numChoices);
        assertEq(pollResults[choiceA], 1);
        assertEq(pollResults[choiceB], 2);
    }

    function test_vote_checks_choice_is_valid() public {
        address voter = address(1);
        uint32 pollId = 42;
        vm.startPrank(voter);
        vm.expectRevert(ErrorInvalidVote.selector);
        pollFactory.vote(pollId, VOTE_NONE);
        vm.stopPrank();
    }

    // dismiss

    function test_dismiss_checks_choice_exists1() public {
        address voter = address(1);
        uint32 pollId = 42;
        vm.startPrank(voter);
        vm.expectRevert(ErrorCannotDismiss.selector);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
    }

    function test_dismiss_checks_choice_exists2() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(voter);
        pollFactory.vote(pollId, choice);
        pollFactory.dismiss(pollId);
        vm.expectRevert(ErrorCannotDismiss.selector);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
    }

    function test_dismiss_updates_poll_results() public {
        address voterA = address(1);
        address voterB = address(2);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint8 numChoices = 3;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
        uint256[] memory pollResults = pollFactory.readPollResults(pollId, numChoices);
        assertEq(pollResults[choiceA], 0);
        assertEq(pollResults[choiceB], 1);
    }
}

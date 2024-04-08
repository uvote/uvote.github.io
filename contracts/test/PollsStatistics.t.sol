// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollsStatisticsTest is Test {
    PollsStatistics public pollsStatistics;

    function setUp() public {
        pollsStatistics = new PollsStatistics();
    }

    function test_readPollStatistics1() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        address voterC = address(4);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        address statisticsConsumer = address(9);
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voterA, choiceA);
        pollsStatistics.vote(pollId, voterB, choiceB);
        pollsStatistics.vote(pollId, voterC, choiceA);
        vm.stopPrank();
        vm.prank(statisticsConsumer);
        PollStatistics memory pollStatistics = pollsStatistics.readPollStatistics(pollFactory, pollId);
        assertEq(pollStatistics.totalNumberOfVotes, 3);
        assertEq(pollStatistics.numberOfValidVotes, 3);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
        assertEq(pollStatistics.uniqueVoters, 3);
    }

    function test_readPollStatistics2() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        address statisticsConsumer = address(9);
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voterA, choiceA);
        pollsStatistics.vote(pollId, voterB, choiceB);
        pollsStatistics.dismissVote(pollId, voterA, choiceA);
        vm.stopPrank();
        vm.prank(statisticsConsumer);
        PollStatistics memory pollStatistics = pollsStatistics.readPollStatistics(pollFactory, pollId);
        assertEq(pollStatistics.totalNumberOfVotes, 1);
        assertEq(pollStatistics.numberOfValidVotes, 1);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
        assertEq(pollStatistics.uniqueVoters, 2);
    }

    function test_vote_updates_poll_results() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        address voterC = address(4);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint8 numChoices = 3;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voterA, choiceA);
        pollsStatistics.vote(pollId, voterB, choiceB);
        pollsStatistics.vote(pollId, voterC, choiceB);
        vm.stopPrank();
        uint32[] memory pollResults = pollsStatistics.readPollResults(pollFactory, pollId, numChoices);
        assertEq(pollResults[choiceA], 1);
        assertEq(pollResults[choiceB], 2);
    }

    function test_vote_checks_choice_happens_once() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voter, choice);
        vm.expectRevert(ErrorChoiceAlreadyExists.selector);
        pollsStatistics.vote(pollId, voter, choice);
        vm.stopPrank();
    }

    function test_dismissVote_checks_choice_exists1() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        vm.expectRevert(ErrorChoiceDoesNotExist.selector);
        pollsStatistics.dismissVote(pollId, voter, choice);
        vm.stopPrank();
    }

    function test_dismissVote_checks_choice_exists2() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voter, choice);
        pollsStatistics.dismissVote(pollId, voter, choice);
        vm.expectRevert(ErrorChoiceDoesNotExist.selector);
        pollsStatistics.dismissVote(pollId, voter, choice);
        vm.stopPrank();
    }

    function test_dismissVote_updates_poll_results() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        uint32 pollId = 42;
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint8 numChoices = 3;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voterA, choiceA);
        pollsStatistics.vote(pollId, voterB, choiceB);
        pollsStatistics.dismissVote(pollId, voterA, choiceA);
        vm.stopPrank();
        uint32[] memory pollResults = pollsStatistics.readPollResults(pollFactory, pollId, numChoices);
        assertEq(pollResults[choiceA], 0);
        assertEq(pollResults[choiceB], 1);
    }
}

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
        uint8 choiceA = 0;
        uint8 choiceB = 1;
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
        pollFactory.dismissVote(pollId, choiceA);
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
        pollFactory.blankVote(pollId);
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
        pollFactory.blankVote(pollId);
        pollFactory.dismissBlankVote(pollId);
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

    function test_vote_checks_voter_choices_once() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice1 = 1;
        uint8 choice2 = 2;
        vm.startPrank(voter);
        pollFactory.vote(pollId, choice1);
        vm.expectRevert(ErrorValidVoteAlreadyExists.selector);
        pollFactory.vote(pollId, choice2);
        vm.stopPrank();
    }

    function test_vote_checks_voter_did_not_a_blank_vote() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(voter);
        pollFactory.blankVote(pollId);
        vm.expectRevert(ErrorVoterDidBlankVote.selector);
        pollFactory.vote(pollId, choice);
        vm.stopPrank();
    }

    // dismissVote

    function test_dismissVote_checks_choice_exists1() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(voter);
        vm.expectRevert(ErrorValidVoteDoesNotExist.selector);
        pollFactory.dismissVote(pollId, choice);
        vm.stopPrank();
    }

    function test_dismissVote_checks_choice_exists2() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(voter);
        pollFactory.vote(pollId, choice);
        pollFactory.dismissVote(pollId, choice);
        vm.expectRevert(ErrorValidVoteDoesNotExist.selector);
        pollFactory.dismissVote(pollId, choice);
        vm.stopPrank();
    }

    function test_dismissVote_updates_poll_results() public {
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
        pollFactory.dismissVote(pollId, choiceA);
        vm.stopPrank();
        uint256[] memory pollResults = pollFactory.readPollResults(pollId, numChoices);
        assertEq(pollResults[choiceA], 0);
        assertEq(pollResults[choiceB], 1);
    }

    // blankVote

    function test_blankVote_checks_choice_happens_once() public {
        address voter = address(1);
        uint32 pollId = 42;
        vm.startPrank(voter);
        pollFactory.blankVote(pollId);
        vm.expectRevert(ErrorBlankVoteAlreadyExists.selector);
        pollFactory.blankVote(pollId);
        vm.stopPrank();
    }

    function test_blankVote_checks_voter_did_not_choose_some_valid_vote() public {
        address voter = address(1);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(voter);
        pollFactory.vote(pollId, choice);
        vm.expectRevert(ErrorVoterDidSomeValidVote.selector);
        pollFactory.blankVote(pollId);
        vm.stopPrank();
    }

    // dismissBlankVote

    function test_dismissBlankVote_checks_blank_vote_exists1() public {
        address voter = address(2);
        uint32 pollId = 42;
        vm.startPrank(voter);
        vm.expectRevert(ErrorBlankVoteDoesNotExist.selector);
        pollFactory.dismissBlankVote(pollId);
        vm.stopPrank();
    }

    function test_dismissBlankVote_checks_blank_vote_exists2() public {
        address voter = address(2);
        uint32 pollId = 42;
        vm.startPrank(voter);
        pollFactory.blankVote(pollId);
        pollFactory.dismissBlankVote(pollId);
        vm.expectRevert(ErrorBlankVoteDoesNotExist.selector);
        pollFactory.dismissBlankVote(pollId);
        vm.stopPrank();
    }
}

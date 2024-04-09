// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollsStatisticsTest is Test {
    PollsStatistics public pollsStatistics;

    function setUp() public {
        pollsStatistics = new PollsStatistics();
    }

    // readPollStatistics

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
        assertEq(pollStatistics.numberOfValidVotes, 3);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
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
        assertEq(pollStatistics.numberOfValidVotes, 1);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
    }

    function test_readPollStatistics3() public {
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
        pollsStatistics.blankVote(pollId, voterC);
        vm.stopPrank();
        vm.prank(statisticsConsumer);
        PollStatistics memory pollStatistics = pollsStatistics.readPollStatistics(pollFactory, pollId);
        assertEq(pollStatistics.numberOfValidVotes, 2);
        assertEq(pollStatistics.numberOfBlankVotes, 1);
    }

    function test_readPollStatistics4() public {
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
        pollsStatistics.blankVote(pollId, voterC);
        pollsStatistics.dismissBlankVote(pollId, voterC);
        vm.stopPrank();
        vm.prank(statisticsConsumer);
        PollStatistics memory pollStatistics = pollsStatistics.readPollStatistics(pollFactory, pollId);
        assertEq(pollStatistics.numberOfValidVotes, 2);
        assertEq(pollStatistics.numberOfBlankVotes, 0);
    }

    // vote

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

    function test_vote_checks_voter_choices_once() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice1 = 1;
        uint8 choice2 = 2;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voter, choice1);
        vm.expectRevert(ErrorValidVoteAlreadyExists.selector);
        pollsStatistics.vote(pollId, voter, choice2);
        vm.stopPrank();
    }

    function test_vote_checks_voter_did_not_a_blank_vote() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        pollsStatistics.blankVote(pollId, voter);
        vm.expectRevert(ErrorVoterDidBlankVote.selector);
        pollsStatistics.vote(pollId, voter, choice);
        vm.stopPrank();
    }

    // dismissVote

    function test_dismissVote_checks_choice_exists1() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        vm.expectRevert(ErrorValidVoteDoesNotExist.selector);
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
        vm.expectRevert(ErrorValidVoteDoesNotExist.selector);
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

    // blankVote

    function test_blankVote_checks_choice_happens_once() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        vm.startPrank(pollFactory);
        pollsStatistics.blankVote(pollId, voter);
        vm.expectRevert(ErrorBlankVoteAlreadyExists.selector);
        pollsStatistics.blankVote(pollId, voter);
        vm.stopPrank();
    }

    function test_blankVote_checks_voter_did_not_choose_some_valid_vote() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        uint8 choice = 1;
        vm.startPrank(pollFactory);
        pollsStatistics.vote(pollId, voter, choice);
        vm.expectRevert(ErrorVoterDidSomeValidVote.selector);
        pollsStatistics.blankVote(pollId, voter);
        vm.stopPrank();
    }

    // dismissBlankVote

    function test_dismissBlankVote_checks_blank_vote_exists1() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        vm.startPrank(pollFactory);
        vm.expectRevert(ErrorBlankVoteDoesNotExist.selector);
        pollsStatistics.dismissBlankVote(pollId, voter);
        vm.stopPrank();
    }

    function test_dismissBlankVote_checks_blank_vote_exists2() public {
        address pollFactory = address(1);
        address voter = address(2);
        uint32 pollId = 42;
        vm.startPrank(pollFactory);
        pollsStatistics.blankVote(pollId, voter);
        pollsStatistics.dismissBlankVote(pollId, voter);
        vm.expectRevert(ErrorBlankVoteDoesNotExist.selector);
        pollsStatistics.dismissBlankVote(pollId, voter);
        vm.stopPrank();
    }
}

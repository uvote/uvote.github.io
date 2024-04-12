// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollFactory is PollsStatistics {}

contract PollsStatisticsTest is Test {
    PollFactory public pollFactory;

    address immutable voterA = address(1);
    address immutable voterB = address(2);
    address immutable voterC = address(3);

    uint32 immutable pollId = 42;

    uint8 immutable choiceA = 1;
    uint8 immutable choiceB = 2;

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // readPollResults
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_readPollResults1() public {
        uint8 numChoices = 1;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 1);
    }

    function test_readPollResults2() public {
        uint8 numChoices = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterC);
        pollFactory.vote(pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 2);
        assertEq(results[choiceB], 1);
    }

    function test_readPollResults3() public {
        uint8 numChoices = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterC);
        pollFactory.vote(pollId, BLANK_VOTE);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 1);
        assertEq(results[choiceA], 1);
        assertEq(results[choiceB], 1);
    }

    function test_readPollResults4() public {
        uint8 numChoices = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismiss(pollId);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 0);
        assertEq(results[choiceB], 1);
    }

    // vote
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_vote_updates_poll_results() public {
        uint8 numChoices = 1;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[choiceA], 1);
    }

    function test_vote_can_override_choice() public {
        uint8 numChoices = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        uint256[] memory results1 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results1[choiceA], 1);
        assertEq(results1[choiceB], 0);
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceB);
        uint256[] memory results2 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results2[choiceA], 0);
        assertEq(results2[choiceB], 1);
    }

    function test_vote_checks_choice_is_valid() public {
        vm.startPrank(voterA);
        vm.expectRevert(ErrorInvalidVote.selector);
        pollFactory.vote(pollId, VOTE_NONE);
        vm.stopPrank();
    }

    // dismiss
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_dismiss_updates_poll_results1() public {
        uint8 numChoices = 1;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        uint256[] memory results1 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results1[choiceA], 1);
        vm.prank(voterA);
        pollFactory.dismiss(pollId);
        uint256[] memory results2 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results2[choiceA], 0);
    }

    function test_dismiss_updates_poll_results2() public {
        uint8 numChoices = 2;
        vm.prank(voterA);
        pollFactory.vote(pollId, choiceA);
        vm.prank(voterB);
        pollFactory.vote(pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[choiceA], 0);
        assertEq(results[choiceB], 1);
    }

    function test_dismiss_checks_choice_exists1() public {
        vm.startPrank(voterA);
        vm.expectRevert(ErrorCannotDismiss.selector);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
    }

    function test_dismiss_checks_choice_exists2() public {
        vm.startPrank(voterA);
        pollFactory.vote(pollId, choiceA);
        pollFactory.dismiss(pollId);
        vm.expectRevert(ErrorCannotDismiss.selector);
        pollFactory.dismiss(pollId);
        vm.stopPrank();
    }
}

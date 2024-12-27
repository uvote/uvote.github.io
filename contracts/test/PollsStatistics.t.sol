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

    uint32 immutable pollId1 = 11;
    uint32 immutable pollId2 = 22;
    uint32 immutable pollId3 = 33;
    uint32 immutable pollId4 = 44;
    uint32 immutable pollId5 = 55;

    uint8 immutable choiceA = 1;
    uint8 immutable choiceB = 2;

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // readPollResults
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_readPollResults1() public {
        uint8 numChoices = 1;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 1);
    }

    function test_readPollResults2() public {
        uint8 numChoices = 2;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        pollFactory.upsertChoice(voterB, pollId, choiceB);
        pollFactory.upsertChoice(voterC, pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 2);
        assertEq(results[choiceB], 1);
    }

    function test_readPollResults3() public {
        uint8 numChoices = 2;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        pollFactory.upsertChoice(voterB, pollId, choiceB);
        pollFactory.upsertChoice(voterC, pollId, BLANK_VOTE);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 1);
        assertEq(results[choiceA], 1);
        assertEq(results[choiceB], 1);
    }

    function test_readPollResults4() public {
        uint8 numChoices = 2;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        pollFactory.upsertChoice(voterB, pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismissChoice(pollId);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 0);
        assertEq(results[choiceA], 0);
        assertEq(results[choiceB], 1);
    }

    // upsertChoice
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_upsertChoice_updates_poll_results() public {
        uint8 numChoices = 1;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[choiceA], 1);
    }

    function test_upsertChoice_can_override_choice() public {
        uint8 numChoices = 2;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        uint256[] memory results1 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results1[choiceA], 1);
        assertEq(results1[choiceB], 0);
        pollFactory.upsertChoice(voterA, pollId, choiceB);
        uint256[] memory results2 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results2[choiceA], 0);
        assertEq(results2[choiceB], 1);
    }

    function test_upsertChoice_checks_choice_is_valid() public {
        vm.expectRevert(ErrorInvalidVote.selector);
        pollFactory.upsertChoice(voterA, pollId, VOTE_NONE);
    }

    // dismissChoice
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_dismissChoice_updates_poll_results1() public {
        uint8 numChoices = 1;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        uint256[] memory results1 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results1[choiceA], 1);
        vm.prank(voterA);
        pollFactory.dismissChoice(pollId);
        uint256[] memory results2 = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results2[choiceA], 0);
    }

    function test_dismissChoice_updates_poll_results2() public {
        uint8 numChoices = 2;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        pollFactory.upsertChoice(voterB, pollId, choiceB);
        vm.prank(voterA);
        pollFactory.dismissChoice(pollId);
        vm.stopPrank();
        uint256[] memory results = pollFactory.readPollResults(pollId, numChoices);
        assertEq(results[choiceA], 0);
        assertEq(results[choiceB], 1);
    }

    function test_dismissChoice_checks_choice_exists1() public {
        vm.startPrank(voterA);
        vm.expectRevert(ErrorCannotDismissChoice.selector);
        pollFactory.dismissChoice(pollId);
        vm.stopPrank();
    }

    function test_dismissChoice_checks_choice_exists2() public {
        vm.startPrank(voterA);
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        pollFactory.dismissChoice(pollId);
        vm.expectRevert(ErrorCannotDismissChoice.selector);
        pollFactory.dismissChoice(pollId);
        vm.stopPrank();
    }

    // readPollsOfVoter
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_readPollsOfVoter0() public view {
        uint8 pageSize = 1;
        uint8 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfVoter(voterA, pageSize, pageIndex);
        assertEq(polls.length, 0);
    }

    function test_readPollsOfVoter1() public {
        uint8 pageSize = 1;
        uint8 pageIndex = 0;
        pollFactory.upsertChoice(voterA, pollId, choiceA);
        uint256[] memory polls = pollFactory.readPollsOfVoter(voterA, pageSize, pageIndex);
        assertEq(polls[0], pollId);
    }

    function test_readPollsOfVoter2() public {
        uint8 pageSize = 2;
        uint8 pageIndex = 0;
        pollFactory.upsertChoice(voterA, pollId1, choiceA);
        pollFactory.upsertChoice(voterA, pollId2, choiceB);
        pollFactory.upsertChoice(voterB, pollId3, choiceA);
        pollFactory.upsertChoice(voterB, pollId4, choiceB);
        uint256[] memory pollsA = pollFactory.readPollsOfVoter(voterA, pageSize, pageIndex);
        assertEq(pollsA[0], pollId2);
        assertEq(pollsA[1], pollId1);
        uint256[] memory pollsB = pollFactory.readPollsOfVoter(voterB, pageSize, pageIndex);
        assertEq(pollsB[0], pollId4);
        assertEq(pollsB[1], pollId3);
    }
}

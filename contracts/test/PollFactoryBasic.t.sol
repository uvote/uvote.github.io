// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollFactoryBasic.sol";

contract PollFactoryBasicTest is Test {
    PollFactoryBasic public pollFactory;
    uint256 pollId1;

    address immutable creator1 = address(11);

    address immutable voter1 = address(21);
    address immutable voter2 = address(22);
    address immutable voter3 = address(23);

    string title = "Title";
    string choiceA = "Yes";
    string choiceB = "No";

    string emptyString = "";
    string titleTooLong = "Title_too_long___________________________";
    string choiceTooLong = "choice_too_long__________________";

    function setUp() public {
        pollFactory = new PollFactoryBasic();
        pollId1 = pollFactory.createPoll("Title", "Yes", "No");
    }

    // createPoll
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_createPoll() public {
        vm.prank(creator1);
        uint256 pollId = pollFactory.createPoll(title, choiceA, choiceB);
        PollDetailsBasic memory poll = pollFactory.readPollDetails(pollId);
        assertEq(poll.title, title);
        assertEq(poll.choiceA, choiceA);
        pollFactory.createPoll(title, choiceA, choiceB);
    }

    function test_createPoll_checks_title_is_not_empty() public {
        vm.expectRevert(ErrorEmptyTitle.selector);
        pollFactory.createPoll(emptyString, choiceA, choiceB);
    }

    function test_createPoll_checks_title_is_not_too_long() public {
        vm.expectRevert(ErrorTitleTooLong.selector);
        pollFactory.createPoll(titleTooLong, choiceA, choiceB);
    }

    function test_createPoll_checks_choiceA_is_not_empty() public {
        vm.expectRevert(ErrorEmptyChoice.selector);
        pollFactory.createPoll(title, emptyString, choiceB);
    }

    function test_createPoll_checks_choiceA_is_not_too_long() public {
        vm.expectRevert(ErrorChoiceTooLong.selector);
        pollFactory.createPoll(title, choiceTooLong, choiceB);
    }

    function test_createPoll_checks_choiceB_is_not_empty() public {
        vm.expectRevert(ErrorEmptyChoice.selector);
        pollFactory.createPoll(title, choiceA, emptyString);
    }

    function test_createPoll_checks_choiceB_is_not_too_long() public {
        vm.expectRevert(ErrorChoiceTooLong.selector);
        pollFactory.createPoll(title, choiceA, choiceTooLong);
    }

    // readPollResults
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_readPollResults() public {
        vm.prank(voter1);
        pollFactory.vote(pollId1, INDEX_OF_CHOICE_A);
        vm.prank(voter2);
        pollFactory.vote(pollId1, INDEX_OF_CHOICE_B);
        vm.prank(voter3);
        pollFactory.vote(pollId1, BLANK_VOTE);
        uint256[] memory results = pollFactory.readPollResults(pollId1);
        assertEq(results[NUMBER_OF_BLANK_VOTES], 1);
        assertEq(results[INDEX_OF_CHOICE_A], 1);
        assertEq(results[INDEX_OF_CHOICE_B], 1);
    }

    // vote
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_vote_checks_vote_is_not_none() public {
        vm.expectRevert(ErrorInvalidVote.selector);
        pollFactory.vote(pollId1, VOTE_NONE);
    }

    function test_vote_checks_vote_is_a_valid_choice() public {
        vm.expectRevert(ErrorInvalidVote.selector);
        pollFactory.vote(pollId1, 3);
    }
}

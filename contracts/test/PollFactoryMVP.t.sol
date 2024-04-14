// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollFactoryMVP.sol";

contract PollFactoryTest is Test {
    PollFactoryMVP public pollFactory;
    uint256 pollId1;

    address immutable creator1 = address(11);

    address immutable voter1 = address(21);
    address immutable voter2 = address(22);
    address immutable voter3 = address(23);

    function setUp() public {
        pollFactory = new PollFactoryMVP();
        pollId1 = pollFactory.createPoll("Title", "Yes", "No");
    }

    // createPoll
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_createPoll() public {
        string memory title = "Title";
        string memory choiceA = "Yes";
        string memory choiceB = "No";
        vm.prank(creator1);
        uint256 pollId = pollFactory.createPoll(title, choiceA, choiceB);
        PollDetails memory poll = pollFactory.readPollDetails(pollId);
        assertEq(poll.title, title);
        assertEq(poll.choiceA, choiceA);
        assertEq(poll.choiceB, choiceB);
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
}

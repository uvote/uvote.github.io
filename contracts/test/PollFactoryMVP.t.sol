// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollFactoryMVP.sol";

contract PollFactoryTest is Test {
    PollFactoryMVP public pollFactory;

    function setUp() public {
        pollFactory = new PollFactoryMVP();
    }

    // createPoll

    function test_createPoll() public {
        address creator = address(1);
        vm.prank(creator);
        string memory title = "Title";
        string memory choiceA = "Yes";
        string memory choiceB = "No";
        uint256 pollId = pollFactory.createPoll(title, choiceA, choiceB);
        PollDetails memory poll = pollFactory.readPollDetails(pollId);
        assertEq(poll.title, title);
        assertEq(poll.choiceA, choiceA);
        assertEq(poll.choiceB, choiceB);
    }
}

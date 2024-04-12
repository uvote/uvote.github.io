// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsRegistry.sol";

contract PollFactory is PollsRegistry {
    function createPoll() public returns (uint256) {
        uint256 pollId = registerPoll(msg.sender);
        return pollId;
    }
}

contract PollsRegistryTest is Test {
    PollFactory public pollFactory;

    address immutable creatorA = address(11);
    address immutable creatorB = address(12);

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // getNumberOfPolls
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_getNumberOfPolls() public {
        assertEq(pollFactory.getNumberOfPolls(), 0);
        vm.startPrank(creatorA);
        pollFactory.createPoll();
        assertEq(pollFactory.getNumberOfPolls(), 1);
        vm.startPrank(creatorA);
        pollFactory.createPoll();
        assertEq(pollFactory.getNumberOfPolls(), 2);
        vm.startPrank(creatorB);
        pollFactory.createPoll();
        assertEq(pollFactory.getNumberOfPolls(), 3);
    }

    // registerPoll
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_registerPoll_associates_it_to_creator() public {
        vm.startPrank(creatorA);
        uint256 pollId = pollFactory.createPoll();
        assertEq(pollFactory.readCreatorOfPoll(pollId), creatorA);
    }

    // readPollsOfCreator
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_pollsOfCreator() public {
        vm.startPrank(creatorA);
        uint256 pollId = pollFactory.createPoll();
        uint256[] memory polls = pollFactory.readPollsOfCreator(creatorA, 1, 0);
        assertEq(polls[0], pollId);
    }
}

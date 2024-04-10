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

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // registerPoll

    function test_registerPoll_associates_it_to_creator() public {
        address creator = address(1);
        vm.startPrank(creator);
        uint256 pollId = pollFactory.createPoll();
        assertEq(pollFactory.readCreatorOfPoll(pollId), creator);
    }
}

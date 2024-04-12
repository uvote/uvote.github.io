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

    address immutable creatorA = address(1);

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // registerPoll
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_registerPoll_associates_it_to_creator() public {
        vm.startPrank(creatorA);
        uint256 pollId = pollFactory.createPoll();
        assertEq(pollFactory.readCreatorOfPoll(pollId), creatorA);
    }
}

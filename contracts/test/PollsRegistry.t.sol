// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsRegistry.sol";

contract PollFactory is PollsRegistry {}

contract PollsRegistryTest is Test {
    PollFactory public pollFactory;

    function setUp() public {
        pollFactory = new PollFactory();
    }

    // registerPoll

    function test_registerPoll_associates_it_to_creator() public {
        address creator = address(1);
        uint256 pollId = pollFactory.registerPoll(creator);
        assertEq(pollFactory.readCreatorOfPoll(pollId), creator);
    }
}

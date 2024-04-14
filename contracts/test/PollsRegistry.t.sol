// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsRegistry.sol";

contract PollFactory is PollsRegistry {
    function createPoll() public returns (uint256) {
        return this.registerPoll(msg.sender);
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

    // readPollsOfFactory
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_pollsOfFactory0() public {
        uint8 pageSize = 1;
        uint256 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfFactory(pageSize, pageIndex);
        assertEq(polls.length, 0);
    }

    function test_pollsOfFactory1() public {
        vm.startPrank(creatorA);
        uint256 pollId1 = pollFactory.createPoll();
        uint256 pollId2 = pollFactory.createPoll();
        vm.stopPrank();
        uint8 pageSize = 2;
        uint256 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfFactory(pageSize, pageIndex);
        assertEq(polls[0], pollId2);
        assertEq(polls[1], pollId1);
    }

    function test_pollsOfFactory_pagination() public {
        vm.startPrank(creatorA);
        uint256 pollId1 = pollFactory.createPoll();
        uint256 pollId2 = pollFactory.createPoll();
        uint256 pollId3 = pollFactory.createPoll();
        vm.stopPrank();
        vm.startPrank(creatorB);
        uint256 pollId4 = pollFactory.createPoll();
        uint256 pollId5 = pollFactory.createPoll();
        uint256 pollId6 = pollFactory.createPoll();
        uint256 pollId7 = pollFactory.createPoll();
        uint256 pollId8 = pollFactory.createPoll();
        vm.stopPrank();
        vm.prank(creatorA);
        uint256 pollId9 = pollFactory.createPoll();
        uint8 pageSize = 4;
        uint256[] memory pollsPage1 = pollFactory.readPollsOfFactory(pageSize, 0);
        assertEq(pollsPage1[0], pollId9);
        assertEq(pollsPage1[1], pollId8);
        assertEq(pollsPage1[2], pollId7);
        assertEq(pollsPage1[3], pollId6);
        uint256[] memory pollsPage2 = pollFactory.readPollsOfFactory(pageSize, 1);
        assertEq(pollsPage2[0], pollId5);
        assertEq(pollsPage2[1], pollId4);
        assertEq(pollsPage2[2], pollId3);
        assertEq(pollsPage2[3], pollId2);
        uint256[] memory pollsPage3 = pollFactory.readPollsOfFactory(pageSize, 2);
        assertEq(pollsPage3[0], pollId1);
    }

    // readPollsOfCreator
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_readPollsOfCreator0() public {
        uint8 pageSize = 1;
        uint8 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfCreator(creatorA, pageSize, pageIndex);
        assertEq(polls.length, 0);
    }

    function test_pollsOfCreator1() public {
        vm.startPrank(creatorA);
        uint256 pollId1 = pollFactory.createPoll();
        uint256 pollId2 = pollFactory.createPoll();
        vm.stopPrank();
        uint8 pageSize = 2;
        uint8 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfCreator(creatorA, pageSize, pageIndex);
        assertEq(polls[0], pollId2);
        assertEq(polls[1], pollId1);
    }

    function test_pollsOfCreator2() public {
        uint8 pageIndex = 0;
        vm.prank(creatorA);
        uint256 pollIdA1 = pollFactory.createPoll();
        uint8 pageSizeA = 1;
        uint256[] memory pollsA = pollFactory.readPollsOfCreator(creatorA, pageSizeA, pageIndex);
        assertEq(pollsA[0], pollIdA1);
        vm.startPrank(creatorB);
        uint256 pollIdB1 = pollFactory.createPoll();
        uint256 pollIdB2 = pollFactory.createPoll();
        vm.stopPrank();
        uint8 pageSizeB = 2;
        uint256[] memory pollsB = pollFactory.readPollsOfCreator(creatorB, pageSizeB, pageIndex);
        assertEq(pollsB[0], pollIdB2);
        assertEq(pollsB[1], pollIdB1);
    }

    function test_pollsOfCreator_pagination() public {
        vm.startPrank(creatorA);
        uint256 pollId1 = pollFactory.createPoll();
        uint256 pollId2 = pollFactory.createPoll();
        uint256 pollId3 = pollFactory.createPoll();
        uint256 pollId4 = pollFactory.createPoll();
        uint256 pollId5 = pollFactory.createPoll();
        uint256 pollId6 = pollFactory.createPoll();
        uint256 pollId7 = pollFactory.createPoll();
        uint256 pollId8 = pollFactory.createPoll();
        uint256 pollId9 = pollFactory.createPoll();
        vm.stopPrank();
        uint8 pageSize = 4;
        uint256[] memory pollsPage1 = pollFactory.readPollsOfCreator(creatorA, pageSize, 0);
        assertEq(pollsPage1[0], pollId9);
        assertEq(pollsPage1[1], pollId8);
        assertEq(pollsPage1[2], pollId7);
        assertEq(pollsPage1[3], pollId6);
        uint256[] memory pollsPage2 = pollFactory.readPollsOfCreator(creatorA, pageSize, 1);
        assertEq(pollsPage2[0], pollId5);
        assertEq(pollsPage2[1], pollId4);
        assertEq(pollsPage2[2], pollId3);
        assertEq(pollsPage2[3], pollId2);
        uint256[] memory pollsPage3 = pollFactory.readPollsOfCreator(creatorA, pageSize, 2);
        assertEq(pollsPage3[0], pollId1);
    }

    // myCreatedPolls
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function test_myCreatedPolls() public {
        vm.startPrank(creatorA);
        uint256 pollId1 = pollFactory.createPoll();
        uint256 pollId2 = pollFactory.createPoll();
        uint8 pageSize = 2;
        uint256 pageIndex = 0;
        uint256[] memory polls = pollFactory.readPollsOfCreator(creatorA, pageSize, pageIndex);
        assertEq(polls[0], pollId2);
        assertEq(polls[1], pollId1);
    }
}

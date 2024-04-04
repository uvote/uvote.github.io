// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollsStatisticsTest is Test {
    PollsStatistics public pollsStatistics;

    function setUp() public {
        pollsStatistics = new PollsStatistics();
    }

    function test_votePoll_updates_poll_results() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        uint8 voteA = 0;
        uint8 voteB = 1;
        uint32 pollId = 42;
        uint8 numChoices = 2;
        vm.startPrank(pollFactory);
        pollsStatistics.votePoll(pollId, voterA, voteA);
        pollsStatistics.votePoll(pollId, voterB, voteB);
        uint32[] memory pollResults = pollsStatistics.readPollResults(pollId, numChoices);
        assertEq(pollResults[0], 1);
        assertEq(pollResults[1], 1);
        vm.stopPrank();
    }
}

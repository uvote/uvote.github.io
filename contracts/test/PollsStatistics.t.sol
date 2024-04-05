// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/PollsStatistics.sol";

contract PollsStatisticsTest is Test {
    PollsStatistics public pollsStatistics;

    function setUp() public {
        pollsStatistics = new PollsStatistics();
    }

    function test_readOverallStatistics_uniqueVoters() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        address voterC = address(4);
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint8 choiceC = 3;
        uint32 pollIdA = 42;
        uint32 pollIdB = 43;
        address statisticsConsumer = address(9);
        vm.startPrank(pollFactory);
        pollsStatistics.votePoll(pollIdA, voterA, choiceA);
        pollsStatistics.votePoll(pollIdA, voterB, choiceB);
        pollsStatistics.votePoll(pollIdB, voterA, choiceA);
        pollsStatistics.votePoll(pollIdB, voterC, choiceC);
        vm.stopPrank();
        vm.prank(statisticsConsumer);
        OverallStatistics memory overallStatistics = pollsStatistics.readOverallStatistics();
        assertEq(overallStatistics.uniqueVoters, 3);
        assertEq(overallStatistics.totalNumberOfPolls, 2);
    }

    function test_votePoll_updates_poll_results() public {
        address pollFactory = address(1);
        address voterA = address(2);
        address voterB = address(3);
        uint8 choiceA = 1;
        uint8 choiceB = 2;
        uint32 pollId = 42;
        uint8 numChoices = 3;
        vm.startPrank(pollFactory);
        pollsStatistics.votePoll(pollId, voterA, choiceA);
        pollsStatistics.votePoll(pollId, voterB, choiceB);
        uint32[] memory pollResults = pollsStatistics.readPollResults(pollId, numChoices);
        assertEq(pollResults[choiceA], 1);
        assertEq(pollResults[choiceB], 1);
        vm.stopPrank();
    }
}

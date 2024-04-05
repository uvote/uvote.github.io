// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct OverallStatistics {
    uint32 totalNumberOfPolls;
    uint32 uniqueVoters;
}

/// @title Polls statistics
/// @notice It collects poll results and few basic metrics.
/// @author Gianluca Casati https://fibo.github.io
contract PollsStatistics {
    mapping(bytes32 => mapping(uint8 => uint32)) private pollResults;
    mapping(bytes32 => bool) private seenPoll;
    mapping(address => bool) private seenVoter;
    mapping(bytes32 => mapping(bytes32 => bool)) private seenVoterByPoll;

    // @notice The overall number of polls.
    uint32 private totalNumberOfPolls;

    // @notice The overall number of votes.
    uint64 private totalNumberOfVotes;

    // @notice The number of votes for given poll.
    mapping(bytes32 => uint32) private totalNumberOfVotesByPoll;

    // @notice The overall number of unique voters.
    uint32 private uniqueVoters;

    // @notice The number of unique voters for given poll.
    mapping(bytes32 => uint32) private uniqueVotersByPoll;

    function getPollKey(address pollFactory, uint32 pollId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(pollFactory, pollId));
    }

    function getVoterKey(address pollFactory, uint32 pollId, address voter) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(pollFactory, pollId, voter));
    }

    function readOverallStatistics() external view returns (OverallStatistics memory) {
        return OverallStatistics(totalNumberOfPolls, uniqueVoters);
    }

    function readPollResults(uint32 pollId, uint8 numChoices) external view returns (uint32[] memory) {
        uint32[] memory results = new uint32[](numChoices);
        bytes32 key = getPollKey(msg.sender, pollId);
        uint8 i;
        while (i < numChoices) {
            results[i] = pollResults[key][i];
            i++;
        }
        return results;
    }

    function votePoll(uint32 pollId, address voter, uint8 choice) external {
        if (!seenVoter[voter]) {
            seenVoter[voter] = true;
            uniqueVoters++;
        }

        bytes32 voterKey = getVoterKey(msg.sender, pollId, voter);

        bytes32 pollKey = getPollKey(msg.sender, pollId);

        if (!seenPoll[pollKey]) {
            seenPoll[pollKey] = true;
            totalNumberOfPolls++;
        }

        if (!seenVoterByPoll[pollKey][voterKey]) {
            seenVoterByPoll[pollKey][voterKey] = true;
            uniqueVotersByPoll[pollKey]++;
        }

        pollResults[pollKey][choice]++;
    }
}

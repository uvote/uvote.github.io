// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct PollStatistics {
    uint64 totalNumberOfVotes;
    uint64 numberOfValidVotes;
    uint64 numberOfBlankVotes;
}

// @notice A voter cannot submit the same valid vote twice.
error ErrorValidVoteAlreadyExists();

// @notice A voter cannot submit the same blank vote twice.
error ErrorBlankVoteAlreadyExists();

// @notice A voter cannot submit the a vote if he/she already voted blank.
error ErrorVoterDidBlankVote();

// @notice A voter cannot dismiss a valid vote if it does not exist.
error ErrorValidVoteDoesNotExist();

// @notice A voter cannot dismiss a blank vote if it does not exist.
error ErrorBlankVoteDoesNotExist();

// @notice A voter cannot submit a blank vote if he/she already did a valid vote.
error ErrorVoterDidSomeValidVote();

/// @title Polls statistics
/// @notice It collects poll results and few basic metrics.
/// @author Gianluca Casati https://fibo.github.io
contract PollsStatistics {
    type PollKey is bytes32;
    type VoterKey is bytes32;

    mapping(PollKey => mapping(uint8 => uint32)) private pollResults;
    mapping(VoterKey => bool) private seenBlankVote;
    mapping(VoterKey => bool) private seenValidVote;

    // @notice The total number of votes by given poll: it includes valid votes and blank votes.
    mapping(PollKey => uint32) private totalNumberOfVotes;

    // @notice The number of valid votes by given poll.
    mapping(PollKey => uint32) private numberOfValidVotes;

    // @notice The number of blank votes by given poll.
    mapping(PollKey => uint32) private numberOfBlankVotes;

    function getPollKey(address pollFactory, uint32 pollId) internal pure returns (PollKey) {
        return PollKey.wrap(keccak256(abi.encodePacked(pollFactory, pollId)));
    }

    function getVoterKey(address pollFactory, uint32 pollId, address voter) internal pure returns (VoterKey) {
        return VoterKey.wrap(keccak256(abi.encodePacked(pollFactory, pollId, voter)));
    }

    function readPollStatistics(address pollFactory, uint32 pollId) external view returns (PollStatistics memory) {
        PollKey pollKey = getPollKey(pollFactory, pollId);
        return PollStatistics(totalNumberOfVotes[pollKey], numberOfValidVotes[pollKey], numberOfBlankVotes[pollKey]);
    }

    function readPollResults(address pollFactory, uint32 pollId, uint8 numChoices)
        external
        view
        returns (uint32[] memory)
    {
        uint32[] memory results = new uint32[](numChoices);
        PollKey key = getPollKey(pollFactory, pollId);
        uint8 i;
        while (i < numChoices) {
            results[i] = pollResults[key][i];
            i++;
        }
        return results;
    }

    // @notice A voter can vote her/his choice.
    // @dev The `pollFactory` here is the `msg.sender`.
    function vote(uint32 pollId, address voter, uint8 choice) external {
        // Check that voter did not already choose a blank vote.

        VoterKey voterKey = getVoterKey(msg.sender, pollId, voter);

        if (seenBlankVote[voterKey]) revert ErrorVoterDidBlankVote();

        // Check that valid vote does not exist yet.

        if (seenValidVote[voterKey]) revert ErrorValidVoteAlreadyExists();

        // Increment poll results by given choice.

        PollKey pollKey = getPollKey(msg.sender, pollId);

        pollResults[pollKey][choice]++;
        seenValidVote[voterKey] = true;

        // Increment number of votes on given poll.

        totalNumberOfVotes[pollKey]++;
        numberOfValidVotes[pollKey]++;
    }

    // @notice A vote can be dismissed, in case voter changed her/his mind or voted by mistake.
    function dismissVote(uint32 pollId, address voter, uint8 choice) external {
        // Check that valid vote already exists.

        VoterKey voterKey = getVoterKey(msg.sender, pollId, voter);

        if (!seenValidVote[voterKey]) revert ErrorValidVoteDoesNotExist();

        // Decrement poll results by given choice.

        PollKey pollKey = getPollKey(msg.sender, pollId);

        pollResults[pollKey][choice]--;
        seenValidVote[voterKey] = false;

        // Decrement number of votes on given poll.

        totalNumberOfVotes[pollKey]--;
        numberOfValidVotes[pollKey]--;
    }

    // @notice A voter can choose to do a blank vote.
    // @dev The `pollFactory` here is the `msg.sender`.
    function blankVote(uint32 pollId, address voter) external {
        // Check that voter did not already choose some valid vote.

        VoterKey voterKey = getVoterKey(msg.sender, pollId, voter);

        if (seenValidVote[voterKey]) revert ErrorVoterDidSomeValidVote();

        // Check that blank vote does not exist yet.

        if (seenBlankVote[voterKey]) revert ErrorBlankVoteAlreadyExists();

        // Increment number of votes on given poll.

        PollKey pollKey = getPollKey(msg.sender, pollId);

        seenBlankVote[voterKey] = true;
        totalNumberOfVotes[pollKey]++;
        numberOfBlankVotes[pollKey]++;
    }

    // @notice A blank vote can be dismissed, in case voter changed her/his mind or voted by mistake.
    function dismissBlankVote(uint32 pollId, address voter) external {
        // Check that blank vote already exists.

        VoterKey voterKey = getVoterKey(msg.sender, pollId, voter);

        if (!seenBlankVote[voterKey]) revert ErrorBlankVoteDoesNotExist();

        // Decrement number of votes on given poll.

        PollKey pollKey = getPollKey(msg.sender, pollId);

        seenBlankVote[voterKey] = false;
        totalNumberOfVotes[pollKey]--;
        numberOfBlankVotes[pollKey]--;
    }
}

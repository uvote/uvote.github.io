// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// @notice A voter can submit only one choice per poll, hence total number of votes is the sum of valid votes and blank votes.
// @dev This struct uses 256 bits, for gas optimization.
struct PollStatistics {
    uint256 numberOfValidVotes;
    uint256 numberOfBlankVotes;
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
/// @dev Comments refer to a "poll factory" as a contract that inherits from this.
contract PollsStatistics {
    enum Vote {
        None,
        Valid,
        Blank
    }

    type VoterKey is bytes32;

    mapping(uint256 => mapping(uint8 => uint256)) private pollResults;
    mapping(VoterKey => Vote) private seenVote;

    // @notice The number of valid votes by given poll.
    mapping(uint256 => uint256) private numberOfValidVotes;

    // @notice The number of blank votes by given poll.
    mapping(uint256 => uint256) private numberOfBlankVotes;

    function getVoterKey(address voter, uint256 pollId) internal pure returns (VoterKey) {
        return VoterKey.wrap(keccak256(abi.encodePacked(voter, pollId)));
    }

    function readPollStatistics(uint256 pollId) external view returns (PollStatistics memory) {
        return PollStatistics(numberOfValidVotes[pollId], numberOfBlankVotes[pollId]);
    }

    function readPollResults(uint256 pollId, uint8 numChoices) external view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](numChoices);
        uint8 i;
        while (i < numChoices) {
            results[i] = pollResults[pollId][i];
            i++;
        }
        return results;
    }

    // @notice A voter can vote her/his choice.
    // @dev The voter here is the `msg.sender`.
    function vote(uint256 pollId, uint8 choice) external {
        // Check that voter did not already choose a blank vote.

        VoterKey voterKey = getVoterKey(msg.sender, pollId);

        if (seenVote[voterKey] == Vote.Blank) revert ErrorVoterDidBlankVote();

        // Check that valid vote does not exist yet.

        if (seenVote[voterKey] == Vote.Valid) revert ErrorValidVoteAlreadyExists();

        // Update poll statistics and results by given choice.

        pollResults[pollId][choice]++;
        numberOfValidVotes[pollId]++;
        seenVote[voterKey] = Vote.Valid;
    }

    // @notice A vote can be dismissed, in case voter changed her/his mind or voted by mistake.
    // @dev The voter here is the `msg.sender`.
    function dismissVote(uint256 pollId, uint8 choice) external {
        // Check that valid vote already exists.

        VoterKey voterKey = getVoterKey(msg.sender, pollId);

        if (seenVote[voterKey] != Vote.Valid) revert ErrorValidVoteDoesNotExist();

        // Rollback poll statistics and results.

        pollResults[pollId][choice]--;
        numberOfValidVotes[pollId]--;
        seenVote[voterKey] = Vote.None;
    }

    // @notice A voter can choose to do a blank vote.
    // @dev The voter here is the `msg.sender`.
    function blankVote(uint256 pollId) external {
        // Check that voter did not already choose some valid vote.

        VoterKey voterKey = getVoterKey(msg.sender, pollId);

        if (seenVote[voterKey] == Vote.Valid) revert ErrorVoterDidSomeValidVote();

        // Check that blank vote does not exist yet.

        if (seenVote[voterKey] == Vote.Blank) revert ErrorBlankVoteAlreadyExists();

        // Update poll statistics.

        seenVote[voterKey] = Vote.Blank;
        numberOfBlankVotes[pollId]++;
    }

    // @notice A blank vote can be dismissed, in case voter changed her/his mind or voted by mistake.
    // @dev The voter here is the `msg.sender`.
    function dismissBlankVote(uint256 pollId) external {
        // Check that blank vote already exists.

        VoterKey voterKey = getVoterKey(msg.sender, pollId);

        if (seenVote[voterKey] != Vote.Blank) revert ErrorBlankVoteDoesNotExist();

        // Rollback poll statistics.

        numberOfBlankVotes[pollId]--;
        seenVote[voterKey] = Vote.None;
    }
}

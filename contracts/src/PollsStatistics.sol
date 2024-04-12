// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// @notice A voter can submit only one choice per poll, hence total number of votes is the sum of valid votes and blank votes.
// @dev This struct uses 256 bits, for gas optimization.
struct PollStatistics {
    uint256 numberOfValidVotes;
    uint256 numberOfBlankVotes;
}

// @notice A voter cannot dismiss a choice if vote is none.
error ErrorCannotDismiss();

// @notice A voter cannot vote none.
error ErrorInvalidVote();

// @notice A voter cannot submit the same blank vote twice.
error ErrorBlankVoteAlreadyExists();

// @notice A voter cannot dismiss a blank vote if it does not exist.
error ErrorBlankVoteDoesNotExist();

/// @title Polls statistics
/// @notice It collects poll results and few basic metrics.
/// @author Gianluca Casati https://fibo.github.io
/// @dev Comments refer to a "poll factory" as a contract that inherits from this.
contract PollsStatistics {
  uint8 constant BLANK_VOTE = 255;

    type VoteKey is bytes32;

    mapping(uint256 => mapping(uint8 => uint256)) private pollResults;
    mapping(VoteKey => uint8) private seenVote;

    // @notice The number of valid votes by given poll.
    mapping(uint256 => uint256) private numberOfValidVotes;

    // @notice The number of blank votes by given poll.
    mapping(uint256 => uint256) private numberOfBlankVotes;

    // @notice A key to index a vote, that is an event that involves a voter and a poll.
    function getVoteKey(address voter, uint256 pollId) private pure returns (VoteKey) {
        return VoteKey.wrap(keccak256(abi.encodePacked(voter, pollId)));
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

    // @notice Vote for a choice. It can be a valid vote (1 <= choice < 255) or a blank vote (choice == 255).
    // @dev The voter here is the `msg.sender`.
    function vote(uint256 pollId, uint8 choice) external {
      // Check that choice is a valid vote or blank.

        if (choice == 0) revert ErrorInvalidVote();

        // Update poll statistics and results by given choice.

        VoteKey voteKey = getVoteKey(msg.sender, pollId);

        pollResults[pollId][choice]++;
        numberOfValidVotes[pollId]++;
        seenVote[voteKey] = choice;
    }

    // @notice A voter can choose to do a blank vote.
    // @dev The voter here is the `msg.sender`.
    function blank(uint256 pollId) external {
        // Check that blank vote does not exist yet.

        VoteKey voteKey = getVoteKey(msg.sender, pollId);
        uint8 choice = seenVote[voteKey];

        if (choice == BLANK_VOTE) revert ErrorBlankVoteAlreadyExists();

        // Dismiss valid vote, if any.

        if (choice != 0) pollResults[pollId][choice]--;

        // Update poll statistics.

        seenVote[voteKey] = BLANK_VOTE;
        numberOfBlankVotes[pollId]++;
    }

    // @notice A choice can be dismissed, in case voter changed her/his mind or voted by mistake.
    // @dev The voter here is the `msg.sender`.
    function dismiss(uint256 pollId) external {
        // Check that vote exists.

        VoteKey voteKey = getVoteKey(msg.sender, pollId);
        uint8 choice = seenVote[voteKey];

        if (choice == 0) revert ErrorCannotDismiss();

        // Rollback poll statistics and results.

        if (choice == BLANK_VOTE) {
        numberOfBlankVotes[pollId]--;
        } else {
          pollResults[pollId][choice]--;
        numberOfValidVotes[pollId]--;
        }
        seenVote[voteKey] = 0;
    }
}

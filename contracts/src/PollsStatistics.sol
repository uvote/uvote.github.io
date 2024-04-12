// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @notice A voter cannot dismiss a choice if vote is none.
error ErrorCannotDismiss();

/// @notice A voter cannot vote none.
error ErrorInvalidVote();

/// @dev Used by `seenVote` mapping.
uint8 constant VOTE_NONE = 0;

/// @dev Used by `seenVote` mapping.
uint8 constant BLANK_VOTE = 255;

/// @dev It is used as an index. Poll results return as first element the number of blank votes.
uint8 constant NUMBER_OF_BLANK_VOTES = 0;

/// @title Polls statistics
/// @notice It collects poll results.
/// @author Gianluca Casati https://fibo.github.io
contract PollsStatistics {
    type VoteKey is bytes32;

    mapping(uint256 => mapping(uint8 => uint256)) private pollResults;
    mapping(VoteKey => uint8) private seenVote;

    /// @notice A key to index a vote, that is the choice about a poll by a voter.
    function getVoteKey(address voter, uint256 pollId) private pure returns (VoteKey) {
        return VoteKey.wrap(keccak256(abi.encodePacked(voter, pollId)));
    }

    // @dev It is assumed that `numChoices` is greater than 0 and lower than 255.
    function readPollResults(uint256 pollId, uint8 numChoices) external view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](numChoices + 1);

        // Write number of blank votes.

        results[NUMBER_OF_BLANK_VOTES] = pollResults[pollId][BLANK_VOTE];

        // Write number of votes for every choice other than blank.

        uint8 i = 1;
        while (i <= numChoices) {
            results[i] = pollResults[pollId][i];
            i++;
        }
        return results;
    }

    /// @notice Vote for a choice. It can be called more than once, in that case it overrides the previous choice.
    /// @dev The voter here is the `msg.sender`.
    /// @param pollId The id of the poll.
    /// @param choice The choice can be a valid vote (1 <= choice < 255) or a blank vote (choice == 255).
    function vote(uint256 pollId, uint8 choice) external {
        // Check that choice is a valid vote or blank.

        if (choice == VOTE_NONE) revert ErrorInvalidVote();

        // Revert previous choice, if any.

        VoteKey voteKey = getVoteKey(msg.sender, pollId);
        uint8 previousChoice = seenVote[voteKey];

        if (previousChoice != VOTE_NONE) pollResults[pollId][previousChoice]--;

        // Update poll statistics and results by given choice.

        pollResults[pollId][choice]++;
        seenVote[voteKey] = choice;
    }

    /// @notice A choice can be dismissed, in case voter changed her/his mind or voted by mistake.
    /// @dev The voter here is the `msg.sender`.
    function dismiss(uint256 pollId) external {
        // Check that vote exists.

        VoteKey voteKey = getVoteKey(msg.sender, pollId);
        uint8 choice = seenVote[voteKey];

        if (choice == VOTE_NONE) revert ErrorCannotDismiss();

        // Rollback poll statistics and results.

        pollResults[pollId][choice]--;
        seenVote[voteKey] = VOTE_NONE;
    }
}

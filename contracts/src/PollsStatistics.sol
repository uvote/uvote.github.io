// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @notice A voter cannot dismiss a choice if vote is none.
error ErrorCannotDismissChoice();

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
abstract contract PollsStatistics {
    type VoteKey is bytes32;

    mapping(uint256 => mapping(uint8 => uint256)) private pollResults;
    mapping(VoteKey => uint8) private seenVote;

    /// @dev address creator => uint index => uint pollId
    mapping(address => mapping(uint256 => uint256)) private pollsOfVoter;
    mapping(address => uint256) private pollsVoterNextIndex;

    /// @notice A key to index a vote, that is the choice about a poll by a voter.
    function getVoteKey(address voter, uint256 pollId) private pure returns (VoteKey) {
        return VoteKey.wrap(keccak256(abi.encodePacked(voter, pollId)));
    }

    /// @dev It is assumed that `numChoices` is greater than 0 and lower than 255.
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

    function readPollsOfVoter(address voter, uint8 pageSize, uint256 pageIndex)
        public
        view
        returns (uint256[] memory)
    {
        // If there are no polls, return an empty list
        if (pollsVoterNextIndex[voter] == 0) return new uint256[](0);

        // Populate page with results.

        uint256[] memory polls = new uint256[](pageSize);
        uint256 lastId = pollsVoterNextIndex[voter] - pageSize * pageIndex - 1;
        for (uint256 i = 0; i < pageSize; i++) {
            polls[i] = pollsOfVoter[voter][lastId - i];
            if (lastId - i == 0) break;
        }
        return polls;
    }

    /// @notice Vote for a choice. It can be called more than once, in that case it overrides the previous choice.
    /// @dev The voter here is the `msg.sender`.
    /// @param voter The address of poll voter.
    /// @param pollId The id of the poll.
    /// @param choice The choice can be a valid vote (1 <= choice < 255) or a blank vote (choice == 255).
    function upsertChoice(address voter, uint256 pollId, uint8 choice) external {
        // Check that choice is a valid vote or blank.
        if (choice == VOTE_NONE) revert ErrorInvalidVote();

        // Check if it is the first vote for voter on this poll.

        VoteKey voteKey = getVoteKey(voter, pollId);
        uint8 previousChoice = seenVote[voteKey];

        if (previousChoice == VOTE_NONE) {
            // Add poll to the list of voter polls.
            pollsOfVoter[voter][pollsVoterNextIndex[voter]] = pollId;
            pollsVoterNextIndex[voter]++;
        } else {
            // Revert previous choice.
            pollResults[pollId][previousChoice]--;
        }

        // Update poll statistics and results by given choice.
        pollResults[pollId][choice]++;
        seenVote[voteKey] = choice;
    }

    /// @notice In case a voter changed her/his mind or voted by mistake, the choice can be dismissed.
    /// @dev The voter here is the `msg.sender`.
    function dismissChoice(uint256 pollId) external {
        // Check that vote exists.
        VoteKey voteKey = getVoteKey(msg.sender, pollId);
        uint8 choice = seenVote[voteKey];
        if (choice == VOTE_NONE) revert ErrorCannotDismissChoice();

        // Rollback poll statistics and results.
        pollResults[pollId][choice]--;
        seenVote[voteKey] = VOTE_NONE;
    }
}

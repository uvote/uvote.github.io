// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct PollStatistics {
    uint64 totalNumberOfVotes;
    uint64 numberOfValidVotes;
    uint64 numberOfBlankVotes;
    uint32 uniqueVoters;
}

// @notice A voter cannot submit the same choice twice.
error ErrorChoiceAlreadyExists();

// @notice A voter cannot dismiss a choice if it does not exist.
error ErrorChoiceDoesNotExist();

/// @title Polls statistics
/// @notice It collects poll results and few basic metrics.
/// @author Gianluca Casati https://fibo.github.io
contract PollsStatistics {
    mapping(bytes32 => mapping(uint8 => uint32)) private pollResults;
    mapping(bytes32 => bool) private seenChoice;
    mapping(bytes32 => bool) private seenVoter;

    // @notice The total number of votes by given poll, including blanks.
    mapping(bytes32 => uint32) private totalNumberOfVotes;

    // @notice The number of valid votes by given poll.
    mapping(bytes32 => uint32) private numberOfValidVotes;

    // @notice The number of blank votes by given poll.
    mapping(bytes32 => uint32) private numberOfBlankVotes;

    // @notice The number of unique voters for given poll.
    mapping(bytes32 => uint32) private uniqueVoters;

    function getPollKey(address pollFactory, uint32 pollId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(pollFactory, pollId));
    }

    function getVoterKey(address pollFactory, uint32 pollId, address voter) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(pollFactory, pollId, voter));
    }

    function getChoiceKey(address pollFactory, uint32 pollId, address voter, uint8 choice)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(pollFactory, pollId, voter, choice));
    }

    function readPollStatistics(address pollFactory, uint32 pollId) external view returns (PollStatistics memory) {
        bytes32 pollKey = getPollKey(pollFactory, pollId);
        return PollStatistics(
            totalNumberOfVotes[pollKey], numberOfValidVotes[pollKey], numberOfBlankVotes[pollKey], uniqueVoters[pollKey]
        );
    }

    function readPollResults(address pollFactory, uint32 pollId, uint8 numChoices)
        external
        view
        returns (uint32[] memory)
    {
        uint32[] memory results = new uint32[](numChoices);
        bytes32 key = getPollKey(pollFactory, pollId);
        uint8 i;
        while (i < numChoices) {
            results[i] = pollResults[key][i];
            i++;
        }
        return results;
    }

    // @dev The `pollFactory` here is the `msg.sender`.
    function vote(uint32 pollId, address voter, uint8 choice) external {
        // Check that choice does not exist yet.

        bytes32 choiceKey = getChoiceKey(msg.sender, pollId, voter, choice);

        if (seenChoice[choiceKey]) revert ErrorChoiceAlreadyExists();

        // Increment poll results by given choice.

        bytes32 pollKey = getPollKey(msg.sender, pollId);

        pollResults[pollKey][choice]++;
        seenChoice[choiceKey] = true;

        // Increment number of votes on given poll.

        totalNumberOfVotes[pollKey]++;
        numberOfValidVotes[pollKey]++;

        // Increment number of unique voters on given poll.

        bytes32 voterKey = getVoterKey(msg.sender, pollId, voter);

        if (!seenVoter[voterKey]) {
            seenVoter[voterKey] = true;
            uniqueVoters[pollKey]++;
        }
    }

    // @notice A vote can be dismissed, in case voter changed her/his mind or voted by mistake.
    function dismissVote(uint32 pollId, address voter, uint8 choice) external {
        // Check that choice already exists.

        bytes32 choiceKey = getChoiceKey(msg.sender, pollId, voter, choice);

        if (!seenChoice[choiceKey]) revert ErrorChoiceDoesNotExist();

        // Decrement poll results by given choice.

        bytes32 pollKey = getPollKey(msg.sender, pollId);

        pollResults[pollKey][choice]--;
        seenChoice[choiceKey] = false;

        // Decrement number of votes on given poll.

        totalNumberOfVotes[pollKey]--;
        numberOfValidVotes[pollKey]--;

        // Number of unique voters does not change, as the voter interacted somehow with the poll.
    }
}

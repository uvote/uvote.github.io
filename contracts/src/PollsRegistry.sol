// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title Polls registry
/// @notice It associates a poll to its creator and its voters.
/// @dev Comments refer to a "poll factory" as a contract that inherits from this.
/// @author Gianluca Casati https://fibo.github.io
contract PollsRegistry {
    uint256 private nextPollId;
    mapping(uint256 => address) private creatorOfPoll;
    mapping(address => uint256) private pollsCreatorNextIndex;
    mapping(address => mapping(uint256 => uint256)) private pollsOfCreator;

    /// @notice A poll factory can register a poll and associate it to its creator.
    function registerPoll(address creator) public returns (uint256) {
        uint256 pollId = nextPollId;
        nextPollId++;
        creatorOfPoll[pollId] = creator;
        pollsOfCreator[creator][pollsCreatorNextIndex[creator]] = pollId;
        pollsCreatorNextIndex[creator]++;
        return pollId;
    }

    /// @param pollId The poll ID.
    /// @return creator The poll creator.
    function readCreatorOfPoll(uint256 pollId) public view returns (address) {
        return creatorOfPoll[pollId];
    }

    // @notice The number of polls is also the ID of the next poll will be created.
    function getNumberOfPolls() public view returns (uint256) {
        return nextPollId;
    }

    /// @notice A poll creator can list her/his polls in descending order, i.e. LIFO.
    /// @param creator The poll creator.
    /// @param pageSize The number of polls to return.
    /// @param offset Index of the first poll to return.
    /// @return A list of poll IDs.
    function readPollsOfCreator(address creator, uint8 pageSize, uint256 offset)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory polls = new uint256[](pageSize);
        uint256 i = pollsCreatorNextIndex[creator] - offset - 1;
        while (i > 0) {
            polls[i] = pollsOfCreator[creator][i];
            i--;
        }
        return polls;
    }

    /// @notice A poll creator can list her/his polls in descending order, i.e. LIFO.
    /// @dev Here creator is `msg.sender`.
    /// @param pageSize The number of polls to return.
    /// @param offset Index of the first poll to return.
    /// @return A list of poll IDs.
    function myCreatedPolls(uint8 pageSize, uint256 offset) public view returns (uint256[] memory) {
        return this.readPollsOfCreator(msg.sender, pageSize, offset);
    }
}

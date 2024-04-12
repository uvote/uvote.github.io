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

    /// @notice A poll factory can list its polls in descending order, i.e. LIFO.
    /// @param pageSize The number of polls to return.
    /// @param pageIndex Index of the page to return.
    /// @return A list of poll IDs.
    function readPollsOfFactory(uint8 pageSize, uint256 pageIndex) public view returns (uint256[] memory) {
        uint256[] memory polls = new uint256[](pageSize);
        uint256 lastId = nextPollId - pageIndex * pageSize - 1;
        for (uint256 i = 0; i < pageSize; i++) {
            polls[i] = lastId - i;
            if (lastId - i == 0) break;
        }
        return polls;
    }

    /// @notice A poll creator can list her/his polls in descending order, i.e. LIFO.
    /// @param creator The poll creator.
    /// @param pageSize The number of polls to return.
    /// @param pageIndex Index of the page to return.
    /// @return A list of poll IDs.
    function readPollsOfCreator(address creator, uint8 pageSize, uint256 pageIndex)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory polls = new uint256[](pageSize);
        uint256 lastId = pollsCreatorNextIndex[creator] - pageSize * pageIndex - 1;
        for (uint256 i = 0; i < pageSize; i++) {
            polls[i] = pollsOfCreator[creator][lastId - i];
            if (lastId - i == 0) break;
        }
        return polls;
    }

    /// @notice A poll creator can list her/his polls in descending order, i.e. LIFO.
    /// @dev Here creator is `msg.sender`.
    /// @param pageSize The number of polls to return.
    /// @param pageIndex Index of the page to return.
    /// @return A list of poll IDs.
    function myCreatedPolls(uint8 pageSize, uint256 pageIndex) public view returns (uint256[] memory) {
        return this.readPollsOfCreator(msg.sender, pageSize, pageIndex);
    }
}

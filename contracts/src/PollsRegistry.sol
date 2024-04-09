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

    // @notice A poll factory can register a poll and associate it to its creator.
    function registerPoll(address creator) public returns (uint256) {
        uint256 pollId = nextPollId;
        nextPollId++;
        creatorOfPoll[pollId] = creator;
        pollsOfCreator[creator][pollsCreatorNextIndex[creator]] = pollId;
        pollsCreatorNextIndex[creator]++;
        return pollId;
    }

    function readCreatorOfPoll(uint256 pollId) public view returns (address) {
        return creatorOfPoll[pollId];
    }

    // @notice A poll creator can list her/his polls in descending order, i.e. LIFO.
    // @dev The poll creator here is the `msg.sender`.
    function readPollsCreated(uint8 pageSize, uint256 offset) public view returns (uint256[] memory) {
        uint256[] memory polls = new uint256[](pageSize);
        uint256 i = pollsCreatorNextIndex[msg.sender] - offset - 1;
        while (i > 0) {
            polls[i] = pollsOfCreator[msg.sender][i];
            i--;
        }
        return polls;
    }

    // @notice A poll factory can list its polls.
    // @dev The poll creator here is the `msg.sender`.
    function readPollsRegistered() public view returns (uint256) {
        return pollsOfCreator[msg.sender][0];
    }
}

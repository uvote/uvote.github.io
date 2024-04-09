// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./PollsStatistics.sol";
import "./PollsRegistry.sol";

// @notice A poll has a title and two choices.
struct PollDetails {
    string title;
    string choiceA;
    string choiceB;
}

/// @title Poll factory Minimum Viable Product
/// @notice It implements the simplest poll factory for uVote.
/// @author Gianluca Casati https://fibo.github.io
contract PollFactoryMVP is PollsRegistry, PollsStatistics {
    mapping(uint256 => string) private titleOfPoll;
    mapping(uint256 => string) private choiceAOfPoll;
    mapping(uint256 => string) private choiceBOfPoll;

    // @dev The poll creator here is the `msg.sender`.
    function createPoll(string memory title, string memory choiceA, string memory choiceB) public returns (uint256) {
        uint256 pollId = registerPoll(msg.sender);
        titleOfPoll[pollId] = title;
        choiceAOfPoll[pollId] = choiceA;
        choiceBOfPoll[pollId] = choiceB;
        return pollId;
    }

    function readPollDetails(uint256 pollId) public view returns (PollDetails memory) {
        return PollDetails(titleOfPoll[pollId], choiceAOfPoll[pollId], choiceBOfPoll[pollId]);
    }
}

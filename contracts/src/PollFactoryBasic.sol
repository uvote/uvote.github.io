// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./PollsStatistics.sol";
import "./PollsRegistry.sol";

uint8 constant INDEX_OF_CHOICE_A = 1;
uint8 constant INDEX_OF_CHOICE_B = 2;

// @notice A basic poll is expressed as a title and two choices.
struct PollDetailsBasic {
    string title;
    string choiceA;
    string choiceB;
}

/// @title Basic poll factory
/// @notice It implements the simplest poll factory for uVote.
/// @author Gianluca Casati https://fibo.github.io
contract PollFactoryBasic is PollsRegistry, PollsStatistics {
    uint8 immutable NUM_CHOICES = 2;

    mapping(uint256 => PollDetailsBasic) private detailsOfPoll;

    // @dev The poll creator here is the `msg.sender`.
    function createPoll(string memory title, string memory choiceA, string memory choiceB) public returns (uint256) {
        uint256 pollId = this.registerPoll(msg.sender);
        detailsOfPoll[pollId] = PollDetailsBasic(title, choiceA, choiceB);
        return pollId;
    }

    function readPollDetails(uint256 pollId) public view returns (PollDetailsBasic memory) {
        return detailsOfPoll[pollId];
    }

    function readPollResults(uint256 pollId) public view returns (uint256[] memory) {
        return this.readPollResults(pollId, NUM_CHOICES);
    }

    // @dev The poll voter here is the `msg.sender`.
    function vote(uint256 pollId, uint8 choice) external {
        this.upsertChoice(msg.sender, pollId, choice);
    }
}

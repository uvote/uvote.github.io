// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./PollsStatistics.sol";
import "./PollsRegistry.sol";

error ErrorEmptyTitle();
error ErrorEmptyChoice();
error ErrorTitleTooLong();
error ErrorChoiceTooLong();

uint8 constant INDEX_OF_CHOICE_A = 1;
uint8 constant INDEX_OF_CHOICE_B = 2;

/// @notice A basic poll is expressed as a title and two choices.
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
    uint8 immutable MAX_TITLE_LENGTH = 40;
    uint8 immutable MAX_CHOICE_LENGTH = 32;

    mapping(uint256 => PollDetailsBasic) private detailsOfPoll;

    /// @dev The poll creator here is the `msg.sender`.
    /// @param title Cannot be empty or more than 40 bytes.
    /// @param choiceA Cannot be empty or more than 32 bytes.
    /// @param choiceB Cannot be empty or more than 32 bytes.
    function createPoll(string memory title, string memory choiceA, string memory choiceB) public returns (uint256) {
        // Check title is not empty.
        if (bytes(title).length == 0) revert ErrorEmptyTitle();
        // Set a limit to title length.
        if (bytes(title).length > MAX_TITLE_LENGTH) revert ErrorTitleTooLong();
        // Check choiceA is not empty.
        if (bytes(choiceA).length == 0) revert ErrorEmptyChoice();
        // Set a limit to choiceA length.
        if (bytes(choiceA).length > MAX_CHOICE_LENGTH) revert ErrorChoiceTooLong();
        // Check choiceB is not empty.
        if (bytes(choiceB).length == 0) revert ErrorEmptyChoice();
        // Set a limit to choiceB length.
        if (bytes(choiceB).length > MAX_CHOICE_LENGTH) revert ErrorChoiceTooLong();

        uint256 pollId = this.registerPoll(msg.sender);
        detailsOfPoll[pollId] = PollDetailsBasic(title, choiceA, choiceB);
        return pollId;
    }

    /// @param pollId The poll ID.
    function readPollDetails(uint256 pollId) public view returns (PollDetailsBasic memory) {
        return detailsOfPoll[pollId];
    }

    /// @param pollId The poll ID.
    function readPollResults(uint256 pollId) public view returns (uint256[] memory) {
        return this.readPollResults(pollId, NUM_CHOICES);
    }

    /// @param pollId The poll ID.
    /// @param choice The poll ID.
    /// @param choice The choice can be a valid vote (1 or 2) or a blank vote (choice == 255).
    /// @dev The poll voter here is the `msg.sender`.
    function vote(uint256 pollId, uint8 choice) external {
        // Check that choice is valid, i.e. A, B, or blank.
        if (choice != BLANK_VOTE) {
            if ((choice != INDEX_OF_CHOICE_A) && (choice != INDEX_OF_CHOICE_B)) revert ErrorInvalidVote();
        }

        this.upsertChoice(msg.sender, pollId, choice);
    }
}

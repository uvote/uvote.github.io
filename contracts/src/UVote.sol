// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @notice Poll id is an hash of `title + description`. It will not be possible to create two polls with ssame title and description, even if the options are different.
struct Poll {
    string title;
    string description;
    string[] options;
}

contract UVote {
    mapping(bytes32 => Poll) pollBy;
    mapping(address => bytes32[]) pollsOf;

    function createPoll(string memory title, string memory description, string[] memory options)
        external
        returns (bytes32)
    {
        // Set a limit to title length.
        require(bytes(title).length <= 42, "Title too long");
        // Set a limit to description length.
        require(bytes(description).length <= 250, "Description too long");
        // Set a limit to options length.
        require(options.length > 1, "Too few options");
        require(options.length <= 10, "Too many options");
        // Set a limit to every option length.
        for (uint256 i = 0; i < options.length; i++) {
            require(bytes(options[i]).length <= 42, "Option too long");
        }
        // Create id as hash of title + description.
        bytes32 id = keccak256(bytes(string.concat(title, description)));
        // Check that poll does not exist yet.
        require(bytes(pollBy[id].title).length == 0, "Poll already exists");
        // Create poll.
        pollBy[id] = Poll(title, description, options);
        // Add poll id to list of account polls.
        pollsOf[msg.sender].push(id);
        // Return poll id.
        return id;
    }

    function getPoll(bytes32 id) external view returns (Poll memory) {
        return pollBy[id];
    }

    function getMyPollIds() public view returns (bytes32[] memory) {
        return pollsOf[msg.sender];
    }
}

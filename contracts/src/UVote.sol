// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract UVote {
    struct Poll {
        string title;
        string description;
        string[] options;
    }

    mapping(bytes32 => Poll) pollBy;
    mapping(address => bytes32[]) pollsOf;

    function createPoll(string memory title, string memory description, string[] memory options)
        public
        returns (bytes32)
    {
        // Set a limit to title length.
        require(bytes(title).length <= 42, "Title too long");
        // Set a limit to description length.
        require(bytes(description).length <= 250, "Description too long");
        // Set a limit to options length.
        require(options.length <= 10, "Too many options");
        // Set a limit to every option length.
        for (uint256 i = 0; i < options.length; i++) {
            require(bytes(options[i]).length <= 42, "Option too long");
        }
        // Create id as hash of title + description.
        bytes32 id = keccak256(bytes(string.concat(title, description)));
        // Check that poll does not exist yet.
        // require(bytes(pollBy[id]).length == 0, "Poll already exists");
        // Add poll id to list of account polls.
        // if (bytes(pollsOf[msg.sender]).length == 0) {
        //     bytes32[] memory polls = [id];
        //     pollsOf[msg.sender] = polls;
        // } else {
        //     bytes32[] memory polls = pollsOf[msg.sender];
        //     polls.push(id);
        //     pollsOf[msg.sender] = polls;
        // }
        // Create poll.
        // pollBy[id] = Poll(title, description, options);
        // Return poll id.
        return id;
    }
}

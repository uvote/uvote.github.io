// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract NicknameRegistry {
    uint256 count = 0;

    mapping(address => string) nicknameOf;

    function getCount() public view returns (uint256) {
        return count;
    }

    function getNickname(address account) public view returns (string memory) {
        return nicknameOf[account];
    }

    function setNickname(string memory nickname) public {
        // Check nickname is not empty.
        require(bytes(nickname).length > 0, "Nickname too long");
        // Set a limit to nickname length.
        require(bytes(nickname).length <= 42, "Nickname too long");
        // If it is a new nickname, increment count.
        if (bytes(nicknameOf[msg.sender]).length == 0) {
            count++;
        }
        // Set nickname.
        nicknameOf[msg.sender] = nickname;
    }

    function deleteNickname() public {
        // If nickname exists, decrement count and delete it.
        if (bytes(nicknameOf[msg.sender]).length > 0) {
            count--;
            delete nicknameOf[msg.sender];
        }
    }
}

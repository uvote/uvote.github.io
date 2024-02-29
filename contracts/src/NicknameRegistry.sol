// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NicknameRegistry {
    uint256 public count = 0;

    mapping(address => string) nicknameOf;

    function getCount() public view returns (uint256) {
        return count;
    }

    function getNickname(address account) public view returns (string memory) {
        return nicknameOf[account];
    }

    function setNickname(string memory nickname) public {
        // Set a limit to nickname length.
        require(bytes(nickname).length <= 42, "Nickname too long");
        // If it is a new nickname, increment count.
        if (bytes(nicknameOf[msg.sender]).length == 0) {
            count++;
        }
        // Set nickname.
        nicknameOf[msg.sender] = nickname;
    }
}

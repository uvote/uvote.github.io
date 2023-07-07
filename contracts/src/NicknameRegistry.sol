// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NicknameRegistry {
    uint256 public count = 0;

    mapping(address => string) nicknameOf;

    // function getNickname(address account) public returns(string) {
    //  return nicknameOf[account]
    // }

    function setNickname(string nickname) public {
        // Set a limit to nickname length.
        // require(bytes(nickname).length <= 42, "Nickname too long");

        // If it is a new nickname, increment count.
        // if (!nicknameOf[msg.sender]) {
        //  count++;
        //}

        nicknameOf[msg.sender] = nickname;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error ErrorEmptyNickname();
error ErrorNicknameIsTooLong();

/// @title Nickname registry
/// @notice It associates an address to a nickname.
/// @author Gianluca Casati https://fibo.github.io
contract NicknameRegistry {
    uint256 private count;

    mapping(address => string) private nicknameOf;

    /// @notice On every new address associated with a nickname, a counter is incremented.
    /// @return count of addresses associated
    function getCount() external view returns (uint256) {
        return count;
    }

    /// @param wallet address of associated nickname, if any
    /// @return nickname
    function getNickname(address wallet) external view returns (string memory) {
        return nicknameOf[wallet];
    }

    /// @notice Nicknames are not unique, two wallets can have the same nickname.
    /// @param nickname string cannot be empty or more than 42 bytes
    function setNickname(string memory nickname) external {
        // Check nickname is not empty.
        if (bytes(nickname).length == 0) revert ErrorEmptyNickname();
        // Set a limit to nickname length.
        if (bytes(nickname).length > 42) revert ErrorNicknameIsTooLong();
        // If it is a new nickname, increment count.
        if (bytes(nicknameOf[msg.sender]).length == 0) {
            count++;
        }
        // Set nickname.
        nicknameOf[msg.sender] = nickname;
    }

    /// @notice An address can delete its nickname; no other address can do that, the NicknameRegistry contract owner niether.
    function deleteNickname() external {
        // If nickname exists, decrement count and delete it.
        if (bytes(nicknameOf[msg.sender]).length > 0) {
            count--;
            delete nicknameOf[msg.sender];
        }
    }
}

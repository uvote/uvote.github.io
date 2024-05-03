// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error ErrorEmptyNickname();
error ErrorNicknameTooLong();

/// @title Nickname registry
/// @notice It associates an address to a nickname.
/// @author Gianluca Casati https://fibo.github.io
contract NicknameRegistry {
    uint8 immutable MAX_NICKNAME_LENGTH = 32;

    mapping(address => string) private nicknameOf;

    /// @param wallet The address of associated nickname, if any.
    /// @return nickname
    function getNickname(address wallet) external view returns (string memory) {
        return nicknameOf[wallet];
    }

    /// @notice Nicknames are not unique, two wallets can have the same nickname.
    /// @param nickname Cannot be empty or more than 32 bytes.
    function setNickname(string memory nickname) external {
        // Check nickname is not empty.
        if (bytes(nickname).length == 0) revert ErrorEmptyNickname();
        // Set a limit to nickname length.
        if (bytes(nickname).length > MAX_NICKNAME_LENGTH) revert ErrorNicknameTooLong();
        // Set nickname.
        nicknameOf[msg.sender] = nickname;
    }

    /// @notice An address can delete its nickname; no other address can do that, the NicknameRegistry contract owner niether.
    function deleteNickname() external {
        // If nickname exists, delete it.
        if (bytes(nicknameOf[msg.sender]).length > 0) {
            delete nicknameOf[msg.sender];
        }
    }
}

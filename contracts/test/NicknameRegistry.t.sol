// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NicknameRegistry.sol";

contract NicknameRegistryTest is Test {
    NicknameRegistry public nicknameRegistry;

    function setUp() public {
        nicknameRegistry = new NicknameRegistry();
    }
}

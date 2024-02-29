// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NicknameRegistry.sol";

contract NicknameRegistryTest is Test {
    NicknameRegistry public nicknameRegistry;

    function setUp() public {
        nicknameRegistry = new NicknameRegistry();
    }

    function test_setNickname_increments_count() public {
        uint256 previousCount = nicknameRegistry.getCount();
        nicknameRegistry.setNickname("nickname");
        assertEq(nicknameRegistry.getCount(), previousCount + 1);
    }

    function testFail_setNickname_too_long() public {
        nicknameRegistry.setNickname("nicknametoolongcauseithasmorethenfourtytwocharacters");
    }
}

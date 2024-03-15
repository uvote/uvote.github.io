// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NicknameRegistry.sol";

contract NicknameRegistryTest is Test {
    NicknameRegistry public nicknameRegistry;

    function setUp() public {
        nicknameRegistry = new NicknameRegistry();
    }

    function test_setNickname() public {
        vm.prank(address(1));
        nicknameRegistry.setNickname("nickname");
        assertEq(nicknameRegistry.getNickname(address(1)), "nickname");
    }

    function test_setNickname_then_update_it() public {
        vm.startPrank(address(1));
        nicknameRegistry.setNickname("nickname1");
        nicknameRegistry.setNickname("nickname2");
        assertEq(nicknameRegistry.getNickname(address(1)), "nickname2");
        vm.stopPrank();
    }

    function test_setNickname_increments_count() public {
        vm.prank(address(1));
        nicknameRegistry.setNickname("nickname1");
        assertEq(nicknameRegistry.getCount(), 1);

        vm.prank(address(2));
        nicknameRegistry.setNickname("nickname2");
        assertEq(nicknameRegistry.getCount(), 2);
    }

    function test_setNickname_increments_count_only_once() public {
        vm.startPrank(address(1));
        nicknameRegistry.setNickname("nickname1");
        assertEq(nicknameRegistry.getCount(), 1);
        nicknameRegistry.setNickname("nickname2");
        assertEq(nicknameRegistry.getCount(), 1);
        vm.stopPrank();
    }

    function testFail_setNickname_is_empty() public {
        nicknameRegistry.setNickname("");
    }

    function testFail_setNickname_too_long() public {
        nicknameRegistry.setNickname("nicknametoolongcauseithasmorethenfourtytwocharacters");
    }

    function test_deleteNickname() public {
        vm.startPrank(address(1));
        nicknameRegistry.setNickname("nickname");
        nicknameRegistry.deleteNickname();
        assertEq(nicknameRegistry.getNickname(address(1)), "");
        vm.stopPrank();
    }

    function test_deleteNickname_decrements_count() public {
        vm.prank(address(1));
        nicknameRegistry.setNickname("nickname1");

        vm.startPrank(address(2));
        nicknameRegistry.setNickname("nickname2");
        nicknameRegistry.deleteNickname();
        assertEq(nicknameRegistry.getCount(), 1);
        vm.stopPrank();
    }

    function test_deleteNickname_does_not_decrement_count_to_negative() public {
        vm.prank(address(1));
        nicknameRegistry.deleteNickname();
        assertEq(nicknameRegistry.getCount(), 0);
    }
}

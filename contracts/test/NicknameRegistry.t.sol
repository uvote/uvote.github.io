// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NicknameRegistry.sol";

contract NicknameRegistryTest is Test {
    NicknameRegistry public nicknameRegistry;

    function setUp() public {
        nicknameRegistry = new NicknameRegistry();
    }

    // setNickname

    function test_setNickname() public {
        address nicknameOwner1 = address(1);
        string memory nickname1 = "nickname";
        address nicknameOwner2 = address(2);
        string memory nickname2 = "nicknameThatIsExactly32BytesLong";
        vm.prank(nicknameOwner1);
        nicknameRegistry.setNickname(nickname1);
        vm.prank(nicknameOwner2);
        nicknameRegistry.setNickname(nickname2);
        assertEq(nicknameRegistry.getNickname(nicknameOwner1), nickname1);
        assertEq(nicknameRegistry.getNickname(nicknameOwner2), nickname2);
    }

    function test_setNickname_then_update_it() public {
        address nicknameOwner = address(1);
        string memory nickname1 = "nickname";
        string memory nickname2 = "another nickname";
        vm.prank(nicknameOwner);
        nicknameRegistry.setNickname(nickname1);
        assertEq(nicknameRegistry.getNickname(nicknameOwner), nickname1);
        vm.prank(nicknameOwner);
        nicknameRegistry.setNickname(nickname2);
        assertEq(nicknameRegistry.getNickname(nicknameOwner), nickname2);
    }

    function test_setNickname_cannot_be_empty() public {
        vm.expectRevert(ErrorEmptyNickname.selector);
        nicknameRegistry.setNickname("");
    }

    function test_setNickname_checks_input_is_not_too_long() public {
        vm.expectRevert(ErrorNicknameIsTooLong.selector);
        nicknameRegistry.setNickname("nickname_too_long_________________");
    }

    // deleteNickname

    function test_deleteNickname() public {
        vm.startPrank(address(1));
        nicknameRegistry.setNickname("nickname");
        nicknameRegistry.deleteNickname();
        assertEq(nicknameRegistry.getNickname(address(1)), "");
        vm.stopPrank();
    }
}

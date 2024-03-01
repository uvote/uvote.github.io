// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/UVote.sol";

contract UVoteTest is Test {
    UVote public uvote;
    string title1;
    string title2;
    string description1;
    string description2;
    string[] options1;
    string[] options2;

    string stringTooLong;
    string[] tooFewOptions;
    string[] tooManyOptions;
    string[] optionsWithOneOptionTooLong;

    function setUp() public {
        uvote = new UVote();

        description1 = "description 1";
        title1 = "title 1";
        title2 = "title 2";

        options1.push("yes");
        options1.push("no");

        options2.push("yes");
        options2.push("no");
        options2.push("maybe");

        stringTooLong = "string";
        for (uint256 i = 0; i < 99; i++) {
            stringTooLong = string.concat(stringTooLong, "string");
        }

        tooFewOptions.push("option");

        optionsWithOneOptionTooLong.push("option");
        optionsWithOneOptionTooLong.push(stringTooLong);

        for (uint256 i = 0; i < 12; i++) {
            tooManyOptions.push("option");
        }
    }

    function test_createPoll_then_getPoll() public {
        // Create a poll, check that it is retrievable via `getPoll`.
        bytes32 id = uvote.createPoll(title1, description1, options1);
        Poll memory poll = uvote.getPoll(id);
        assertEq(poll.title, title1);
        assertEq(poll.description, description1);
        for (uint256 i = 0; i < poll.options.length; i++) {
            assertEq(poll.options[i], options1[i]);
        }
    }

    function test_createPoll_then_getMyPollIds() public {
        // Create two polls.
        uvote.createPoll(title1, description1, options1);
        bytes32 id2 = uvote.createPoll(title2, description2, options2);
        // Check they are retrievable via `getMyPollIds`.
        bytes32[] memory myPollIds = uvote.getMyPollIds();
        assertEq(myPollIds.length, 2);
        assertEq(myPollIds[1], id2);
    }

    function testFail_createPoll_title_too_long() public {
        uvote.createPoll(stringTooLong, description1, options1);
    }

    function testFail_createPoll_description_too_long() public {
        uvote.createPoll(title1, stringTooLong, options1);
    }

    function testFail_createPoll_too_few_options() public {
        uvote.createPoll(title1, description1, tooFewOptions);
    }

    function testFail_createPoll_too_many_options() public {
        uvote.createPoll(title1, description1, tooManyOptions);
    }

    function testFail_createPoll_option_too_long() public {
        uvote.createPoll(title1, description1, optionsWithOneOptionTooLong);
    }

    function testFail_createPoll_poll_already_exists() public {
        uvote.createPoll(title1, description1, options1);
        uvote.createPoll(title1, description1, options2);
    }
}

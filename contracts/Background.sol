// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
 import "hardhat/console.sol";
import "./Lock.sol";

contract Background {
    Lock[] public locks;

    function deployAndLockFunds(uint256 _unlockTime) public payable {
        Lock newLock = new Lock{value: 1}(_unlockTime);
        locks.push(newLock);
    }
}
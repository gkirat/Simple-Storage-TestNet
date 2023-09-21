// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


contract simpleStorage {

    uint256 number = 100;

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256){
        return number;
    }
}
// SPDX-License-Identifier: UNLICENSED 

pragma solidity  ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    // declaring event with paramteters
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // declaring structure with same parameters
    struct TransferStruct {
        address from;
        address receiver;
        uint amount;
        string message; 
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;
    
    // main part of blockchain  
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public { 
        transactionCount += 1;
        // adding to list
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword)); 

        // adding to blockchain
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); 
    }

    // public function to view transcations
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    // public function to view transcation count
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}

// SPDX-License-Identifier: UNLICENSED 

pragma solidity  ^0.8.0;

import "hardhat/console.sol";

contract Certificates {
    uint256 transactionCount;

    // declaring event with paramteters
    event Transfer(address from, address receiver, uint amount, uint256 timestamp, 
                   string issuedToCN, string issuedToO, string issuedToOU, 
                   string issuedByCN, string issuedByO, string issuedByOU, 
                   uint256 issuedOn, uint256 expiresOn);

    // declaring structure with same parameters
    struct TransferStruct {
        address from;
        address receiver;
        uint amount;
        uint256 timestamp;
        
        // issued to
        string issuedToCN;
        string issuedToO;
        string issuedToOU;

        // issued by
        string issuedByCN;
        string issuedByO;
        string issuedByOU;

        // validity period
        uint256 issuedOn;
        uint256 expiresOn;
    }

    TransferStruct[] transactions;
    
    // main part of blockchain  
    function addToBlockchain(address payable receiver, uint amount, 
                            string memory issuedToCN, string memory issuedToO, string memory issuedToOU, 
                            string memory issuedByCN, string memory issuedByO, string memory issuedByOU, 
                            uint issuedOn, uint expiresOn) public { 
        transactionCount += 1;
        // adding to list
        transactions.push(TransferStruct(msg.sender, receiver, amount, block.timestamp, 
                                        issuedToCN, issuedToO, issuedToOU, 
                                        issuedByCN, issuedByO, issuedByOU, 
                                        issuedOn, expiresOn)); 

        // adding to blockchain
        emit Transfer(msg.sender, receiver, amount, block.timestamp, 
                    issuedToCN, issuedToO, issuedToOU, 
                    issuedByCN, issuedByO, issuedByOU, 
                    issuedOn, expiresOn); 
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



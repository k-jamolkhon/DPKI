// https://eth-goerli.g.alchemy.com/v2/HTW2uqV5wGHAJSB6shwlnEu9sKaP4fka

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  allowUnlimitedContractSize: true,
  networks: {
    // test network
    // url = api of smart contract demployment (alchemy.com)
    // accounts = metamask account key to deploy from and pay for gas fees
    // gas & gasPrice = manually setting gas limits
    sepolia: {
      url:'https://eth-sepolia.g.alchemy.com/v2/5zTLV2p4YurW4mZMr6ZmM0_qVkvVDMoa',
      accounts: [ 'cc7a1c120fe8a9480b3baf61f9f6525266301f9a4bdac05188938200e89f0e57' ],
      gas: 2100000,
      gasPrice: 8000000000,
      allowUnlimitedContractSize: true,
    }
  }
}




const main = async () => {
  // getting the smart contract functions
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");

  // deploying smart contract
  const transactionsContract = await transactionsFactory.deploy();
  await transactionsContract.deployed();

  //returns address of smart contract in blockchain in cli
  console.log("Transactions address: ", transactionsContract.address); 
};

const runMain = async () => {
  try {
    await main();
    // exiting with no error
    process.exit(0);
    
  } catch (error) {
    console.error(error);
    // exiting with error
    process.exit(1);
  }
};

runMain();


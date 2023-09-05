import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// import axios from 'axios';

// importing contstants
import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
export const TransactionContext = React.createContext();


// creating the contract based on deplyoed contract address 
const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    // checking the provider and contract
    // console.log({
    //     provider, signer, transactionsContract
    // });

    return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
    // getting data from Form in welcome page:
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [formHash, setformHash] = useState({ txHash: ""});
    const [messageData, setmessageData] = useState({ issuedToCN: "",issuedToO: "",issuedToOU: "",issuedByCN: "",issuedByO: "",issuedByOU: "",issuedOn: "",expiresOn: "" });

    
    // declaring list for accounts and transactions 
    const [currentAccount, setCurrentAccount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [verifiedTransaction, setVerifiedTransaction] = useState([]);
    
    // setting loading state:
    const [isLoading, setIsLoading] = useState(false);
    
    // storing count in local storage so it wont reset with each page reload 
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    // dynamically updating the Form 
    // e = keyboard event
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const handleMessageChange = (e, name) => {
        setmessageData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const handleHashChange = (e, name) => {
        setformHash((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    // async function to load the transactions
    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const availableTransactions = await transactionsContract.getAllTransactions();

                // properly naming the keys in the list
                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.from,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18), // converting to eth from gwei
                    hash: transaction.hash
                }));

                console.log("All transactions: ", structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            // prompt to install extension
            if (!ethereum) return alert("Please install MetaMask extension."); 

            // cheking if account exists
            const accounts = await ethereum.request({ method: "eth_accounts" });
            
            //console.log(accounts); 

            // if account exists, get all transactions
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions(); 
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // GET request to fetch transaction from etherium blockchain
    // const checkByHash2 = () => {

    //     const { txHash } = formHash;

    //     // decraring parameters
    //     const headers = {
    //         'accept': 'application/json',
    //         'X-API-Key': 'TemnYwb653ca1tpolF3RCyiFramma53Hwnit9rdO1mgHN4lws4AJcBIQ6mUCwiFi'
    //     };        
    //     const hash = "0x8a05cbef1a39f7c2d4sadfasdf532b9bed3fa039cc46dabb805274f0535adf7a67aeea5c";
    //     const chain = "sepolia";
    //     const url = `https://deep-index.moralis.io/api/v2/transaction/${txHash}?chain=${chain}`;        
        
    //     // making the request
    //     axios.get(url, { headers })
    //         .then(
    //             (Response) => {
    //                 console.log("Verified list: ", Response);                  
    //                 // putting the data to list  
    //                 setVerifiedTransaction(Response.data);
    //             }
    //         )
    //         .catch(error => {
    //             alert("Invalid transaction hash.");
    //             console.error('Wrong hash!', error);
    //         });

    // }

    const checkByHash = () => {
        setVerifiedTransaction(" ");
        const { txHash } = formHash;

        // decraring parameters
        const headers = {
            'accept': 'application/json',
            'X-API-Key': 'TemnYwb653ca1tpolF3RCyiFramma53Hwnit9rdO1mgHN4lws4AJcBIQ6mUCwiFi'
        };        

        const chain = "sepolia";
        const url = `https://deep-index.moralis.io/api/v2/transaction/${txHash}?chain=${chain}`;

        fetch(url, { 
        method: 'get', 
        headers: headers
        }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            //this.setState({ totalReactPackages: data.total })
            console.log(data);
            setVerifiedTransaction(data);
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('Wrong Hash!', error);
            alert(error);
        });
    }




    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                // setting count to local storage
                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            // getting all accounts from metamask extension
            const accounts = await ethereum.request({ method: "eth_requestAccounts", }); 

            // setting first account as default choise
            setCurrentAccount(accounts[0]); 
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                // geting variables from Form
                const { addressTo, amount, keyword, message } = formData;
                console.log(formData);
                
                // calling a contract function
                const transactionsContract = createEthereumContract();
                
                // to convert from eth to gwei in hex
                const parsedAmount = ethers.utils.parseEther(amount); 

                // sending to blockchain
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", //21000 GWEI (subunit of eth) = 0.000021 ETH
                        value: parsedAmount._hex,
                    }],
                });

                // getting the transaction hash
                const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

                // setting spinner to indicate loading
                setIsLoading(true);

                console.log(`Loading - ${transactionHash.hash}`);

                // waiting to transaction to finish
                await transactionHash.wait();

                // stopping spinner
                setIsLoading(false);
                console.log(`Success - ${transactionHash.hash}`);

                // getting count to store
                const transactionsCount = await transactionsContract.getTransactionCount();

                // saving count to storage
                setTransactionCount(transactionsCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);            
            alert("Invalid ethereum object. Check your form.");
            throw new Error("No ethereum object");
        }
    };

    // calling the functions
    useEffect(() => {
        checkIfWalletIsConnect();
        checkIfTransactionsExists();
    }, [transactionCount]);

    return (
        // passing objects through provider
        // so they can be accessed in other parts
        <TransactionContext.Provider
            value={{
                transactionCount,
                connectWallet,
                transactions,
                currentAccount,
                isLoading,
                sendTransaction,
                handleChange,
                handleMessageChange,
                formData,
                formHash,
                checkByHash,
                handleHashChange,
                verifiedTransaction,
                messageData,
                value: "test"
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
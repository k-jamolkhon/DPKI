import React, { useContext } from "react";

// importing icons
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from "ethers";
import { Loader } from ".";

// importing context provider
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

// creating variable for same style params
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";



// rendering the form inputs
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    // testing link between Transaction context and welcome page:
    //const { value } = useContext(TransactionContext);
    //console.log(value); 
    const { currentAccount, connectWallet, handleChange, handleMessageChange, sendTransaction, messageData, formData, isLoading, checkIfWalletIsConnect, checkByHash } = useContext(TransactionContext);

    const handleSubmit = (e) => {

        if (!ethereum) return alert("Please install MetaMask.");

        const { addressTo, amount, keyword, message } = formData;
        const { issuedToCN, issuedToO, issuedToOU,
            issuedByCN, issuedByO, issuedByOU,
            issuedOn, expiresOn } = messageData;

        // prevent reloading the page after submitting the Form
        e.preventDefault();

        // testing eteration
        // Object.keys(messageData).forEach(e=>console.log(e+": "+messageData[e]+"; "));

        //not submit if any field is empty
        if (!addressTo || !amount || !issuedToCN || !issuedToO || !issuedToOU || !issuedByCN || !issuedByO || !issuedByOU || !issuedOn || !expiresOn) {
            alert("Please fill up the form.");
            return;
        }

        // add elements to message
        Object.keys(messageData).forEach(e => formData.message += e + ": " + messageData[e] + "; ")

        // add keyword
        formData.keyword = "Certificate";

        sendTransaction();
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient .bg-clip-text py-3 font-bold">
                        DPKI
                    </h1>
                    <p className="text-left mt-5 text-white font-light text-gradient .bg-clip-text md:w-9/12 w-11/12 text-base">
                        Application of Decentralized Private Key Infrastructure
                    </p>

                    {/* // rendering button if account is not connected     */}
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#102570]">
                            <AiFillPlayCircle className="text-white mr-2" />

                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>)}


                    {/* grid */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                            Certificates
                        </div>
                        <div className={companyCommonStyles}>Security</div>
                        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={companyCommonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                {/* card */}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>

                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    Address: <br />
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* inputs */}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <br />

                        <Input placeholder="Issued to: Common name (CN)" name="issuedToCN" type="text" handleChange={handleMessageChange} />
                        <Input placeholder="Issued to: Organization (O)" name="issuedToO" type="text" handleChange={handleMessageChange} />
                        <Input placeholder="Issued to: Organizational Unit (OU)" name="issuedToOU" type="text" handleChange={handleMessageChange} />
                        <br />

                        <Input placeholder="Issued by: Common name (CN)" name="issuedByCN" type="text" handleChange={handleMessageChange} />
                        <Input placeholder="Issued by: Organization (O)" name="issuedByO" type="text" handleChange={handleMessageChange} />
                        <Input placeholder="Issued by: Organizational Unit (OU)" name="issuedByOU" type="text" handleChange={handleMessageChange} />
                        <br />

                        <Input placeholder="Validity: Valid from" name="issuedOn" type="text" handleChange={handleMessageChange} />
                        <Input placeholder="Validity: Expires on" name="expiresOn" type="text" handleChange={handleMessageChange} />                       
                
                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {/* show spinner if state is loading */}
                        {isLoading
                            ? <Loader />
                            : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    Process
                                </button>
                            )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
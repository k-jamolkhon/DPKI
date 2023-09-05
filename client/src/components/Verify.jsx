import React, { useContext } from "react";

// importing context provider
import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";

// rendering the form inputs
const Input = ({ placeholder, name, type, value, handleHashChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleHashChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

// getting data for transaction cards
const Verify = () => {
    const { verifiedTransaction, currentAccount, connectWallet, handleHashChange, sendTransaction, formHash, isLoading, checkIfWalletIsConnect, checkByHash } = useContext(TransactionContext);

    const handleSubmit = (e) => {

        if (!ethereum) return alert("Please install MetaMask.");

        const { txHash } = formHash;

        //prevent reloading the page after submitting the Form
        e.preventDefault();

        //not submit if any field is empty
        if (!txHash) {
            alert("Please fill up the field.");
            return;
        }

        checkByHash();
    };

    const formatMessage = (message) => {
        // decoding the message
        message = message.input.match(/.{1,2}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"");

        // removing unnecessary information
        message = message.replace(/.*(?=issuedToCN)/i, "");

        // puting proper spaces
        message = message.split(";").join("\n");
        message = " " + message;
        return message;
    }

    function a2hex(str) {
        var arr = [];
        for (var i = 0, l = str.length; i < l; i++) {
            var hex = Number(str.charCodeAt(i)).toString(16);
            arr.push(hex);
        }
        return arr.join('');
    }

    

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-services">
            <div className="flex flex-col items-center md:p-12 py-12 px-4">

                <h3 className="text-white text-3xl text-center my-2 py-12">
                    Verify the hash of Certificate
                </h3>

                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder="Hash" name="txHash" type="text" handleHashChange={handleHashChange} />

                    <div className="h-[1px] w-full bg-gray-400 my-2" />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                        Check
                    </button>

                </div>



                {verifiedTransaction.hash && (
                    <>
                        <div className="flex flex-wrap justify-center items-center mt-10 whitespace-pre-line">
                            <div className="bg-[#181918] m-4 flex flex-1
                                        2xl:min-w-[900px]
                                        2xl:max-w-[1000px]
                                        min-w-full
                                        flex-col p-3 rounded-md hover:shadow-2xl"
                            >
                                <div className="flex flex-col items-center w-full mt-3 whitespace-pre-line">
                                    <div className="display-flex justify-start w-full mb-6 p-2 whitespace-pre-line">
                                        <a href={`https://sepolia.etherscan.io/address/${verifiedTransaction.from_address}`} target="_blank" rel="noreferrer">
                                            {/* &#9; is same as \t */}
                                            <p className="text-white text-base w-full whitespace-pre">From: &#9;{shortenAddress(verifiedTransaction.from_address)}</p>
                                        </a>
                                        <a href={`https://sepolia.etherscan.io/address/${verifiedTransaction.to_address}`} target="_blank" rel="noreferrer">
                                            <p className="text-white text-base whitespace-pre">To: &#9;&#9;{shortenAddress(verifiedTransaction.to_address)}</p>

                                        </a>
                                        <a href={`https://sepolia.etherscan.io/tx/${verifiedTransaction.hash}`} target="_blank" rel="noreferrer">
                                            <p className="text-white text-base whitespace-pre">Hash: &#9;{shortenAddress(verifiedTransaction.hash)}</p>
                                        </a>

                                        <p className="text-white text-base whitespace-pre">Block: &#9; {verifiedTransaction.block_number}</p>
                                        
                                        {/* putting in textarea, and converting from hext to string */}
                                        <p className="text-white bg-[#181918] text-base">
                                            Message: <br /> 
                                            <textarea className=" w-full text-white bg-[#181918] text-base overflow-hidden" 
                                                disabled defaultValue={formatMessage(verifiedTransaction)} rows="5" />  </p>
                                    </div>

                                    {/* <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="flex w-full h-[0.25px] bg-gray-400 mt-5 items-center" />
            </div>
        </div>
    );
};

export default Verify;
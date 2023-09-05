import React, { useContext } from "react";
// importing context
import { TransactionContext } from "../context/TransactionContext";

// importing icons
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

// importing logo
import logo from "../../images/deimexa-logo.png";

// rendering navbar
const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  // mobile view of navbar
  const [toggleMenu, setToggleMenu] = React.useState(false);

  // importing functions from context provider
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">

      {/* rendering logo */}
      <div className="md:flex-[0.5] flex-row flex-initial justify-between items-center">
        <img src={logo} alt="logo" className="w-20 cursor-pointer" />
      </div>

      {/* rendering navbar */}
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Demo", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

        {/* if wallet not connected, then display the button */}
        {!currentAccount &&
          (<button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#102570]">
            <p className="text-white text-base font-semibold">
              Login
            </p>
          </button>)}
      </ul>

      {/* mobile view */}
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} /> //
        )}

        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}

        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
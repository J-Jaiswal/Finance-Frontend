import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { auth } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentUser(currentuser);
    });
  }, []);

  return (
    <nav className="bg-[#33415C] shadow-md py-4 px-28">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Financo</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-[#5C677D] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/expenses"
            className="text-white hover:text-[#5C677D] transition-colors"
          >
            Add Expense
          </Link>

          <Link
            to="/budget"
            className="text-white hover:text-[#5C677D] transition-colors"
          >
            Budget
          </Link>
          <Link
            to="/transactions"
            className="text-white hover:text-[#5C677D] transition-colors"
          >
            Transactions
          </Link>
        </div>

        {/* Login/Profile Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/login" className="text-white  transition-colors">
            {currentUser ? (
              <div className="text-[30px]">
                <IoPersonCircleSharp />
              </div>
            ) : (
              <div className="hover:text-[#5C677D]">Login</div>
            )}
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:text-[#5C677D] transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-[#33415C] space-y-2 p-4">
          <Link
            to="/dashboard"
            className="block text-white hover:text-[#5C677D] transition-colors"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="block text-white hover:text-[#5C677D] transition-colors"
            onClick={toggleMenu}
          >
            Transactions
          </Link>
          <Link
            to="/budget"
            className="block text-white hover:text-[#5C677D] transition-colors"
            onClick={toggleMenu}
          >
            Budget
          </Link>
          <Link
            to="/expenses"
            className="block text-white hover:text-[#5C677D] transition-colors"
            onClick={toggleMenu}
          >
            Expenses
          </Link>
          <Link
            to="/profile"
            className="block text-white hover:text-[#5C677D] transition-colors"
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

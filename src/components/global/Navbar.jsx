import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { auth } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "../authentication/Profile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <nav className="bg-[#33415C] shadow-md py-4 px-6 md:px-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Financo</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {["Home", "Expenses", "Budget", "Transactions"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="text-white hover:text-[#5C677D] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Login/Profile Links */}
        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <Link to="/login" className="text-[30px] text-white">
              <IoPersonCircleSharp />
            </Link>
          ) : (
            <Link
              to="/profile"
              className="text-white hover:text-[#5C677D] transition-colors"
            >
              Login
            </Link>
          )}
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
            onClick={() => setIsOpen(!isOpen)}
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
          {["Dashboard", "Transactions", "Budget", "Expenses", "Profile"].map(
            (item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase()}`}
                className="block text-white hover:text-[#5C677D] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { auth } from "../../../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/home"))
      .catch((error) => console.error("Logout Error:", error));
  };

  console.log(currentUser);

  return (
    <nav className="bg-[#33415C] shadow-md py-4 px-6 md:px-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Financo</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {["Home", "Transactions", "Budget", "Credit Score"].map(
            (item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-[#5C677D] transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </div>

        {/* Login/Profile Links */}
        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <div>
              <IoPersonCircleSharp
                className="text-[30px] text-white cursor-pointer "
                onClick={() => setdropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-10 mt-2 w-60 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-gray-900 font-semibold truncate">
                      {currentUser.displayName || "No Name"}
                    </p>
                    <p className="text-gray-500 text-sm truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <div className="px-4 py-3">
                    <button
                      onClick={handleLogout}
                      className="w-[60%] bg-[#3C5B6F] text-white py-2 px-4 rounded hover:bg-[#304b5b] transition duration-300"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
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
          {["Home", "Dashboard", "Transactions", "Budget", "Credit Score"].map(
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

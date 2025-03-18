import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic based on your needs (e.g., filtering items)
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-6">
      <img className="w-44 cursor-pointer" src={assets.logo1} alt="Logo" />

      {/* Search Bar */}
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-72 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-3 top-2 text-gray-500">🔍</button>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className="hover:text-primary">
          HOME
        </NavLink>
        <NavLink to="/feedback" className="hover:text-primary">
          FEEDBACK
        </NavLink>
        <NavLink to="/about" className="hover:text-primary">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="hover:text-primary">
          CONTACT
        </NavLink>
      </ul>

      {/* User Profile / Login Button */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-orders")}
                  className="hover:text-black cursor-pointer"
                >
                  My Orders
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-0 right-0 w-full h-screen bg-white z-50 p-6 flex flex-col items-center">
            <div className="flex justify-between w-full">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <img
                className="w-7 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
              />
            </div>

            {/* Search Bar in Mobile */}
            <div className="w-full mt-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <ul className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/"
                className="px-4 py-2 rounded hover:text-primary"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/feedback"
                className="px-4 py-2 rounded hover:text-primary"
              >
                FEEDBACK
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/about"
                className="px-4 py-2 rounded hover:text-primary"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/contact"
                className="px-4 py-2 rounded hover:text-primary"
              >
                CONTACT
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

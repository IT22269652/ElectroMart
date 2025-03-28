import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import VoiceNavigation from "./VoiceNavigation";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, userProfileImage, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchData = [
    { id: 1, title: "Home", path: "/", category: "Main", icon: "🏠" },
    {
      id: 2,
      title: "Feedback",
      path: "/feedback",
      category: "Support",
      icon: "📝",
    },
    { id: 3, title: "About Us", path: "/about", category: "Info", icon: "ℹ️" },
    {
      id: 4,
      title: "Contact",
      path: "/contact",
      category: "Support",
      icon: "📞",
    },
    {
      id: 5,
      title: "My Profile",
      path: "/my-profile",
      category: "Account",
      icon: "👤",
    },
    {
      id: 6,
      title: "My Orders",
      path: "/my-orders",
      category: "Account",
      icon: "🛒",
    },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results.slice(0, 5));
  };

  const handleSearchItemClick = (path) => {
    setSearchQuery("");
    setSearchResults([]);
    setShowMenu(false);
    navigate(path);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-6 bg-gradient-to-r from-white to-gray-50">
      <img
        className="w-44 cursor-pointer hover:scale-105 transition-transform"
        src={assets.logo1}
        alt="Logo"
        onClick={() => navigate("/")}
      />

      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Explore our site..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-5 py-2.5 pl-12 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-xl mt-2 shadow-xl z-20 animate-fadeIn">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleSearchItemClick(result.path)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-lg">{result.icon}</span>
                  <div>
                    <p className="text-gray-800 font-medium">{result.title}</p>
                    <p className="text-xs text-gray-500">{result.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <VoiceNavigation />
      </div>

      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink
          to="/"
          className="hover:text-blue-500 transition-colors duration-200"
        >
          HOME
        </NavLink>
        <NavLink
          to="/feedback"
          className="hover:text-blue-500 transition-colors duration-200"
        >
          FEEDBACK
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-blue-500 transition-colors duration-200"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className="hover:text-blue-500 transition-colors duration-200"
        >
          CONTACT
        </NavLink>
        <NavLink to="/admin-login" className="hover:text-primary">
          ADMIN LOGIN
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-9 rounded-full hover:scale-110 transition-transform"
              src={userProfileImage || assets.upload_area}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-xl shadow-lg flex flex-col gap-3 p-4 border border-gray-100">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-blue-500 cursor-pointer transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={logout}
                  className="hover:text-blue-500 cursor-pointer transition-colors"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200 hidden md:block"
          >
            Sign In
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer hover:scale-110 transition-transform"
          src={assets.menu_icon}
          alt="Menu"
        />

        {showMenu && (
          <div className="fixed top-0 right-0 w-full h-screen bg-white z-50 p-6 flex flex-col items-center animate-slideIn">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/");
              }}
              className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/feedback");
              }}
              className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
            >
              Feedback
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/about");
              }}
              className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
            >
              About
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/contact");
              }}
              className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
            >
              Contact
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/admin-login");
              }}
              className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
            >
              Admin Login
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-profile");
                  }}
                  className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-orders");
                  }}
                  className="w-full py-3 border-b border-gray-200 text-left px-4 hover:bg-gray-100"
                >
                  My Orders
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="w-full py-3 text-left px-4 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg mt-4"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

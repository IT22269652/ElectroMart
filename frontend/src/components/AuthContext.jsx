import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminData");
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin);
        setIsAdminLoggedIn(true);
        setAdminData(admin);
      } catch (e) {
        console.error("Failed to parse admin data", e);
        localStorage.removeItem("adminData");
      }
    }

    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const login = (newToken) => {
    setIsLoggedIn(true);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUserProfileImage("https://via.placeholder.com/40");
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem("adminData");
  };

  const adminLogin = (adminInfo) => {
    setIsAdminLoggedIn(true);
    setAdminData(adminInfo);
    localStorage.setItem("adminData", JSON.stringify(adminInfo));
    setIsLoggedIn(false);
    setUserProfileImage("");
    setToken("");
    localStorage.removeItem("token");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileImage("");
    setToken("");
    localStorage.removeItem("token");
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem("adminData");
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem("adminData");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userProfileImage,
        token,
        login,
        isAdminLoggedIn,
        adminData,
        adminLogin,
        adminLogout,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

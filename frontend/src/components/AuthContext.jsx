import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");
  
  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  // Check for existing admin session on initial load
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminData');
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin);
        setIsAdminLoggedIn(true);
        setAdminData(admin);
      } catch (e) {
        console.error("Failed to parse admin data", e);
        localStorage.removeItem('adminData');
      }
    }
  }, []);

  // Regular user login
  const login = (profileImage) => {
    setIsLoggedIn(true);
    setUserProfileImage(profileImage);
    // Ensure admin state is cleared when regular user logs in
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminData');
  };

  // Admin login
  const adminLogin = (adminInfo) => {
    setIsAdminLoggedIn(true);
    setAdminData(adminInfo);
    // Store admin data in localStorage for persistence
    localStorage.setItem('adminData', JSON.stringify(adminInfo));
    // Ensure regular user state is cleared when admin logs in
    setIsLoggedIn(false);
    setUserProfileImage("");
  };

  // Logout function for both user and admin
  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileImage("");
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminData');
  };

  // Admin-specific logout
  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminData');
  };

  return (
    <AuthContext.Provider
      value={{
        // User auth
        isLoggedIn,
        userProfileImage,
        login,
        
        // Admin auth
        isAdminLoggedIn,
        adminData,
        adminLogin,
        adminLogout,
        
        // General logout (clears both user and admin)
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
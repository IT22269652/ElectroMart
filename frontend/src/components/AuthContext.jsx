import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");

  const login = (profileImage) => {
    setIsLoggedIn(true);
    setUserProfileImage(profileImage);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfileImage("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userProfileImage, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

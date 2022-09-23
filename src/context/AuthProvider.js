import React, { createContext } from "react";
import UseUserDetails from "../hooks/UseUserDetails";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContext = UseUserDetails();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

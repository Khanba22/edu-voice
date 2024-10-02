import { createContext, useRef, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    setUserDetails(null);
    localStorage.removeItem("userDetails");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        setUserDetails,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

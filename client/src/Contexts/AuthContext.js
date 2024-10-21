import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [hasJWT, setHasJWT] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem("userDetails");
    if (jwt) {
      setHasJWT(true);
      login();
    }
  },[hasJWT]);

  const handleLoginSuccess = async (response) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem("userDetails", JSON.stringify(userObject));
    setHasJWT(true);
    console.log("User Info:", userObject);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasJWT(false);
    setUserDetails(null);
    localStorage.removeItem("userDetails");
  };
  

  const login = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL, "BackendURL")
    if (localStorage.getItem("userDetails")) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, {
        method: "POST",
        body: JSON.stringify({ email: userData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          if (data === null) {
            navigate("/auth/create-user");
          } else {
            if (window.location.pathname === "/auth") {
                navigate("/channel")
            }
            setIsAuthenticated(true);
            setUserDetails(data.user);
          }
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        handleLoginFailure,
        handleLoginSuccess,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const GoogleAuthProvider = () => {
  const [hasJWT,setHasJWT] = useState(false);
  const navigate = useNavigate();
  const { setUserDetails, setIsAuthenticated } = useContext(UserContext);
  const getUserDetails = async () => {
    if (localStorage.getItem("userDetails")) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));
      console.log("", userData);
      await fetch("http://localhost:4000/user/get-user", {
        method: "POST",
        body: JSON.stringify({ email: userData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }else{
            return null
          }
        })
        .then((data) => {
          console.log(data);
          if (data === null) {
            navigate("./create-user");
          } else {
            // Save The Login User
            setIsAuthenticated(true);
            setUserDetails(data.user)
            navigate("/")
          }
        });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [hasJWT]);

  const handleLoginSuccess = async (response) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem("userDetails", JSON.stringify(userObject));
    setHasJWT(true);
    console.log("User Info:", userObject);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login/Signup Page</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;

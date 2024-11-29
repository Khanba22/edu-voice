import React, { useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";


const GoogleAuthProvider = () => {
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);
  const {setIsAuthenticated} = useContext(AuthContext)

  const { handleLoginFailure, handleLoginSuccess } = useContext(AuthContext);
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const [details,setUserData] = useState({
    email:"",
    password:''
  })
  
  const handleSubmit = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...details,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("Failed To Create User");
          return null;
        }
      })
      .then((data) => {
        if (data == null) {
          alert("Error In Creating User");
        } else {
          setIsAuthenticated(true);
          setUserDetails(data.user);
          navigate("/home");
        }
      });
  };

  const handleChange  = (e)=>{
    setUserData({
      ...details,
      [e.target.name]:e.target.value
    })
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login/Signup Page</h1>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={handleChange} name="email" value={details.email} />
        <label htmlFor="email">Password</label>
        <input type="text" onChange={handleChange} name="password" value={details.password} />
        <button onClick={handleSubmit}>Login</button>
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

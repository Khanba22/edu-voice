import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const CreateUser = () => {
  const navigate = useNavigate();
  const { setUserDetails, setIsAuthenticated } = useContext(UserContext);
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    await fetch("http://localhost:4000/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...details,
        email,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("User Created Successfully");
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
          navigate("/");
        }
      });
  };

  const { email } = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <div className="container h-full w-full pt-20 flex justify-center items-center">
        <div className="flex flex-col h-1/2 w-1/2">
          <label htmlFor="email">Email ID</label>
          <input type="text" name="email" disabled value={email} />
          <label htmlFor="email">UserName</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={details.username}
          />
          <label htmlFor="email">Password</label>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            value={details.password}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;

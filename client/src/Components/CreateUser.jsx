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
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...details,
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
          navigate("/home");
        }
      });
  };

  // const { email } = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-violet-600 to-fuchsia-300 flex justify-center items-center ">
        <div className='w-[80%] h-[85%] bg-zinc-200 flex items-center pl-8' >
          <div className='w-[35%] h-[93%] bg-zinc-100 drop-shadow-lg rounded-lg'>
            <div className=" h-full flex flex-col  ">

              <div className='w-full h-20 flex flex-col pt-8 ml-5'>
                <h2 className='text-4xl font-semibold text-black '>Create Your Account</h2>
              </div>

              <label htmlFor="email" className="text-black text-xl pl-5 ml-5  mt-10 mb-2">Email ID</label>
                <input placeholder='abcd123@gmail.com' className='w-[70%] px-4 py-3 rounded-xl text-lg pl-5 ml-5 border-[1.3px] border-black outline-none ' type="text" name="email"  />
                <label htmlFor="email" className="text-black text-xl pl-5 ml-5  mt-6 mb-2">UserName</label>
                <input
                  placeholder='Username'
                  className='w-[70%] px-4 py-3 rounded-xl pl-5 ml-5 text-lg border-[1.3px] border-black outline-none '
                  onChange={handleChange}
                  type="text"
                  name="username"
                  value={details.username}
                />
                <label className="text-black text-xl pl-5 ml-5  mt-6 mb-2"  htmlFor="email">Password</label>
                <input
                  placeholder='Password'
                  className='w-[70%] px-4 py-3 pl-5 ml-5 rounded-xl text-lg border-[1.3px] border-black outline-none '
                  onChange={handleChange}
                  type="text"
                  name="password"
                  value={details.password}
                />
                <button className='w-[70%] ml-5 mt-10 text-zinc-200 text-2xl font-semibold py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl ' onClick={handleSubmit} >
                  Submit
                </button>
            </div>
          </div>
          <div className='images w-[65%]'>
              <img src="/images/Login-Vol.2.webp" alt="" className='w-full object-cover' />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;

     //      <div className="flex flex-col items-center h-1/2 w-[30%] border ml-20 mt-28 ">
        //   <h1 className="text-white text-7xl ">Create a User</h1>
        //   <label htmlFor="email" className="text-white text-xl text-center mt-10 mb-2">Email ID</label>
        //   <input className='w-[70%] px-4 py-3 rounded-xl text-lg border-[1.3px] border-black outline-none ' type="text" name="email"  />
        //   <label htmlFor="email" className="text-white text-xl text-center mt-6 mb-2">UserName</label>
        //   <input
        //     className='w-[70%] px-4 py-3 rounded-xl text-lg border-[1.3px] border-black outline-none '
        //     onChange={handleChange}
        //     type="text"
        //     name="username"
        //     value={details.username}
        //   />
        //   <label htmlFor="email">Password</label>
        //   <input
        //     onChange={handleChange}
        //     type="text"
        //     name="password"
        //     value={details.password}
        //   />
        //   <button onClick={handleSubmit} className="btn btn-primary">
        //     Submit
        //   </button>
        // </div>

        // <img src="/images/Login-Vol.2.webp" alt="" className=" w-1/2 border border-l-2 object-cover"/>
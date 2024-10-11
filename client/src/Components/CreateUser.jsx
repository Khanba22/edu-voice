import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import SignUpForm from "./SignUpForm";

const CreateUser = () => {

  // const navigate = useNavigate();
  // const { setUserDetails, setIsAuthenticated } = useContext(UserContext);
  // const [details, setDetails] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   setDetails({ ...details, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async () => {
  //   await fetch("http://localhost:4000/user/create-user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...details,
  //       // email,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         alert("User Created Successfully");
  //         const ans =  res.json();
  //         console.log("Showing Ans : " + ans);
  //         return ans;
  //       } else {
  //         console.log("Failed To Create User");
  //         return null;
  //       }
  //     })
  //     .then((data) => {
  //       if (data == null) {
  //         alert("Error In Creating User");
  //       } else {
  //         setIsAuthenticated(true);
  //         console.log('Showing data user in 2nd then () : '+data.user)
  //         setUserDetails(data.user);
  //         navigate("/");
  //       }
  //     });
  // };

  // const { email } = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-violet-600 to-fuchsia-300 flex justify-center items-center'>
        <div className='w-[80%] h-[85%] bg-zinc-200 flex items-center pl-8' >
            <div className='w-[35%] h-[93%] bg-zinc-100 drop-shadow-lg rounded-lg'>
              <SignUpForm />
            </div>
            <div className='images w-[65%]'>
                <img src="/images/Login-Vol.2.webp" alt="" className='w-full object-cover' />
            </div>
        </div>
      </div>
    </>
  )
  
};

export default CreateUser;



// return (
//   <>
//     <div className="container h-full w-full pt-20 flex justify-center items-center">
//       <div className="flex flex-col h-1/2 w-1/2">
//         <label htmlFor="email">Email ID</label>
//         <input type="text" name="email" disabled value={email} />
//         <label htmlFor="email">UserName</label>
//         <input
//           onChange={handleChange}
//           type="text"
//           name="username"
//           value={details.username}
//         />
//         <label htmlFor="email">Password</label>
//         <input
//           onChange={handleChange}
//           type="text"
//           name="password"
//           value={details.password}
//         />
//         <button onClick={handleSubmit} className="btn btn-primary">
//           Submit
//         </button>
//       </div>
//     </div>
//   </>
// );
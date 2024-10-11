import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext";


const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUserDetails, setIsAuthenticated } = useContext(UserContext)
    const { register, handleSubmit } = useForm();
    const submitHandler = async (data) => {
        const res = await axios.post(`http://localhost:4000/user/create-user`, {
            username: data.username,
            email: data.email,
            password: data.password,
        })

        if(res.data.success) {
            alert("User created successfully");
            // setIsAuthenticated(true);
            //mushan bhai 
            setUserDetails(res.data.user);
            navigate(`/auth/login`)
        } else {
            alert ("User creation failed");
            navigate(`/auth/create-user`);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(submitHandler)} className='w-full h-full flex flex-col justify-center gap-8 px-12'>
            <div className='w-full h-20 flex flex-col pt-8 '>
                <h2 className='text-4xl font-semibold text-black '>Create Your Account</h2>
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='font-semibold'>Username</h4>
                <input type="text"  {...register('username')} className='w-[70%] px-4 py-3 rounded-xl text-lg border-[1.3px] border-black outline-none ' />
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='font-semibold'>Email Address</h4>
                <input type="email"  {...register('email')} placeholder='abcd123@gmail.com' className='w-[70%] px-4 py-3 rounded-xl text-lg border-[1.3px] border-black outline-none ' />
            </div>

            <div className='flex flex-col gap-1 w-[70%]'>
                <div className='flex justify-between'><h4 className='text-md font-semibold'>Password</h4></div>
                <input type="text" {...register('password')} placeholder='Password' name="password" id="password" className='py-3 rounded-xl text-lg border-[1.3px] border-black outline-none px-4' />
            </div>

            <div className='flex flex-col gap-1 w-[70%]'>
                <div className='flex justify-between'><h4 className='text-md font-semibold'>Confirm Password</h4></div>
                <input type='password' placeholder='Password' name="CNFpassword" id="CNFpassword" className='py-3 rounded-xl text-lg border-[1.3px] border-black outline-none px-4' />
            </div>

            <div className='flex justify-center w-[70%] py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl '>
                <input type="submit" value="Create" className='text-zinc-200 text-2xl font-semibold '/>
            </div>
        </form>
    </div>
  )
}

export default SignUpForm

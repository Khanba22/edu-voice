import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Forms = () => {
    const { register, reset , handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const response = await axios.post(`http://localhost:4000/user/login`, {
                username: data.username, 
                password: data.password,
                remember: data.remember
            })
    
            console.log(response.data);
            if(response.data.result) {
                alert(response.data.message);
                navigate('/home');
            } else {
                alert('Invalid Credentials, Please Fill correct credentials');
            }
        } catch (error) {
            alert("Invalid Credentials, Please Fill correct credentials")
            reset();
        }
        // setUserData({
        //     email: data.email,
        //     password: data.password,
        //     checked: data.checkbox
        // });
        

    }

  return (
    <>
        <form onSubmit={handleSubmit(submitHandler)} className='w-full h-full flex flex-col justify-center gap-8 px-12' >
            <div className='w-full h-20 flex flex-col gap-3'>
                <h2 className='text-4xl font-semibold text-black '>Login</h2>
                <p className='text-zinc-400'>Doesn't have an Account yet ? <span className='text-blue-500' > <Link to={'/auth/create-user'}  > Sign Up  </Link> </span></p>
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='font-semibold'>Username</h4>
                <input type="text"  {...register('username')} placeholder='Username' className='w-[70%] px-4 py-3 rounded-xl text-lg border-[1.3px] border-black outline-none ' />
            </div>

            <div className='flex flex-col gap-1 w-[70%]'>
                <div className='flex justify-between'><h4 className='text-md font-semibold'>Password</h4> <h5 className='text-blue-500 text-sm'>Forget Password</h5></div>
                <input type="password" {...register('password')} placeholder='Password' name="password" id="password" className='py-3 rounded-xl text-lg border-[1.3px] border-black outline-none px-4' />
            </div>
            <div className='flex gap-3 items-center'>
                <input type="checkbox" {...register('remember')} name="remember" id="remember" />
                <p className='text-sm text-zinc-400'>Remember me</p>
            </div>

            <div className='flex justify-center w-[70%] py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl '>
                <input type="submit" value="Login" className='text-zinc-200 text-2xl font-semibold '/>
            </div>

            <div className='flex items-center gap-2'>
                <p className='h-[1px] w-[33%] bg-black'></p>
                <p> or login with </p>
                <p className='h-[1px] w-[33%] bg-black'></p>
            </div>

            <div className='w-full flex gap-3'>
                <button className='flex gap-3 items-center border-2 w-1/2 justify-center border-red-700 rounded-xl '>
                    <img src="https://pngimg.com/d/google_PNG19635.png" alt="" className='w-[3vw] object-cover rounded-full' />
                    <p className='text-red-700 font-semibold'>Google</p>
                </button>
                <button className='flex gap-3 items-center border-2 w-1/2 justify-center py-1 border-black  rounded-xl '>
                    <img src="https://pngimg.com/d/github_PNG83.png" alt="" className='w-[2.8vw] object-cover rounded-full' />
                    <p className='text-black font-semibold'>Github</p>
                </button>
            </div>
        </form>  
    </>
  )
}

export default Forms

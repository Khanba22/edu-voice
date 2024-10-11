import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import Navbar from "../Components/Navbar";
import NavigationBar from "../Components/NavigationBar";

const HomePage = () => {
  const data = [{
    title: "Eduvoice"
  }]
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-gradient-to-r from-violet-600 to-fuchsia-300'>
        <div className='bg-gradient-to-r from-violet-400 to-fuchsia-200 w-[93%] h-[90%]'>
        <NavigationBar />
        <div className='flex w-full h-[86%] px-10'>
              <div className='flex flex-col w-1/2  h-full gap-7 '>
                  <h1 className='text-[6vw] mt-20 px-8'>EDU-VOICE</h1>
                  <p className='text-3xl px-10 text-black'>A learning platform that enhances the educational experience by integrating detailed explanations, speech and 3D animation, interactivity, and chatbot support.
                  </p>

                  <button className='bg-orange-300 rounded-full w-[30%] ml-10 mt-3 py-4 transition-all duration-500 ease-in-out hover:bg-gradient-to-r from-violet-500 to-fuchsia-200 hover:scale-105 hover:opacity-90 text-xl text-white drop-shadow-md'>
                    More About
                  </button>

              </div>
              <img src="https://img.freepik.com/premium-vector/man-sitting-desk-working-laptop-activities-office-trending-simple-minimalist-flat-vector-illustration_538213-50273.jpg?w=826" alt="" className='w-1/2 object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default HomePage;

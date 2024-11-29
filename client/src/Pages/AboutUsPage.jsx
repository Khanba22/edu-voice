import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
const AboutUsPage = () => {
    const Data = [
        {
            img: "/images/Mushan.jpg",
            desc: "Mushan Khan",
            email: "mushan@gmail.com"            
        },
        {
            img: "/images/Raunak.jpg",
            desc: "Raunak Jijotia",
            email: "raunak@gmail.com"        
        },
        {
            img: "/images/Tripty.jpg",
            desc: "Tripty Tiwari",
            email: "tripty@gmail.com"        
        }, 
        {
            img: "/images/Lavanya.jpg",
            desc: "Lavanya Chawla",
            email: "lavanya@gmail.com"        
        }
    ]
        
    const navigate = useNavigate();
    const handler = ()=> {
        navigate(-1);
    }

  return (
    <div className='w-[100vw] h-[100vh] pt-20 flex justify-center gap-5 items-center bg-gradient-to-r from-violet-600 to-fuchsia-300 relative'>
        <img src="/images/left-arrow.svg" alt="" className='absolute w-[50px] h-[50px] top-20 left-28 mix-blend-multiply ' onClick={handler}/>
        <div className='w-[80%] h-[80%] flex gap-3'>
            {Data.map((d)=>{
                return <AboutBlock images={d.img} desc={d.desc} email={d.email}/>
            })}
        </div>
    </div>
  )
}


const AboutBlock = ({images, desc, email}) => {
    return (
      <div className='w-[80%] h-[60%] rounded-lg bg-white flex flex-col items-center justify-center shadow-2xl shadow-yellow-600'>
          
           <img className='w-[80%] h-[80%] object-cover' src={images} ></img>
          
          <div className='flex flex-col justify-center text-xl'>
              
              <p > {desc} </p>
              <p>{email}</p>
             
          </div>
      </div>
    )
  }

export default AboutUsPage;


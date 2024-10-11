import React from 'react'
import Forms from '../Components/Forms'

const LoginPage = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-violet-600 to-fuchsia-300 flex justify-center items-center'>
          <div className='w-[80%] h-[85%] bg-zinc-200 flex items-center pl-8' >
              <div className='w-[35%] h-[93%] bg-zinc-100 drop-shadow-lg rounded-lg'>
                  <Forms />              
              </div>
              <div className='images w-[65%]'>
                  <img src="/images/Login-Vol.2.webp" alt="" className='w-full object-cover' />
              </div>
          </div>
        </div>
      )
}

export default LoginPage


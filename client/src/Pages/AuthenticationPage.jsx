import React from 'react'
import GoogleAuthProvider from '../Components/GoogleAuthProvider'

const AuthenticationPage = () => {
  return (
    <div className='h-full w-full'>
      Login/Signup Page
      <GoogleAuthProvider/>
    </div>
  )
}

export default AuthenticationPage

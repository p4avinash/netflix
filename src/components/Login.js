import React, { useState } from "react"
import { Header } from "./index"
import background from "../assets/images/netflix_background.jpg"

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className=''>
      <Header />
      <div className='absolute'>
        <img src={background} className='' alt='background' />
      </div>
      <form className='absolute bg-black bg-opacity-85 my-36 right-0 left-0 mx-auto p-10 rounded-md w-3/12 text-white'>
        <div className=''>
          <h1 className='text-3xl font-bold text-white pb-8'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              type='text'
              className='p-3 m-2 w-full border border-gray-300 text-white bg-gray-700 rounded-sm'
              placeholder='Full Name'
            />
          )}
          <input
            type='text'
            className='p-3 m-2 w-full border border-gray-300 text-white bg-gray-700 rounded-sm'
            placeholder='Email'
          />
          <input
            type='password'
            className='p-3 m-2 w-full border border-gray-300 text-white bg-gray-700 rounded-sm'
            placeholder='Password'
          />
        </div>
        <button className='p-2 m-2 w-full text-white bg-red-600 rounded-md'>
          Sign In
        </button>
        <p className='my-4 mx-2 cursor-pointer' onClick={() => handleSignIn()}>
          <span className='text-gray-400'>
            {" "}
            {isSignIn ? "New to Netflix ?" : "Already registered ?"}{" "}
          </span>
          <span>{isSignIn ? "Sign Up Now" : "Sign In Now"}</span>
        </p>
      </form>
    </div>
  )
}

export default Login

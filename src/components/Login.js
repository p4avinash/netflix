import React, { useRef, useState } from "react"
import { Header } from "./index"
import background from "../assets/images/netflix_background.jpg"
import { checkValidation } from "../utils/validate"
import { auth } from "../utils/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [disableSubmitButton, setDisableSubmitButton] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  const handleSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisableSubmitButton(false)
    console.log("sign in button clicked")
    const formValidationMessage = checkValidation(
      emailRef.current.value,
      passwordRef.current.value
    )
    setErrorMessage(formValidationMessage)
    if (errorMessage === null) {
      if (isSignIn) {
        // Authenticate User

        signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log("sign in user ---", user)
            if (user) {
              setDisableSubmitButton(false)
              navigate("/browse")
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setErrorMessage(errorCode + "-" + errorMessage)
            setDisableSubmitButton(false)
          })
      } else {
        // Create New User
        createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user
            console.log("user create status ---", user)
            setDisableSubmitButton(false)
            navigate("/browse")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setErrorMessage(errorCode + "-" + errorMessage)
            setDisableSubmitButton(false)
            // ..
          })
      }
    }
    // setDisableSubmitButton(false)
  }

  return (
    <div className='bg-black w-full h-screen ease-in-out duration-300 background-image'>
      <Header />
      {/* <div className='absolute'>
        <img src={background} className='background-image' alt='background' />
      </div> */}
      <form className='absolute bg-black lg:bg-opacity-85 md:bg-opacity-85 my-32 right-0 left-0 mx-auto p-10 rounded-md lg:w-3/12 md:w-4/12 sm:w-full text-white'>
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
            ref={emailRef}
            type='text'
            className='p-3 m-2 w-full border border-gray-300 text-white bg-gray-700 rounded-sm'
            placeholder='Email'
          />
          <input
            ref={passwordRef}
            type='password'
            className='p-3 m-2 w-full border border-gray-300 text-white bg-gray-700 rounded-sm'
            placeholder='Password'
          />
        </div>
        <p className='m-2 text-red-600'>{errorMessage}</p>
        <button
          disabled={disableSubmitButton}
          onClick={(e) => handleSubmit(e)}
          className={`${
            disableSubmitButton ? "cursor-not-allowed bg-red-500" : ""
          } p-2 m-2 w-full text-white bg-red-700 rounded-md `}
        >
          Sign In
        </button>
        <p className='my-2 mx-2 cursor-pointer' onClick={handleSignIn}>
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

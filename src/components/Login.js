import React, { useRef, useState } from "react"
import { Header } from "./index"
import { checkValidation } from "../utils/validate"
import { auth } from "../utils/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { useDispatch } from "react-redux"
import { setLoggedInUserData } from "../utils/slices/userSlice"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [disableSubmitButton, setDisableSubmitButton] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const fullNameRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisableSubmitButton(true)
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
            console.log("sign in successful")
            if (user) {
              setDisableSubmitButton(false)
              navigate("/browse")
            }
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
            console.log("user create successful", user)

            // Update the other details of just created user profile
            updateProfile(auth.currentUser, {
              displayName: fullNameRef.current.value,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser
                dispatch(
                  setLoggedInUserData({
                    uid,
                    email,
                    displayName,
                    photoURL,
                  })
                )
                console.log("user update successful")
                navigate("/browse")
                setDisableSubmitButton(false)
              })
              .catch((error) => {
                // An error occurred
                console.log("something went wrong while updating the user")
              })
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
    setDisableSubmitButton(false)
  }

  return (
    <div className='bg-black w-full h-screen ease-in-out duration-300 background-image'>
      <Header />
      <form className='absolute bg-black bg-opacity-85 my-[25vh] right-0 left-0 mx-auto p-10 rounded-md lg:w-4/12 md:w-4/12 sm:w-full text-white'>
        <div className=''>
          <h1 className='text-3xl font-bold text-white pb-8'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={fullNameRef}
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
          {isSignIn ? "Sign In" : "Sign Up"}
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

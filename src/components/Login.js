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
import { AVATAR_URL } from "../utils/constant"

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [disableSubmitButton, setDisableSubmitButton] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const fullNameRef = useRef(null)
  const dispatch = useDispatch()

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
    if (formValidationMessage === null) {
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
              photoURL: AVATAR_URL,
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
    <div className='bg-black w-full min-h-screen relative flex flex-col justify-center items-center background-image overflow-x-hidden'>
      <Header />
      <div className='w-full flex justify-center items-center px-4 py-24 sm:py-28 z-20'>
        <form className='w-full max-w-md bg-black/80 backdrop-blur-md p-6 sm:p-10 rounded-xl border border-neutral-800 text-white shadow-2xl space-y-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white mb-6'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          <div className='space-y-4'>
            {!isSignIn && (
              <input
                ref={fullNameRef}
                type='text'
                className='p-3 w-full border border-neutral-700 text-white bg-neutral-900/90 rounded-md outline-none focus:border-red-600 transition-colors'
                placeholder='Full Name'
              />
            )}
            <input
              ref={emailRef}
              type='text'
              className='p-3 w-full border border-neutral-700 text-white bg-neutral-900/90 rounded-md outline-none focus:border-red-600 transition-colors'
              placeholder='Email Address'
            />
            <input
              ref={passwordRef}
              type='password'
              className='p-3 w-full border border-neutral-700 text-white bg-neutral-900/90 rounded-md outline-none focus:border-red-600 transition-colors'
              placeholder='Password'
            />
          </div>

          {errorMessage && (
            <p className='text-red-500 text-sm font-medium pt-1'>
              {errorMessage}
            </p>
          )}

          <button
            disabled={disableSubmitButton}
            onClick={(e) => handleSubmit(e)}
            className={`${
              disableSubmitButton
                ? "cursor-not-allowed bg-red-800"
                : "bg-red-600 hover:bg-red-700"
            } p-3 w-full text-white font-semibold rounded-md transition-colors shadow-lg mt-2`}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p
            className='pt-4 text-sm cursor-pointer select-none'
            onClick={handleSignIn}
          >
            <span className='text-gray-400'>
              {isSignIn ? "New to Netflix? " : "Already registered? "}
            </span>
            <span className='text-white font-medium hover:underline'>
              {isSignIn ? "Sign Up Now" : "Sign In Now"}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

import React from "react"
import { useRouteError, Link } from "react-router-dom"

const Error = () => {
  const error = useRouteError()
  console.log(error.error.message)
  return (
    <div className='v-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-black ease-in-out duration-200'>
      <div className='error-message mb-5 sm:mb-10 md:mb-15 lg:mb-20'>
        <h1 className='text-xl sm:text-3xl md:text-3xl lg:text-3xl  text-white font-semibold p-4'>
          {error.error.message}
        </h1>
      </div>
      <div className='home-button'>
        <Link to={"/"}>
          <button className='bg-black text-white p-4 rounded-md active:scale-95 shadow-2xl active:shadow-sm active:translate-y-1'>
            Go Back To Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Error

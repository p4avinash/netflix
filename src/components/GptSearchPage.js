import React from "react"
import { GptSearchBar, GptMovieSuggestions } from "./index"

const GptSearchPage = () => {
  return (
    <div className='background-image bg-black w-full h-screen ease-in-out duration-300'>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearchPage

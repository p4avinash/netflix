import React from "react"
import { useSelector } from "react-redux"
import { MoviesList } from "./index"

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt)
  if (!movieNames) return null

  return (
    <div className='p-2 sm:p-4 m-2 sm:m-6 bg-black/85 backdrop-blur-md text-white rounded-2xl border border-neutral-800 shadow-2xl space-y-4'>
      {movieNames.map((item, index) => {
        return (
          <MoviesList key={index} title={item} movies={movieResults[index]} />
        )
      })}
    </div>
  )
}

export default GptMovieSuggestions

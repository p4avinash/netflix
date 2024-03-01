import React from "react"
import { useSelector } from "react-redux"
import { MoviesList } from "./index"

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt)
  if (!movieNames) return null

  return (
    <div className='p-4 m-4 bg-black bg-opacity-80  text-white rounded-md'>
      {movieNames.map((item, index) => {
        return (
          <MoviesList key={index} title={item} movies={movieResults[index]} />
        )
      })}
    </div>
  )
}

export default GptMovieSuggestions

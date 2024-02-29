import React from "react"
import { MovieCard } from "./index"

const MoviesList = ({ title, movies }) => {
  return (
    <div className='p-6  text-white'>
      <h1 className='text-2xl py-2'>{title}</h1>
      <div className='flex overflow-x-scroll'>
        <div className='flex'>
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={title}
                posterPath={movie.poster_path}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MoviesList

import React from "react"
import { MovieCard } from "./index"

const MoviesList = ({ title, movies }) => {
  return (
    <div className='px-4 sm:px-8 md:px-12 py-3 sm:py-4 text-white'>
      <h1 className='text-base sm:text-xl md:text-2xl font-bold py-1.5 sm:py-2 tracking-wide'>
        {title}
      </h1>
      <div className='flex overflow-x-scroll no-scrollbar py-2'>
        <div className='flex items-center'>
          {movies.map((movie) => {
            if (movie.poster_path) {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  title={title}
                  posterPath={movie?.poster_path}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default MoviesList

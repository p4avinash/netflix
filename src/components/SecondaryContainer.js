import React from "react"
import { MoviesList } from "./index"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
  const moviesFromStore = useSelector((store) => store.movies)
  console.log("moviesFromStore", moviesFromStore)

  return (
    moviesFromStore?.nowPlayingMovies &&
    moviesFromStore?.popularMovies &&
    moviesFromStore?.topRatedMovies &&
    moviesFromStore?.upcomingMovies && (
      <div className='bg-black'>
        <div className='lg:-mt-52 lg:relative lg:z-10 '>
          <MoviesList
            title={"Now Playing"}
            movies={moviesFromStore?.nowPlayingMovies}
          />
          <MoviesList
            title={"Popular"}
            movies={moviesFromStore?.popularMovies}
          />
          <MoviesList
            title={"Top Rated"}
            movies={moviesFromStore?.topRatedMovies}
          />
          <MoviesList
            title={"Upcoming"}
            movies={moviesFromStore?.upcomingMovies}
          />
          {/* 
          <MoviesList title={"Horror"} movies={nowPlayingMovies} /> 
          */}
        </div>
      </div>
    )
  )
}

export default SecondaryContainer

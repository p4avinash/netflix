import React from "react"
import { MoviesList } from "./index"
import { useSelector } from "react-redux"
import { lang } from "../utils/languageConstant"

const SecondaryContainer = () => {
  const moviesFromStore = useSelector((store) => store.movies)
  const selectedLanguage = useSelector((store) => store.config.language)

  return (
    moviesFromStore?.nowPlayingMovies &&
    moviesFromStore?.popularMovies &&
    moviesFromStore?.topRatedMovies &&
    moviesFromStore?.upcomingMovies && (
      <div className='bg-black'>
        <div className='relative z-20 -mt-10 sm:-mt-24 md:-mt-36 lg:-mt-52 pb-8'>
          <MoviesList
            title={lang[selectedLanguage].nowPlaying}
            movies={moviesFromStore?.nowPlayingMovies}
          />
          <MoviesList
            title={lang[selectedLanguage].popular}
            movies={moviesFromStore?.popularMovies}
          />
          <MoviesList
            title={lang[selectedLanguage].topRated}
            movies={moviesFromStore?.topRatedMovies}
          />
          <MoviesList
            title={lang[selectedLanguage].upcoming}
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

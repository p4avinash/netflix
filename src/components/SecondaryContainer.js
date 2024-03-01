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
        <div className='lg:-mt-52 lg:relative lg:z-10 '>
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

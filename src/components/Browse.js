import React from "react"
import {
  Header,
  MainContainer,
  SecondaryContainer,
  GptSearchPage,
} from "./index"
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies"
import usePopularMovies from "../utils/hooks/usePopularMovies"
import useTopRatedMovies from "../utils/hooks/useTopRatedMovies"
import useUpcomingMovies from "../utils/hooks/useUpcomingMovies"
import { useSelector } from "react-redux"

const Browse = () => {
  //Fetch movies data from API and update the store by calling custom hook
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()
  useUpcomingMovies()

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  return (
    <div className=''>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  )
}

export default Browse

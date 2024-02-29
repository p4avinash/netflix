import React from "react"
import { Header, MainContainer, SecondaryContainer } from "./index"
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies"
import usePopularMovies from "../utils/hooks/usePopularMovies"
import useTopRatedMovies from "../utils/hooks/useTopRatedMovies"
import useUpcomingMovies from "../utils/hooks/useUpcomingMovies"

const Browse = () => {
  //Fetch movies data from API and update the store by calling custom hook
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()
  useUpcomingMovies()

  return (
    <div className=''>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse

import React from "react"
import { Header, MainContainer, SecondaryContainer } from "./index"
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies"

const Browse = () => {
  //Fetch movies data from API and update the store by calling custom hook
  useNowPlayingMovies()

  return (
    <div className=''>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse

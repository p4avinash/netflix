import React from "react"
import { useSelector } from "react-redux"
import { VideoTitle, VideoBackground } from "./index"

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies)
  // console.log(movies)
  if (!movies) return

  const movieTrailer = movies[0]
  const { original_title, overview, id } = movieTrailer
  // console.log("moviesTrailer", movieTrailer)

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer

import React from "react"
import { POSTER_IMG_CDN } from "../utils/constant"

const MovieCard = ({ posterPath }) => {
  // console.log(movie)
  return (
    <div className='w-[12rem] pr-4'>
      <img
        className='rounded-md'
        src={`${POSTER_IMG_CDN}${posterPath}`}
        alt='poster'
      />
      {/* <p>Movie Card</p> */}
    </div>
  )
}

export default MovieCard

import React from "react"
import { useDispatch } from "react-redux"
import { POSTER_IMG_CDN } from "../utils/constant"
import { openTrailerModal } from "../utils/slices/moviesSlice"

const MovieCard = ({ posterPath, movie }) => {
  const dispatch = useDispatch()

  if (!posterPath) return null

  const handleCardClick = (e) => {
    e.stopPropagation()
    if (movie) {
      dispatch(openTrailerModal(movie))
    }
  }

  return (
    <div
      className='relative group w-28 sm:w-36 md:w-44 lg:w-48 pr-2 sm:pr-4 flex-shrink-0 cursor-pointer select-none'
      onClick={handleCardClick}
    >
      <div className='relative overflow-hidden rounded-md shadow-md transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-red-600/40 group-hover:scale-105'>
        <img
          className='w-full rounded-md object-cover transition-all duration-300 group-hover:brightness-75'
          src={`${POSTER_IMG_CDN}${posterPath}`}
          alt={movie?.title || "movie poster"}
        />

        {/* Animated Play Button Overlay */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10 bg-black/20 backdrop-blur-[1px]'>
          <div className='relative flex items-center justify-center'>
            {/* Subtle Pulse Animation Ring */}
            <div className='absolute w-14 h-14 rounded-full bg-red-600/40 animate-ping opacity-75'></div>
            {/* Netflix Red Play Button */}
            <div className='relative w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 transform scale-50 group-hover:scale-100 transition-all duration-300 ease-out border border-red-400/30'>
              <svg
                className='w-6 h-6 fill-current text-white ml-1'
                viewBox='0 0 24 24'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

import React from "react"
import playIcon from "../assets/images/play_icon.png"
import { useSelector, useDispatch } from "react-redux"
import { lang } from "../utils/languageConstant"
import { openTrailerModal } from "../utils/slices/moviesSlice"

const VideoTitle = ({ title, overview, movie }) => {
  const dispatch = useDispatch()
  const selectedLanguage = useSelector((store) => store.config.language)

  const handleOpenModal = () => {
    if (movie) {
      dispatch(openTrailerModal(movie))
    }
  }

  return (
    <div className='pt-[20%] sm:pt-[16%] md:pt-[14%] lg:pt-[12%] px-4 sm:px-8 md:px-16 absolute w-full aspect-video text-white bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none flex flex-col justify-center'>
      <div className='pointer-events-auto max-w-2xl space-y-2 sm:space-y-4'>
        <h1 className='text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md text-white'>
          {title}
        </h1>
        <p className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl drop-shadow'>
          {overview}
        </p>
        <div className='flex items-center gap-3 pt-1 sm:pt-3 z-10 relative'>
          <button
            onClick={handleOpenModal}
            className='bg-white hover:bg-neutral-200 text-black font-semibold px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md flex items-center justify-center gap-1.5 transition-all text-xs sm:text-base shadow-lg cursor-pointer'
          >
            <img
              className='w-3.5 h-3.5 sm:w-5 sm:h-5'
              src={playIcon}
              alt='play'
            />
            {lang[selectedLanguage].play}
          </button>
          <button
            onClick={handleOpenModal}
            className='bg-gray-500/70 hover:bg-gray-600/90 text-white font-semibold px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md flex items-center justify-center gap-1.5 transition-all text-xs sm:text-base shadow-lg backdrop-blur-sm cursor-pointer'
          >
            <svg
              className='w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current'
              viewBox='0 0 50 50'
            >
              <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z'></path>
            </svg>
            {lang[selectedLanguage].moreInfo}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle

import React from "react"
import playIcon from "../assets/images/play_icon.png"
import { useSelector } from "react-redux"
import { lang } from "../utils/languageConstant"

const VideoTitle = ({ title, overview }) => {
  const selectedLanguage = useSelector((store) => store.config.language)

  return (
    <div className='pt-[15%] px-5 absolute w-screen lg:aspect-video sm:aspect-video md:aspect-video aspect-auto text-white bg-gradient-to-r from-black'>
      <h1 className='lg:text-6xl md:text-6xl text-xl font-bold'>{title}</h1>
      <p className='lg:py-6 md:py-6 py-3 lg:text-lg md:text-lg text-sm lg:w-1/4 md:w-1/4 w-full'>
        {overview}
      </p>
      <div className='buttons flex'>
        <button className='bg-white p-2 px-6 text-black rounded-md flex justify-center items-center mr-5 hover:bg-opacity-70 ease-in-out duration-200'>
          <img
            className='mr-1'
            width='20'
            height='20'
            src={playIcon}
            alt='play--v1'
          />
          {lang[selectedLanguage].play}
        </button>
        <button className='bg-gray-600 hover:bg-gray-700 ease-in-out duration-200 text-white p-2 px-6 rounded-md flex justify-center items-center mr-5'>
          <svg
            className='mr-1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='20'
            height='20'
            viewBox='0 0 50 50'
          >
            <path
              fill='white'
              d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z'
            ></path>
          </svg>
          {lang[selectedLanguage].moreInfo}
        </button>
      </div>
    </div>
  )
}

export default VideoTitle

import { useSelector } from "react-redux"
import { GptSearchBar, GptMovieSuggestions } from "./index"
import backgroundImage from "../assets/images/netflix_background.jpg"

const GptSearchPage = () => {
  const isLoading = useSelector((store) => store.gpt.gptIsLoading)
  return (
    <div className='w-full h-screen ease-in-out duration-300'>
      <div className='fixed w-full h-screen -z-10'>
        <img
          src={backgroundImage}
          className='w-screen h-screen object-cover'
          alt='background'
        />
      </div>
      <GptSearchBar />
      {isLoading ? (
        <h1 className='text-shadow p-4 text-6xl -my-10 w-full flex justify-center text-white animate-bounce'>
          Loading
        </h1>
      ) : (
        <GptMovieSuggestions />
      )}
    </div>
  )
}

export default GptSearchPage

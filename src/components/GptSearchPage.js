import { useSelector } from "react-redux"
import { GptSearchBar, GptMovieSuggestions } from "./index"
import backgroundImage from "../assets/images/netflix_background_large.jpg"

const GptSearchPage = () => {
  const isLoading = useSelector((store) => store.gpt.gptIsLoading)
  return (
    <div className='w-full min-h-screen relative pb-12 overflow-x-hidden'>
      <div className='fixed inset-0 w-full h-full -z-10'>
        <img
          src={backgroundImage}
          className='w-full h-full object-cover filter brightness-50'
          alt='background'
        />
      </div>
      <GptSearchBar />
      {isLoading ? (
        <h1 className='text-shadow p-4 text-3xl sm:text-5xl font-bold w-full flex justify-center text-white animate-bounce tracking-widest'>
          Loading...
        </h1>
      ) : (
        <GptMovieSuggestions />
      )}
    </div>
  )
}

export default GptSearchPage

import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { lang } from "../utils/languageConstant"
import openai from "../utils/openai"
import { API_OPTIONS } from "../utils/constant"
import {
  addGptMovieListToStore,
  toggleGptIsLoading,
} from "../utils/slices/gptSlice"

const GptSearchBar = () => {
  const dispatch = useDispatch()
  const selectedLanguage = useSelector((store) => store.config.language)
  const searchRef = useRef(null)

  //Search movies in TMDB
  const searchMovieTMDB = async (movieName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&page=1`,
        API_OPTIONS
      )
      const movieData = await response.json()
      return movieData.results
    } catch (error) {
      console.log("something went wrong while fetching gptMovies from TMDB")
    }
  }

  const handleGptSearch = async () => {
    console.log("clicked on GPT search button", searchRef.current.value)

    // toggling the isLoading for GPT search result to true
    dispatch(toggleGptIsLoading(true))
    // Make API call to Open AI to get movie result
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchRef.current.value +
      ". Only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Suzume, Animal, Spider-Man, Your Name, Sam Bahadur"

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    })

    if (!gptResults.choices) {
      //Handle the error on fail
      console.log("handle error")
    }

    const gptMovies = gptResults.choices[0].message.content.split(",")

    //For all the movies in the array, search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))
    const tmdbResults = await Promise.all(promiseArray)

    dispatch(
      addGptMovieListToStore({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      })
    )
    dispatch(toggleGptIsLoading(false))
  }

  return (
    <div className='lg:py-[15%] md:py-[15%] py-[25%] flex justify-center'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='lg:w-1/2 md:w-1/2 w-full bg-black grid grid-cols-12 rounded-md'
      >
        <input
          ref={searchRef}
          className='p-2 m-4 col-span-9 rounded-md'
          type='text'
          placeholder={lang[selectedLanguage].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearch}
          className='py-2 px-4 m-4 col-span-3 bg-red-600 text-white rounded-md'
        >
          {lang[selectedLanguage].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar

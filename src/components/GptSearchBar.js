import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { lang } from "../utils/languageConstant"
import openai from "../utils/openai"
// import ai from "../utils/gemini"
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
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=true&page=1`,
        API_OPTIONS,
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

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // })

    const gptResults = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
    })

    const gptMovies = gptResults?.choices[0]?.message?.content
      ?.split(",")
      ?.map((movie) => movie?.trim())

    if (!gptResults.choices) {
      //Handle the error on fail
      console.log("handle error")
    }

    // const gptMovies = gptResults.choices[0].message.content.split(",")

    //For all the movies in the array, search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))
    const tmdbResults = await Promise.all(promiseArray)

    dispatch(
      addGptMovieListToStore({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      }),
    )
    dispatch(toggleGptIsLoading(false))
  }

  return (
    <div className='pt-24 sm:pt-32 md:pt-36 pb-6 px-4 flex justify-center'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full max-w-2xl bg-black/90 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-neutral-800 shadow-2xl flex flex-col sm:flex-row gap-2'
      >
        <input
          ref={searchRef}
          className='p-3 w-full bg-neutral-900 border border-neutral-700 text-white rounded-lg outline-none focus:border-red-600 transition-colors text-sm sm:text-base'
          type='text'
          placeholder={lang[selectedLanguage].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearch}
          className='py-3 px-6 bg-red-600 hover:bg-red-700 font-semibold text-white rounded-lg transition-colors shadow-md text-sm sm:text-base cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5'
        >
          <span>🔍</span>
          <span>{lang[selectedLanguage].search}</span>
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar

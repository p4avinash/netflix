import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../constant"
import { addPopularMoviesToStore } from "../slices/moviesSlice"

const usePopularMovies = () => {
  //Fetch movies data from API and update the store
  const dispatch = useDispatch()

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      )
      const popularMoviesData = await response.json()
      dispatch(addPopularMoviesToStore(popularMoviesData.results))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])
}

export default usePopularMovies

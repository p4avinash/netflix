import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../constant"
import { addPopularMoviesToStore } from "../slices/moviesSlice"

const usePopularMovies = () => {
  //Fetch movies data from API and update the store
  const dispatch = useDispatch()
  const popularMovies = useSelector((store) => store.movies.popularMovies)

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
    !popularMovies && getPopularMovies()
  }, [])
}

export default usePopularMovies

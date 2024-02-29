import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../constant"
import { addTopRatedMoviesToStore } from "../slices/moviesSlice"

const useTopRatedMovies = () => {
  //Fetch movies data from API and update the store
  const dispatch = useDispatch()

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      )
      const topRatedMoviesData = await response.json()
      dispatch(addTopRatedMoviesToStore(topRatedMoviesData.results))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTopRatedMovies()
  }, [])
}

export default useTopRatedMovies

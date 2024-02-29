import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../constant"
import { addUpcomingMoviesToStore } from "../slices/moviesSlice"

const useUpcomingMovies = () => {
  //Fetch movies data from API and update the store
  const dispatch = useDispatch()

  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      )
      const upcomingMoviesData = await response.json()
      dispatch(addUpcomingMoviesToStore(upcomingMoviesData.results))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUpcomingMovies()
  }, [])
}

export default useUpcomingMovies

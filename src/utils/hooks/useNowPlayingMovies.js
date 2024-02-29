import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../constant"
import { addNowPlayingMoviesToStore } from "../slices/moviesSlice"

const useNowPlayingMovies = () => {
  //Fetch movies data from API and update the store
  const dispatch = useDispatch()

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      )
      const nowPlayingMoviesData = await response.json()
      dispatch(addNowPlayingMoviesToStore(nowPlayingMoviesData.results))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNowPlayingMovies()
  }, [])
}

export default useNowPlayingMovies

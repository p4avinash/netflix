import { useEffect } from "react"
import { API_OPTIONS } from "../constant"
import { useDispatch } from "react-redux"
import { setMovieTrailerToStore } from "../slices/moviesSlice"

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()

  const getMovieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      )
      const data = await response.json()
      const filteredData = data.results.filter(
        (item) => item.type === "Trailer"
      )
      const trailer = filteredData.length ? filteredData[0] : data.results[0]

      dispatch(setMovieTrailerToStore(trailer))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieTrailer()
  }, [])
}

export default useMovieTrailer

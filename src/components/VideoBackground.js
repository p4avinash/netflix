import { useSelector } from "react-redux"
import useMovieTrailer from "../utils/hooks/useMovieTrailer"

const VideoBackground = ({ movieId }) => {
  // Set video trailer info to the store by using custom hook
  useMovieTrailer(movieId)

  // Fetching the trailer data from store
  const trailerFromStore = useSelector((store) => store.movies.movieTrailer)

  return (
    <div className='overflow-x-hidden video-background'>
      <iframe
        className='w-screen lg:aspect-video md:aspect-video aspect-auto'
        // width='560'
        // height='315'
        src={`https://www.youtube.com/embed/${trailerFromStore?.key}?autoplay=1&mute=1&showinfo=0&loop=1&playlist=${trailerFromStore.key}&rel=0`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  )
}

export default VideoBackground

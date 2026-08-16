import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeTrailerModal } from "../utils/slices/moviesSlice"
import { API_OPTIONS, POSTER_IMG_CDN } from "../utils/constant"

const TrailerModal = () => {
  const dispatch = useDispatch()
  const movie = useSelector((store) => store.movies.trailerModalMovie)
  const [trailerKey, setTrailerKey] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleClose = () => {
    dispatch(closeTrailerModal())
  }

  useEffect(() => {
    if (!movie?.id) return

    setLoading(true)
    setTrailerKey(null)

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          API_OPTIONS
        )
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          const trailers = data.results.filter((item) => item.type === "Trailer")
          const selectedVideo = trailers.length ? trailers[0] : data.results[0]
          setTrailerKey(selectedVideo?.key || null)
        } else {
          setTrailerKey(null)
        }
      } catch (err) {
        console.error("Failed to fetch trailer video:", err)
        setTrailerKey(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTrailer()
  }, [movie])

  // Handle escape key press & body scroll locking
  useEffect(() => {
    if (!movie) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [movie])

  if (!movie) return null

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : null

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null

  return (
    <div
      className='fixed inset-0 top-0 left-0 w-screen h-screen z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn'
      onClick={handleClose}
    >
      <div
        className='relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-neutral-900 border border-neutral-800 text-white rounded-2xl overflow-hidden shadow-2xl my-auto transform transition-all duration-300'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='absolute top-3 right-3 z-30 bg-black/70 hover:bg-red-600 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-colors duration-200 shadow-lg focus:outline-none'
          aria-label='Close trailer'
        >
          <svg
            className='w-5 h-5 sm:w-6 sm:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Video / Loading / Fallback Container */}
        <div className='relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden rounded-t-2xl flex-shrink-0'>
          {loading ? (
            <div className='flex flex-col items-center space-y-3 text-red-600'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin'></div>
              <span className='text-xs sm:text-sm text-gray-300 font-medium'>
                Loading Trailer...
              </span>
            </div>
          ) : trailerKey ? (
            <iframe
              className='w-full h-full border-0'
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title={movie.title || movie.original_title || "Movie Trailer"}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          ) : (
            <div className='flex flex-col items-center justify-center p-6 text-center bg-neutral-950 w-full h-full'>
              {movie.poster_path && (
                <img
                  src={`${POSTER_IMG_CDN}${movie.poster_path}`}
                  alt='Poster fallback'
                  className='h-28 sm:h-40 rounded-md mb-3 opacity-50 object-cover'
                />
              )}
              <p className='text-gray-300 font-semibold text-sm sm:text-lg'>
                No trailer video available for this movie.
              </p>
            </div>
          )}
        </div>

        {/* Movie Info Section */}
        <div className='p-4 sm:p-6 md:p-8 bg-gradient-to-b from-neutral-900 to-black space-y-3 overflow-y-auto custom-scrollbar flex-1'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white'>
              {movie.title || movie.original_title || movie.name}
            </h2>
            <div className='flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-300'>
              {rating && (
                <span className='bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-md flex items-center gap-1'>
                  ★ {rating}
                </span>
              )}
              {releaseYear && (
                <span className='bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-md text-gray-300'>
                  {releaseYear}
                </span>
              )}
              {movie.original_language && (
                <span className='uppercase bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-md text-gray-400'>
                  {movie.original_language}
                </span>
              )}
            </div>
          </div>

          {movie.overview && (
            <p className='text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed pr-1'>
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrailerModal

import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MovieCard=({movie})=>{
  const navigate =useNavigate()

  console.log(movie)
  return (
    <div className="card bg-gray-800 text-white dark:text-black dark:bg-gray-300 w-full overflow-hidden shadow-lg">
    <figure>
      <img
        src={movie?.movie_image}
        alt="Movies" />
    </figure>
    <div className="card-body">
      <h2 className="text-xl text-center font-semibold ">{movie?.title}</h2>
      <p className="text-center text-lg">{movie?.genre}</p>
      <p className="text-center text-lg">{movie?.languages}</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none" onClick ={()=>navigate(`/admin/movieDetails/${movie._id}`)}>View Movie</button> 
      </div>
    </div>
  </div>
  )
}

export default MovieCard
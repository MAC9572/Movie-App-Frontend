import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import CastList from '../../components/user/CastCard'
import CrewList from '../../components/user/crewCard'

const MovieDetails=()=> {
  const params =useParams()
  const {movieId} =params;
  console.log('params =', movieId)

  const[movieDetails, setMovieDetails]=useState([{}])
  const navigate =useNavigate()

  const fetchMovieDetails =async()=>{
    try {
      const response = await axiosInstance({
        method :"GET",
        url    :`/movies/show-movieDetails/${movieId}`
      })
      console.log(response)
      setMovieDetails(response?.data?.data)
    }catch(error){
     console.log(error)
    }
  };

  useEffect (()=>{
    fetchMovieDetails()
  },[])
  


  return (
    <div class="container mx-auto p-4">
    <div className="max-w-full mx-auto p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
  <section>
<h2 className="text-3xl text-center font-bold text-black dark:text-slate-400 mb-8">Movie Details</h2>
  </section>

  <section className="mt-6">
    <h2 className="text-2xl text-center font-semibold text-black dark:text-slate-100 mb-2">{movieDetails?.title}</h2>
    <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center mb-4 mt-6">
      <img 
        src={movieDetails?.movie_image} 
        alt={movieDetails?.title} 
        className="w-48 h-72 object-cover rounded-lg shadow-md" 
      />
      <div className="flex flex-col items-center sm:items-start">
        <p className="text-lg font-semibold text-black dark:text-white">Duration: {movieDetails?.duration}</p>
        <p className="text-lg font-semibold text-black dark:text-white">Languages: {movieDetails?.languages}</p>
        <p className="text-lg font-semibold text-black dark:text-white">Genre: {movieDetails?.genre}</p>
      </div>    
    </div>
    <div className="card-actions flex justify-center items-center mt-7">
  <button 
    className="btn btn-danger bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none" 
    onClick={() => navigate('/theatres')}
  >
    Book Movie
  </button>
</div>
    
    <div className="mt-9">
      <p className="text-xl font-bold text-black dark:text-slate-400">About the Movie</p>
      <p className="text-lg text-gray-800 mt-2 text-black dark:text-slate-100">{movieDetails?.description}</p>
    </div>
    
    <section className="mt-9">
      <h3 className="text-xl font-semibold text-black dark:text-slate-100 mb-2"></h3>
      <CastList cast={movieDetails?.cast} />
      <h3 className="text-xl font-semibold text-black dark:text-slate-100 mb-2"></h3>
      <CrewList crew={movieDetails?.crew} />
    </section>
  </section>
</div>
</div>
  )
}

export default MovieDetails
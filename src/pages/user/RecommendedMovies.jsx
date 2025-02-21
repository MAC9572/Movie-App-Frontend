import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/user/MovieCard'
import { axiosInstance } from '../../config/axiosInstance'
import { Link } from 'react-router-dom'

export const RecommendedMovies=()=> {

const[movies, setMovies]=useState([])


  const fetchMovies =async()=>{
    try {
      const response = await axiosInstance({
        method :"GET",
        url    :"/movies/show-movies"
      })
      console.log(response)
      setMovies(response?.data?.data.slice(0,5))
    }catch(error){
     console.log(error)
    }
  };

  useEffect (()=>{
    fetchMovies()
  },[])
  
  return (
    <div className='flex flex-col items-center p-4 justify-start px-20 py-16' >
    <section>
    <h1 className="text-2xl font-bold">Recommended Movies</h1>
      </section>
      <section className="mt-8 mb-5 w-full text-md flex justify-end">
    <Link to="/movies" className="text-blue-500 hover:underline">
      See All 
    </Link>
  </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies?.map((movie,index)=>(
            <MovieCard key={movie?._id} movie={movie}/>
        ))}
    </section>
    </div>
  )
}

export default RecommendedMovies
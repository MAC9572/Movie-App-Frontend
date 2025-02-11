import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/user/MovieCard'
import { axiosInstance } from '../../config/axiosInstance'

export const RecommendedMovies=()=> {

const[movies, setMovies]=useState([])


  const fetchMovies =async()=>{
    try {
      const response = await axiosInstance({
        method :"GET",
        url    :"/movies/show-movies"
      })
      console.log(response)
      setMovies(response?.data?.data)
    }catch(error){
     console.log(error)
    }
  };

  useEffect (()=>{
    fetchMovies()
  },[])
  
  return (
    <div className='flex flex-col items-center justify-start px-20 py-16' >
    <section>
    <h1 className="text-2xl mb-8 font-bold">Recommended Movies</h1>
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
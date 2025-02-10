import React from 'react'
import MovieCard from '../../components/user/MovieCard'
import { useFetch } from '../../hooks/useFetch'
import { MovieSkeleton } from '../../components/shared/Skeleton'

export const Movies=()=> {

const [movies, isLoading, error] =useFetch("/movies/show-movies")
  
  return ( 
    <div>
      {isLoading ? (
  <MovieSkeleton/>
  ): (
    <div class="container mx-auto p-4">
    <div className='flex flex-col items-center justify-start px-20 py-16'>
    <section>
    <h1 className="text-2xl mb-8 font-bold">Movies</h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies?.map((movie,index)=>(
            <MovieCard key={movie?._id} movie={movie}/>
        ))}
    </section>
    </div>
    </div>
  )}
    </div>
    
)}

export default Movies
import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/user/MovieCard'
import { axiosInstance } from '../../config/axiosInstance'

export const RecommendedMovies=()=> {

const[movies, setMovies]=useState([])

const [currentPage, setCurrentPage] = useState(0); // Keeps track of the current page
  const moviesPerPage = 5; // Number of movies to display per page

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.floor(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  // Get the current set of movies to display
  const startIndex = currentPage * moviesPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + moviesPerPage);


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
    <div className="flex justify-between w-full mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="bg-gray-300 dark:bg-white text-black hover:bg-gray-300 disabled:opacity-50 p-2 btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.floor(movies.length / moviesPerPage)}
          className="bg-gray-300 dark:bg-white text-black hover:bg-gray-300 disabled:opacity-50 p-2 btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  )
}

export default RecommendedMovies
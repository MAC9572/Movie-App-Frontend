import React, { useState,useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';


const Showtime = () => {
  const params =useParams()
  const {screenId} =params;
  console.log('params =', screenId)


  const [movieData, setMovieData] = useState([]);
      const navigate =useNavigate()
  
const fetchtheatres =async()=>{
  try{
  const response = await axiosInstance({
    method :"GET",
    url : `/schedules/get-schedule/${screenId}`
  })
  console.log(response)
  setMovieData(response?.data?.data);
}catch(error){
  console.error('Error fetching movies:', error);
}
}
  useEffect(() => {
   fetchtheatres()
  }, );

  return (

    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-700">
    <h1 className="text-3xl font-semibold text-center mb-10">Movie Schedules</h1>
    <div className="space-y-6">
      {movieData.map((movie) => (
        <div key={movie._id} className="mt-4">
          {/* Theatre Details
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{movie.screenId.name}</h3>
            <p className="text-md text-gray-500">
              {movie.screenId.location}, {movie.screenId.city}
            </p>
            <p className="text-md text-gray-500">Screen: {movie.screenId.screenType}</p>
          </div> */}

          {/* Movie & Showtimes Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{movie.movieId.title}</h2>
                <p className="text-lg text-gray-700">Language: {movie.movieId.languages}</p>
              </div>
            </div>

            {/* Showtimes Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold">Showtimes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {/* {movie.screenId.movieSchedules.map((schedule) => ( */}
                <button type="button"
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                    <p className="text-md text-black">
                      {new Date(movie.showDate).toDateString()}
                    </p>
                    <p className="text-md text-black">{movie.showTime}</p>
                  </button>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );

}
export default Showtime
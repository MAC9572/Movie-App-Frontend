import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams} from 'react-router-dom';


const MovieSchedule = () => {
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
  const params =useParams()
  const {screenId} =params;
  console.log('params =', screenId)

  const fetchtheatres = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `schedules/get-scheduleById/${screenId}`,
      });
      console.log(response);
      setMovieData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchtheatres();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">
      <h1 className="text-3xl font-semibold text-center mb-10">Movie Schedules</h1>
      <div className="space-y-6">
        {movieData.map((movie) => (
          <div key={movie._id} className="mt-4">
            {/* Movie & Showtimes Card */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{movie.movieId.title}</h2>
                  <p className="text-lg text-gray-700">Language: {movie.movieId.languages}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-lg font-semibold text-black">
                    Ticket Price: {movie.screenId.price}
                  </p>
                  <p className="text-sm text-green-500">
                    Seats Available: {movie.seatsAvailable ? 'Yes' : 'No'}
                  </p>
                  <p className="text-sm text-red-500">
                    {movie.screenId.cancellationAvailable
                      ? 'Cancellation Available'
                      : 'No Cancellation Available'}
                  </p>
                </div>
              </div>

              {/* Showtimes Section */}
              <div className="mt-6">
                <h3 className="text-xl font-bold">Showtimes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    <p className="text-md text-black">
                      {new Date(movie.showDate).toDateString()}
                    </p>
                    <p className="text-md text-black">{movie.showTime}</p>
                  </button>
                </div>
              </div>
              {/* Book Tickets Button */}
                <button
                onClick={() => navigate(`/screens/${movie.screenId._id}`)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Book Tickets
              </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSchedule;

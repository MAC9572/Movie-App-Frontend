import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import {useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Showtime = () => {
  const params =useParams()
  const {scheduleId} =params
  console.log('params===',params)
 
  const [movieData, setMovieData] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

    const fetchTheatres = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: '/schedules/get-schedule',
        });
        setMovieData(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    useEffect(() => {
    fetchTheatres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({
      ...editedMovie,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/schedules/update-schedule/${scheduleId}`,
        data: editedMovie,
      });
      setIsEditing(false);
      toast.success('Showtime Updated Successfully')
        console.log('Schedule updated successfully:', response.data);
       
        // Optimistic update to reflect changes immediately in the UI
    setMovieData(prevData =>
      prevData.map((movie) =>
        movie._id === editedMovie._id ? { ...movie, ...editedMovie } : movie
      )
    );
    } catch (error) {
      toast.error('Something went wrong.')
      console.error('Error saving movie changes:', error);
    }
  };

  const handleCancel = () => {
    setEditedMovie(null);
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/schedules/add-schedule",
        data,
      });
      console.log(response)
      toast.success(response.data.message);
      // Optimistically add the new schedule to the movieData array
    setMovieData(prevData => [
      ...prevData,  // Spread the existing movieData
      response.data.data,  // Add the new schedule from the API response
    ]);
    } catch (error) {
      console.error(error);
      toast.error("Error creating movie schedule");
    }
  };

  useEffect(() => {
    if (isEditing && editedMovie) {
      Object.keys(editedMovie).forEach((key) => {
        setValue(key, editedMovie[key]);
      });
    }
  }, [isEditing, editedMovie, setValue]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-700">
      <h1 className="text-3xl font-semibold text-center mb-10">Movie Schedules</h1>

      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Movie Schedule</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Movie ID */}
          <div>
            <label className="block text-sm font-medium">Movie ID</label>
            <input
              type="text"
              {...register("movieId", { required: "Movie ID is required" })}
              placeholder='Enter Movie ID'
              className={`w-full px-4 py-2 border rounded-md ${errors.movieId ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.movieId && <p className="text-red-500 text-sm">{errors.movieId.message}</p>}
          </div>

          {/* Screen ID */}
          <div>
            <label className="block text-sm font-medium">Screen ID</label>
            <input
              type="text"
              {...register("screenId", { required: "Screen ID is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.screenId ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.screenId && <p className="text-red-500 text-sm">{errors.screenId.message}</p>}
          </div>

          {/* Show Time */}
          <div>
            <label className="block text-sm font-medium">Show Time</label>
            <input
              type="time"
              {...register("showTime", { required: "Show Time is required" })}
              placeholder='Enter ShowTime'
              className={`w-full px-4 py-2 border rounded-md ${errors.showTime ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.showTime && <p className="text-red-500 text-sm">{errors.showTime.message}</p>}
          </div>

          {/* Show Date */}
          <div>
            <label className="block text-sm font-medium">Show Date</label>
            <input
              type="date"
              {...register("showDate", { required: "Show Date is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.showDate ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.showDate && <p className="text-red-500 text-sm">{errors.showDate.message}</p>}
          </div>

          {/* Seats Available (Checkbox) */}
          <div>
            <label className="block text-sm font-medium">Seats Available</label>
            <input
              type="checkbox"
              {...register("seatsAvailable")}
              className="ml-2"
            />
            <span className="ml-2">Yes</span>
          </div>

          {/* Cancellation Available */}
          <div className="flex items-center">
            <label className="block text-sm font-medium">Cancellation Available</label>
            <input
              type="checkbox"
              {...register("cancellationAvailable")}
              className="ml-2"
            />
            <span className="ml-2">Yes</span>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {movieData.map((movie) => (
          <div key={movie._id} className="mt-4">
            <div className="bg-gray-300 dark:bg-gray-800 shadow-md rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{movie.movieId.title}</h2>
                  <h3 className="text-xl font-bold">Language</h3>
                  <p className="text-lg">{movie.movieId.languages}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditedMovie(movie);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    {isEditing && movie._id === editedMovie?._id ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </div>

              {/* Showtimes Section */}
              <div className="mt-6">
                <h3 className="text-xl font-bold">Showtimes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                 
                    <p className="text-md">
                    <h3 className="text-xl font-bold">Date</h3>
                      {isEditing && movie._id === editedMovie?._id ? (
                        <input
                          type="date"
                          name="showDate"
                          value={editedMovie.showDate}
                          onChange={handleChange}
                          className="text-md text-white border-b-2 border-gray-300 focus:outline-none"
                        />
                      ) : (
                        new Date(movie.showDate).toDateString()
                      )}
                    </p>
                    <p className="text-md">
                    <h3 className="text-xl font-bold">Time</h3>
                      {isEditing && movie._id === editedMovie?._id ? (
                        <input
                          type="time"
                          name="showTime"
                          value={editedMovie.showTime}
                          onChange={handleChange}
                          className="text-md text-white border-b-2 border-gray-300 focus:outline-none"
                        />
                      ) : (
                        movie.showTime
                      )}
                    </p>
                </div>
              </div>

              {isEditing && movie._id === editedMovie?._id && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtime;

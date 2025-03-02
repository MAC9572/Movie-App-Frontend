import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import CastList from '../../components/user/CastCard'
import CrewList from '../../components/user/crewCard'
import { toast } from 'react-toastify'

const EditMovies = () => {
    const params = useParams();
    const { movieId } = params;
  
    const [movieDetails, setMovieDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false); // To track whether the user is editing
    const [editedMovie, setEditedMovie] = useState(null); // To store the updated movie details
  
    // Fetch movie details when component mounts
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: `/movies/show-movieDetails/${movieId}`,
        });
        setMovieDetails(response?.data?.data);
        setEditedMovie(response?.data?.data); // Pre-fill the editedMovie state with initial data
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchMovieDetails();
    }, [movieId]);
  
    // Handle change in form fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedMovie({
        ...editedMovie,
        [name]: value,
      });
    };
  
    // Handle saving the edited movie details
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance({
          method: 'PUT',
          url: `/movies/update/${movieId}`,
          data: editedMovie,
        });
        toast.success('Movie updated successfully!');
        console.log('Movie updated successfully:', response.data);
        setIsEditing(false); // Exit editing mode after save
      } catch (error) {
        toast.error('Something went wrong while updating.');
        console.error('Error saving movie changes:', error);
      }
    };
  
  
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-full mx-auto p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
          <section>
            <h2 className="text-3xl text-center font-bold text-black dark:text-slate-400 mb-8">Movie Details</h2>
          </section>
  
          {/* Movie details form for editing */}
          <form onSubmit={handleSave}>
            <section className="mt-6">
              <h2 className="text-2xl text-center font-semibold text-black dark:text-slate-100 mb-2">
                {movieDetails?.title}
              </h2>
              <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center mb-4 mt-6">
                <img
                  src={movieDetails?.movie_image}
                  alt={movieDetails?.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-md"
                />
                <div className="flex flex-col items-center sm:items-start">
                  <div className="mb-4">
                    <label className="text-lg font-semibold text-black dark:text-white">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editedMovie?.title || ''}
                      onChange={handleInputChange}
                      className="mt-2 p-2 border border-gray-300 rounded-md ml-2"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-lg font-semibold text-black dark:text-white">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={editedMovie?.duration || ''}
                      onChange={handleInputChange}
                      className="mt-2 p-2 border border-gray-300 rounded-md ml-2"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-lg font-semibold text-black dark:text-white">Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={editedMovie?.languages || ''}
                      onChange={handleInputChange}
                      className="mt-2 p-2 border border-gray-300 rounded-md ml-2"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-lg font-semibold text-black dark:text-white">Genre</label>
                    <input
                      type="text"
                      name="genre"
                      value={editedMovie?.genre || ''}
                      onChange={handleInputChange}
                      className="mt-2 p-2 border border-gray-300 rounded-md ml-2"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
              </div>
  
              <div className="mt-9">
                <p className="text-xl font-bold text-black dark:text-slate-400">About the Movie</p>
                <textarea
                  name="description"
                  value={editedMovie?.description || ''}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md ml-2"
                  rows="5"
                  placeholder="Write a description..."
                  disabled={!isEditing}
                ></textarea>
              </div>
  
              {/* Cast and Crew list */}
              <section className="mt-9">
                <h3 className="text-xl font-semibold text-black dark:text-slate-100 mb-2"></h3>
                <CastList cast={movieDetails?.cast} />
                <h3 className="text-xl font-semibold text-black dark:text-slate-100 mb-2"></h3>
                <CrewList crew={movieDetails?.crew} />
              </section>
            </section>
  
          <div className="flex justify-center p-2 mt-10">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

  
              {/* Show submit button when in edit mode */}
              {isEditing && (
                <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-4">
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditMovies;
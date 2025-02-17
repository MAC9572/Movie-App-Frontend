import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';

const AdminDashboard = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      movie_grade: '',
      languages: '',
      duration: '',
      genre: '',
      cast: [{ original_name: '', character: '' }],
      crew: [{ name: '', crew_position: '' }],
      movie_image: null,
    },
  });

  const { fields: castFields, append: appendCast, remove: removeCast } = useFieldArray({
    control,
    name: 'cast',
  });

  const { fields: crewFields, append: appendCrew, remove: removeCrew } = useFieldArray({
    control,
    name: 'crew',
  });

  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  // Handle form submission
  const onSubmit = async (data) => {
    // Create a FormData object to send files and other data
    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'movie_image') {
        formDataToSend.append(key, JSON.stringify(data[key]));
      } else {
        formDataToSend.append(key, data[key]);
      }
    });

    try {
      // Use axiosInstance for the POST request
      const response = await axiosInstance({
        method: 'POST',
        url: '/movies/add-movies', // The API endpoint for adding a movie
        data: formDataToSend, // Send the form data
      });

      // Handle success response
      if (response.status === 200) {
        setSuccessMessage('Movie added successfully');
        // Optionally reset the form fields
        setValue('title', '');
        setValue('description', '');
        setValue('movie_grade', '');
        setValue('languages', '');
        setValue('duration', '');
        setValue('genre', '');
        setValue('cast', [{ original_name: '', character: '' }]);
        setValue('crew', [{ name: '', crew_position: '' }]);
        setValue('movie_image', null);
      }
    } catch (error) {
      // Handle error response
      setError('Error adding movie');
    }
  };

  return (
    <div className="p-6 flex-1 bg-gray-100 dark:bg-gray-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Dashboard Summary Cards */}
        <div className="bg-gray-800 dark:bg-white text-white dark:text-black p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Total Movies</h2>
            <p className="text-xl text-gray-500">20</p>
          </div>
          <span className="text-4xl text-blue-500">🎬</span>
        </div>
        {/* Other dashboard cards here... */}
      </div>

      {/* Movie Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Movie</h2>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title and Description Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                  rows="4"
                />
              )}
            />
            {errors.description && <p className="text-red-500">Description is required</p>}
          </div>

          {/* Movie Grade and Other Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Grade</label>
            <Controller
              name="movie_grade"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.movie_grade && <p className="text-red-500">Movie Grade is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Languages</label>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.languages && <p className="text-red-500">Languages are required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Duration</label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.duration && <p className="text-red-500">Duration is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Genre</label>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.genre && <p className="text-red-500">Genre is required</p>}
          </div>

          {/* Cast Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Cast</label>
            {castFields.map((item, index) => (
              <div key={item.id} className="mb-4 flex items-center">
                <Controller
                  name={`cast[${index}].original_name`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Original Name"
                      className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                    />
                  )}
                />
                <Controller
                  name={`cast[${index}].character`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Character"
                      className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeCast(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendCast({ original_name: '', character: '' })}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Cast Member
            </button>
          </div>

          {/* Crew Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Crew</label>
            {crewFields.map((item, index) => (
              <div key={item.id} className="mb-4 flex items-center">
                <Controller
                  name={`crew[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Crew Name"
                      className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                    />
                  )}
                />
                <Controller
                  name={`crew[${index}].crew_position`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Crew Position"
                      className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeCrew(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendCrew({ name: '', crew_position: '' })}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Crew Member
            </button>
          </div>

          {/* Movie Image */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Image</label>
            <Controller
              name="movie_image"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;

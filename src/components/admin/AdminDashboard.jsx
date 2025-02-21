import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
  
  const { fields: castFields, append: appendCast, remove: removeCast } = useFieldArray({
    control,
    name: 'cast',
  });

  const { fields: crewFields, append: appendCrew, remove: removeCrew } = useFieldArray({
    control,
    name: 'crew',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
  
    try {
      console.log(data, "=====data");
      const formData = new FormData();
  
      // Append form fields to FormData
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("movie_grade", data.movie_grade);
      formData.append("languages", data.languages);
      formData.append("duration", data.duration);
      formData.append("genre", data.genre);
  
      // Handling Cast and Crew
      formData.append("cast", JSON.stringify(data.cast));
      formData.append("crew", JSON.stringify(data.crew));
      formData.append("movie_image", data.movie_image[0]);
      
      // Sending data to backend using axiosInstance
      const response = await axiosInstance({
        method: 'POST',
        url: '/movies/add-movies', // Change to appropriate API
        data: formData,
      });
      console.log(response);
  
      toast.success('Movie added successfully');
      // Reset form
      setValue('title', '');
      setValue('description', '');
      setValue('movie_grade', '');
      setValue('languages', '');
      setValue('duration', '');
      setValue('genre', '');
      setValue('movie_image', null);
  
    } catch (err) {
      console.log(err);
      toast.error('Error adding movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex-1 bg-gray-100 dark:bg-gray-600">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="bg-gray-800 dark:bg-white text-white dark:text-black p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Total Movies</h2>
            <p className="text-xl text-gray-500">20</p>
          </div>
          <span className="text-4xl text-blue-500">🎬</span>
        </div>
      </div>

      {/* Movie Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Movie</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title and Description Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
              rows="4"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          {/* Movie Grade and Other Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Grade</label>
            <input
              {...register("movie_grade", { required: "Movie Grade is required" })}
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
            {errors.movie_grade && <p className="text-red-500">{errors.movie_grade.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Languages</label>
            <input
              {...register("languages", { required: "Languages are required" })}
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
            {errors.languages && <p className="text-red-500">{errors.languages.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Duration</label>
            <input
              {...register("duration", { required: "Duration is required" })}
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Genre</label>
            <input
              {...register("genre", { required: "Genre is required" })}
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
          </div>

          {/* Cast */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Cast</label>
            {castFields.map((item, index) => (
              <div key={item.id} className="mb-4 flex items-center">
                <input
                  {...register(`cast[${index}].original_name`)}
                  type="text"
                  placeholder="Original Name"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register(`cast[${index}].character`)}
                  type="text"
                  placeholder="Character"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
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
              Add Cast
            </button>
          </div>

          {/* Crew */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Crew</label>
            {crewFields.map((item, index) => (
              <div key={item.id} className="mb-4 flex items-center">
                <input
                  {...register(`crew[${index}].name`)}
                  type="text"
                  placeholder="Crew Name"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register(`crew[${index}].crew_position`)}
                  type="text"
                  placeholder="Crew Position"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
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
              Add Crew
            </button>
          </div>

          {/* Movie Image */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Image</label>
            <input
              {...register("movie_image", { required: "Movie image is required" })}
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <span className="loading loading-dots loading-lg"></span> : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;

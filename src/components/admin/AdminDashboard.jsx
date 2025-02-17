import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    movie_grade: '',
    languages: '',
    duration: '',
    genre: '',
    cast: [{ original_name: '', character: '' }], // Start with one empty cast member
    crew: [{ name: '', crew_position: '' }], // Start with one empty crew member
    movie_image: null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change for dynamic cast and crew fields
  const handleDynamicChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[type]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData({
      ...formData,
      [type]: updatedArray,
    });
  };

  // Add new dynamic field for cast or crew
  const addDynamicField = (type) => {
    const newItem = type === 'cast' ? { original_name: '', character: '' } : { name: '', crew_position: '' };
    setFormData({
      ...formData,
      [type]: [...formData[type], newItem],
    });
  };

  // Remove a dynamic field for cast or crew
  const removeDynamicField = (index, type) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [type]: updatedArray,
    });
  };

  // Handle file input change for the movie image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      movie_image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.title ||
      !formData.description ||
      !formData.movie_grade ||
      !formData.languages ||
      !formData.duration ||
      !formData.genre ||
      !formData.cast ||
      !formData.crew ||
      !formData.movie_image
    ) {
      setError('All fields are required');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('movie_grade', formData.movie_grade);
    formDataToSend.append('languages', formData.languages);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('cast', JSON.stringify(formData.cast));
    formDataToSend.append('crew', JSON.stringify(formData.crew));
    formDataToSend.append('movie_image', formData.movie_image);

    try {
      const response = await axios.post('/movies/add-movies', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Movie added successfully');
      setFormData({
        title: '',
        description: '',
        movie_grade: '',
        languages: '',
        duration: '',
        genre: '',
        cast: [{ original_name: '', character: '' }],
        crew: [{ name: '', crew_position: '' }],
        movie_image: null,
      });
      setError(null);
    } catch (error) {
      setError('Error adding movie');
    }
  };

  return (
    <div className="p-6 flex-1 bg-gray-100 dark:bg-gray-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Dashboard Summary Cards */}
        <div className=" bg-gray-800 dark:bg-white text-white dark:text-black p-6 rounded-lg shadow-lg flex items-center justify-between">
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

        <form onSubmit={handleSubmit}>
          {/* Title and Description Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
              rows="4"
            />
          </div>

          {/* Movie Grade and Other Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Grade</label>
            <input
              type="text"
              name="movie_grade"
              value={formData.movie_grade}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Languages</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-white p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Cast Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Cast</label>
            {formData.cast.map((castMember, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  name="original_name"
                  value={castMember.original_name}
                  onChange={(e) => handleDynamicChange(e, index, 'cast')}
                  placeholder="Original Name"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="character"
                  value={castMember.character}
                  onChange={(e) => handleDynamicChange(e, index, 'cast')}
                  placeholder="Character"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, 'cast')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField('cast')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Cast Member
            </button>
          </div>

          {/* Crew Fields */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Crew</label>
            {formData.crew.map((crewMember, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  name="name"
                  value={crewMember.name}
                  onChange={(e) => handleDynamicChange(e, index, 'crew')}
                  placeholder="Crew Name"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="crew_position"
                  value={crewMember.crew_position}
                  onChange={(e) => handleDynamicChange(e, index, 'crew')}
                  placeholder="Crew Position"
                  className="w-full bg-white p-2 border border-gray-300 rounded-lg ml-2"
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, 'crew')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField('crew')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Crew Member
            </button>
          </div>

          {/* Movie Image */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Movie Image</label>
            <input
              type="file"
              name="movie_image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
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

import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';


const Profile=()=> {
  const [profileData, isLoading, error] = useFetch("/user/profile");
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [editData, setEditData] = useState(profileData);

  // Ensure editData is updated whenever profileData is fetched
  useEffect(() => {
    if (profileData) {
      setEditData(profileData);
    }
  }, [profileData]);

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/profile-update",
        data: editData, // Send the updated profile data
      });
      toast.success("Profile Updated Successfully")

      if (response.status === 200) {
        setIsProfileEdit(false); // Close the edit mode after successful update
        // Optionally, you can refetch the profile data
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile")
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center py-10 bg-gray-100">
      <section className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {/* Profile Image */}
        <div className="mb-6">
          <img
            src={profileData?.profileImg}
            className="w-40 h-40 rounded-full mx-auto object-cover border-2 border-gray-300"
            alt="Profile Image"
          />
        </div>

        {/* Profile Details or Edit Form */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <h1 className="text-xl font-semibold text-gray-700 flex items-center">
            Name:{" "}
            {isProfileEdit ? (
              <input
                type="text"
                name="name"
                value={editData?.name || ""}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white ml-2"
                required
              />
            ) : (
              profileData?.name
            )}
          </h1>

          <h1 className="text-xl font-semibold text-gray-700 flex items-center">
            Email:{" "}
            {isProfileEdit ? (
              <input
                type="email"
                name="emailId"
                value={editData?.emailId || ""}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white ml-2"
                required
              />
            ) : (
              profileData?.emailId
            )}
          </h1>

          <h1 className="text-xl font-semibold text-gray-700 flex items-center">
            Mobile:{" "}
            {isProfileEdit ? (
              <input
                type="tel"
                name="contactNumber"
                value={editData?.contactNumber || ""}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white ml-2"
                required
              />
            ) : (
              profileData?.contactNumber
            )}
          </h1>

          <h1 className="text-xl font-semibold text-gray-700 flex items-center">
            Location:{" "}
            {isProfileEdit ? (
              <input
                type="text"
                name="location"
                value={editData?.location || ""}
                onChange={handleInputChange}
                className="border p-2 bg-white rounded ml-2"
                required
              />
            ) : (
              profileData?.location
            )}
          </h1>

          {/* Edit Button and Submit Button */}
          <div className="flex justify-center p-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => setIsProfileEdit(!isProfileEdit)}
            >
              {isProfileEdit ? "Cancel" : "Edit Profile"}
            </button>

            {/* Show submit button when in edit mode */}
            {isProfileEdit && (
              <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-4">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
export default Profile



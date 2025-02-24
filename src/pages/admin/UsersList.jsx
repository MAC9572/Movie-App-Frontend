import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { MovieSkeleton } from "../../components/shared/Skeleton";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/admin/get-all-users",
                });

                setUsers(response.data.data); // Ensure this matches your API response format
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="w-full mx-auto mt-10 p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg mb-10 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Registered Users</h2>
      
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
      
          {!loading && !error && users.length === 0 && (
            <p className="text-gray-600 text-center">No users found.</p>
          )}
      
          {!loading && !error && users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] sm:min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-sm sm:text-base">
                    <th className="border p-2 sm:p-3">ID</th>
                    <th className="border p-2 sm:p-3">Image</th>
                    <th className="border p-2 sm:p-3">Name</th>
                    <th className="border p-2 sm:p-3">Email</th>
                    <th className="border p-2 sm:p-3">Contact</th>
                    <th className="border p-2 sm:p-3">Location</th>
                    <th className="border p-2 sm:p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border text-sm sm:text-base">
                      <td className="border p-2 sm:p-3">{user._id}</td>
                      <td className="border p-2 sm:p-3">
                        <img 
                          src={user.profileImg} 
                          alt={`${user.name}'s profile`} 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="border p-2 sm:p-3">{user.name}</td>
                      <td className="border p-2 sm:p-3">{user.emailId}</td>
                      <td className="border p-2 sm:p-3">{user.contactNumber}</td>
                      <td className="border p-2 sm:p-3">{user.location}</td>
                      <td className="border p-2 sm:p-3">
                        {user.isActive ? (
                          <span className="px-2 py-1 text-green-700 bg-green-200 rounded-full">Active</span>
                        ) : (
                          <span className="px-2 py-1 text-red-700 bg-red-200 rounded-full">Inactive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );      
};

export default UsersList;

  
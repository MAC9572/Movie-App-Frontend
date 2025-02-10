import React from 'react'
import { useFetch } from '../../hooks/useFetch'


const AdminProfile=()=> {

  const [profileData, isLoading, error] = useFetch("/admin/profile");


  
  return (
    <div className="flex justify-center py-10 bg-gray-100">
    <section className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      {/* <!-- Profile Image --> */}
      <div className="mb-6">
        <img src={profileData?.profileImg} className="w-40 h-40 rounded-full mx-auto object-cover border-2 border-gray-300" alt="Profile Image" />
      </div>
  
      {/* <!-- Profile Details --> */}
      <div className="text-left space-y-4">
        <h1 className="text-xl font-semibold text-gray-700">Name: {profileData?.name}</h1>
        <h1 className="text-xl font-semibold text-gray-700">Email: {profileData?.emailId}</h1>
        <h1 className="text-xl font-semibold text-gray-700">Mobile: {profileData?.contactNumber}</h1>
      </div>
    </section>
  </div>
  )
}

export default AdminProfile
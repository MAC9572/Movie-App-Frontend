import React from 'react'
const UsersCard=({user})=> {
  return (
    <>
    <div className="mb-6">
              <img
                src={user.profileImg}
                className="w-40 h-40 rounded-full mx-auto object-cover border-2 border-gray-300"
                alt="Profile"
              />
            </div>
            <div className="text-left space-y-4">
              <h1 className="text-xl font-semibold text-gray-700">Name: {user.name}</h1>
              <h1 className="text-xl font-semibold text-gray-700">Email: {user.emailId}</h1>
              <h1 className="text-xl font-semibold text-gray-700">Mobile: {user.contactNumber}</h1>
              <h1 className="text-xl font-semibold text-gray-700">Location: {user.location}</h1>
            </div>
            </>
  )
}

export default UsersCard
import React from 'react'

const AdminDashboard=()=> {
  return (
    <div className="p-6 flex-1 bg-gray-100">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Total Movies</h2>
          <p className="text-xl text-gray-500">20</p>
        </div>
        <span className="text-4xl text-blue-500">🎬</span>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Total Bookings</h2>
          <p className="text-xl text-gray-500">1500</p>
        </div>
        <span className="text-4xl text-blue-500">🎟️</span>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Pending Orders</h2>
          <p className="text-xl text-gray-500">25</p>
        </div>
        <span className="text-4xl text-yellow-500">⏳</span>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Revenue</h2>
          <p className="text-xl text-gray-500">$120,000</p>
        </div>
        <span className="text-4xl text-green-500">💰</span>
      </div>
    </div>
    {/* Movie Table (Example) */}
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Movies List</h2>
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Movie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Genre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Release Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-3 text-sm">Movie Title 1</td>
                  <td className="px-6 py-3 text-sm">Action</td>
                  <td className="px-6 py-3 text-sm">2025-03-01</td>
                  <td className="px-6 py-3 text-sm">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-3 text-sm">Movie Title 2</td>
                  <td className="px-6 py-3 text-sm">Drama</td>
                  <td className="px-6 py-3 text-sm">2025-04-15</td>
                  <td className="px-6 py-3 text-sm">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default AdminDashboard
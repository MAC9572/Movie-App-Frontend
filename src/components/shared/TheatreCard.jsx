import React from 'react'
import { useNavigate } from 'react-router-dom'
import MovieSchedule from '../../pages/shared/MovieSchedule'

export const TheatreCard=({theatre})=> {
    const navigate =useNavigate()
  return (
    <>
    <div className="bg-gray-700 text-white dark:text-black dark:bg-slate-300 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    <h2 className="text-2xl font-semibold  text-white dark:text-black mb-2">{theatre.name}</h2>
    <p className="text-white dark:text-black mb-2">{theatre.location}</p>
    <p className="text-white dark:text-black">{theatre.city}</p>
    <button onClick={()=>navigate(`/showtime/${theatre._id}`)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
      Book Tickets
    </button>
    </div>
    </>
    )
}

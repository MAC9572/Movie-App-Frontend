import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import TheatreCard from '../../components/shared/TheatreCard';

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  

const fetchtheatres =async()=>{
  try{
  const response = await axiosInstance({
    method :"GET",
    url :"/screen/get-screen"
  })
  setTheatres(response?.data?.data);
  setLoading(false);
}catch(error){
  console.error('Error fetching theatres:', error);
  setLoading(false);
}
}
  useEffect(() => {
   fetchtheatres()
  }, );

  if (loading) return <div className="text-center text-2xl">Loading theatres...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Theatres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theatres.map((theatre) => (
          <TheatreCard key={theatre._id} theatre ={theatre} />
        ))}
      </div>
    </div>
  );
};

export default TheatreList;
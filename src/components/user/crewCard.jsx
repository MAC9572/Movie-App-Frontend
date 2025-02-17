import React from "react";

const CrewList = ({ crew }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Crew</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {crew?.map((crew) => (
          <div key={crew._id} className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
            <p className="text-lg font-semibold">{crew.name}</p>
            <p className="text-sm text-gray-300">as {crew.crew_position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewList;
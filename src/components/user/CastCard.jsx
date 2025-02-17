import React from "react";

const CastList = ({ cast }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast?.map((actor) => (
          <div key={actor._id} className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
            <p className="text-lg font-semibold">{actor.original_name}</p>
            <p className="text-sm text-gray-300">as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
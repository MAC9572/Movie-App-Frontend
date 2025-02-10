import { useState } from 'react';

const Screen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to handle seat selection
  const toggleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber)); // Deselect
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]); // Select
    }
  };

  // Define rows and seats per row
  const rows = ['A', 'B', 'C', 'D', 'E']; // Theater rows
  const seatsPerRow = 10; // Seats per row

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Screen 1</h2>
      
      <div className="flex flex-col items-center">
        {/* Map over rows */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-4">
            {/* Map over seats in a row */}
            {[...Array(seatsPerRow)].map((_, seatIndex) => {
              const seatNumber = `${row}${seatIndex + 1}`;
              return (
                <button
                  key={seatIndex}
                  onClick={() => toggleSeatSelection(seatNumber)}
                  className={`w-12 h-12 m-2 rounded-md font-medium text-sm ${
                    selectedSeats.includes(seatNumber)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800'
                  } hover:bg-blue-600 focus:outline-none`}
                >
                  {seatNumber}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">Selected Seats</h3>
        <p className="text-gray-600">
          {selectedSeats.length === 0
            ? 'No seats selected'
            : selectedSeats.join(', ')}
        </p>
        <button
          onClick={() => alert(`Tickets Booked: ${selectedSeats.join(', ')}`)}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default Screen;
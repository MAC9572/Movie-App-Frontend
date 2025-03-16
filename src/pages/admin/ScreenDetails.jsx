import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Loader2 } from 'lucide-react';


const ScreenDetails = () => {
  const [screenData, setScreenData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Fetch screen data from the API
  const fetchScreenData = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/screen/get-screenById'
      });
      console.log(response);
      if (response?.data?.data && response.data.data.length > 0) {
        setScreenData(response.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching screen:', error);
    }
  };

  useEffect(() => {
    fetchScreenData();
  }, []);

  // Toggle seat selection
  const toggleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Calculate total price
  const totalPrice = selectedSeats.length * (screenData?.price || 0);

  if (!screenData) {
    return <div className="flex flex-col items-center mt-6">
    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
    <p className="mt-2 text-lg">Loading...</p>
  </div>
  }
   

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-2">{screenData.name}</h2>
      <p className="text-center text-gray-600 mb-6">{screenData.location}, {screenData.city}</p>
      <h2 className="text-center text-xl font-bold text-gray-600 mb-2">{screenData.screenType}</h2>
      <p className="text-center font-semibold text-xl mb-6">Price : {screenData.price}</p>
      <div className="flex flex-col items-center">
        {screenData.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center mb-4">
            {row.map((seat, seatIndex) => (
              <button
                key={seatIndex}
                onClick={() => toggleSeatSelection(seat)}
                className={`w-12 h-12 m-2 rounded-md font-medium text-sm ${
                  selectedSeats.includes(seat)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-800'
                } hover:bg-blue-600 focus:outline-none`}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">Selected Seats</h3>
        <p className="text-gray-600">
          {selectedSeats.length === 0 ? 'No seats selected' : selectedSeats.join(', ')}
        </p>
        <p className="text-xl font-semibold mt-2">Total Price: {totalPrice}</p>
      </div>
    

      {/* <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="mb-4">
              <p>Seats: {item.seats.join(', ')}</p>
              <p>Total: {item.totalPrice}</p>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default ScreenDetails;
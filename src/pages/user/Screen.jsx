import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Screen = () => {
  const [screenData, setScreenData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate =useNavigate()

  // Fetch screen data from the API
  const fetchScreenData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: '/screen/get-screen'
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

  // Add to cart functionality with POST request
  const addToCart = async () => {
    if (selectedSeats.length > 0) {
      try {
        const cartData = {
          userId: 'userId', // You should pass the user's ID here
          seats: selectedSeats,
          totalPrice: totalPrice,
        };

        const response = await axiosInstance({
          method: "POST",
          url: '/cart/add-to-cart', // Backend route for adding to the cart
          data: cartData,
        });
        console.log(response)
        if (response?.data?.items) {
          // setCart(response?.data?.items); // Update the cart state with the new cart data
          // alert(`Added to cart. Total: ${totalPrice}`);
          toast.success(`Seat ${selectedSeats} has been added to cart.`)
          
        }
        
        // Reset selected seats after adding to the cart
        setSelectedSeats([]);
      } catch (error) {
        console.error('Error adding to cart:', error);
        // alert('There was an error adding to the cart.');
        toast.error('There was an error adding to the cart.')

      }
    } else {
      // alert('No seats selected!');
      toast.error('No seats selected!')
    }
  };

  if (!screenData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-2">{screenData.name}</h2>
      <p className="text-center text-gray-600 mb-2">{screenData.screenType}</p>
      <p className="text-center text-gray-600 mb-6">{screenData.location}, {screenData.city}</p>
      <p className="text-right font-semibold text-xl mb-6">Price : {screenData.price}</p>
      <div className="flex flex-col items-center">
        {screenData.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-4">
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

        <button
          onClick={addToCart}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-green-600"
        >
          Add to Cart
        </button>
        <button
          onClick={()=>navigate("/user/cart")}
          className="mt-4 ml-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Book Ticket
        </button>
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

export default Screen;
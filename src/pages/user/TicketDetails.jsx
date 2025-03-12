import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';  // Assuming axiosInstance is already set up
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const TicketDetails = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate()

  // Fetching Cart Data
  const fetchCartData = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/cart/get-cart'
      });
      const cartItems = response.data.cartItems.items;
      console.log('Fetched Cart Data:', cartItems);
      setCart(cartItems);
    } catch (err) {
      setError('Error fetching cart data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch movie data and cart data
  useEffect(() => {
    fetchCartData();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center py-4">
      Loading Data...
      </div>;
  }

  // Error handling
  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">

      {/* Ticket History Section */}
      <h2 className="text-2xl font-semibold text-center mb-6 mt-12">Ticket Booking History</h2>
  
      {/* Ticket History Layout */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">No Bookings Found.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">Booking #{index + 1}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-black">Total Price: {item.totalPrice}</p>
                </div>
              </div>
  
              <div className="mb-4">
                <p className="text-md text-gray-700">Seats: {item.seats.join(', ')}</p>
              </div>
  
              {/* Optional: Button for details or actions */}
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                onClick={()=>navigate('/user/payments')}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  export default TicketDetails
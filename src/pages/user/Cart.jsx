import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';  // Assuming axiosInstance is already set up
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";  // Import Stripe's JavaScript library

const Cart = () => {
  // State to hold the cart data
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);  // Stripe instance

  // Fetch cart data when the component mounts
  const fetchCartData = async () => {
    try {
      const response = await axiosInstance({
        method :"GET",
        url :"/cart/get-cart"
      }) // Adjust your API endpoint
      const cartItems = response.data.cartItems.items;
      console.log(cartItems);
      setCart(cartItems);  // Assuming response data contains cartItems
    } catch (err) {
      setError('Error fetching cart data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)); // Set your Stripe public key
  }, []); // Empty dependency array to run only on mount

  // Delete item from cart
  const deleteFromCart = async (itemId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/cart/remove-from-cart/${itemId}`, // Adjust your API endpoint to match
      });
      console.log("Item deleted:", response.data.data);
      setCart(response.data.data); 
      toast.success('Removed Items from cart.');
    } catch (err) {
      setError('Error deleting item from cart');
      toast.error('Error deleting item from cart');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Stripe payment
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to load");
        return;
      }

      const response = await axiosInstance({
        method: 'POST',
        url: '/payment/create-checkout-session', // This should call your backend to create a checkout session
        data: {
          items: cart, // Send the cart data to backend
        },
      });

      const { sessionId } = response.data; // Assuming your backend sends a sessionId

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId,
      });
      
      if (result.error) {
        toast.error(result.error.message);
      } 
    } catch (err) {
      toast.error('Error processing payment');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Cart</h2>

      {/* Check if cart is empty */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 border-b">
              <div>
                <p className="font-medium text-lg">Seats: {item.seats.join(', ')}</p>
                <p className="text-gray-600">Total: {item.totalPrice}</p>
              </div>
              <button onClick={() => deleteFromCart(item._id)} className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <button onClick={handlePayment} className="mt-4 ml-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Total Price Section */}
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold">Total Price: {cart.reduce((total, item) => total + item.totalPrice, 0)}</p>
      </div>
    </div>
  );
};

export default Cart;

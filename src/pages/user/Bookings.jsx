import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

const Bookings = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSessionData(null);
    
    if (!email) {
      toast.warning('Email Id is required');
      return;
    }

    try {
        const response = await axiosInstance({
            method: 'GET',
            url: `/payment/session-status?email=${email}`,
          });
          console.log(response)
      setStatus(response.data.status);
      setSessionData(response.data.session_data);
      toast.success("Fetching Transaction History")
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      toast.error("An error occurred while fetching")
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-700 shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Enter your Email ID'
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Check Transactions
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {sessionData && (
        <div className="mt-6 p-4 bg-gray-400 dark:bg-green-500 text-black rounded-lg">
          <p><strong>Transaction ID:</strong> {sessionData.id}</p>
          <p><strong>Customer Name:</strong> {sessionData.customer_details.name}</p>
          <p><strong>Customer Email:</strong> {sessionData.customer_details.email}</p>
          <p><strong>Amount Paid: </strong> Rs {sessionData.amount_total/100}</p>
          <p><strong>Payment Mode:</strong> {sessionData.payment_method_types}</p>
          <p><strong>Payment Status:</strong> {sessionData.payment_status}</p>
          <p><strong> Booking Status:</strong> {status}</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;

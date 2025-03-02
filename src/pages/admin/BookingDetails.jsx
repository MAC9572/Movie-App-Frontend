import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const BookingDetails = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

 
    // Fetch session data from the API
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance({
          method :"GET",
          url :"/payment/session-status-all"
        })
        console.log(response)
        setSessions(response.data.data); // Store session data in state
        console.log('Fetching Booking Details')
      } catch (err) {
        console.log("Failed to load session data.");
        toast.error('Error Fetching Booking Details.')
      } finally {
        setLoading(false); // Turn off the loading indicator
      }
    };

    useEffect(() => {

    fetchSessions();
  }, []);

 

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl text-center font-bold mb-6 mt-4">Bookings</h2>
    
    {loading ? (
      <div className="flex flex-col items-center mt-6">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="mt-2 text-lg">Loading...</p>
      </div>
    ): (
      // Once loading is complete, show either the table or a "no bookings" message
      <>
        {sessions.length === 0 ? (
          <p className="text-center mt-4 text-lg">No bookings available.</p>
        ) : (

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">Transaction ID</th>
            <th className="px-4 py-2 border-b">Customer Name</th>
            <th className="px-4 py-2 border-b">Customer Email</th>
            <th className="px-4 py-2 border-b">Total Amount</th>
            <th className="px-4 py-2 border-b">Payment Mode</th>
            <th className="px-4 py-2 border-b">Payment Status</th>
            <th className="px-4 py-2 border-b">Transaction Date</th>
          </tr>
        </thead>
        <tbody>

          {sessions.map((session) => (
            <tr key={session.session_id} className="hover">
              <td className="px-4 py-2 border-b">{session.session_id}</td>
              <td className="px-4 py-2 border-b">{session.customer_name}</td>
              <td className="px-4 py-2 border-b">{session.customer_email}</td>
              <td className="px-4 py-2 border-b">Rs {session.total_amount}</td>
              <td className="px-4 py-2 border-b">{session.payment_mode.join(", ")}</td>
              <td className="px-4 py-2 border-b">{session.payment_status}</td>
              <td className="px-4 py-2 border-b">{new Date(session.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
      </>
    )}
  </div>  
  );
};

export default BookingDetails;

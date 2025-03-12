import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Bookings = () => {
  const [status, setStatus] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSessionData(null);

    setLoading(true); // Start loading before making the API call

    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/payment/session-status`, // Remove the email parameter
      });
      console.log(response);

      setStatus(response.data.status);
      setSessionData(response.data.session_data);
      toast.success("Fetching Transaction History");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error("An error occurred while fetching");
    } finally {
      setLoading(false); // Stop loading after response/error
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-700 shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>

      {/* Button to trigger transaction fetch */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Check Transactions
        </button>
      </form>

      {/* Display error message if any */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Loading Animation */}
      {loading && (
        <div className="flex flex-col items-center mt-6">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <p className="text-lg text-gray-700 mt-4">Fetching Transaction History...</p>
        </div>
      )}

      {/* Display Transaction Data if Available */}
      {sessionData && !loading && (
        <div className="mt-6 p-4 bg-gray-400 dark:bg-green-500 text-black rounded-lg">
          <p><strong>Transaction ID:</strong> {sessionData.id}</p>
          <p><strong>Customer Name:</strong> {sessionData.customer_details.name}</p>
          <p><strong>Customer Email:</strong> {sessionData.customer_details.email}</p>
          <p><strong>Amount Paid:</strong> Rs {sessionData.amount_total / 100}</p>
          <p><strong>Payment Mode:</strong> {sessionData.payment_method_types}</p>
          <p><strong>Payment Status:</strong> {sessionData.payment_status}</p>
          <p><strong>Booking Status:</strong> {status}</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;

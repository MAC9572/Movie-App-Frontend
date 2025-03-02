import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react"; // Lucide icons for success & loader

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., 3 seconds)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        
        {loading ? (
          // Loading animation
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <p className="text-lg text-gray-700 mt-4">Processing Payment...</p>
          </div>
        ) : (
          // Success message
          <div>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-semibold text-green-500">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Your payment has been successfully processed.
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Movie Booked Successfully!
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/user"
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

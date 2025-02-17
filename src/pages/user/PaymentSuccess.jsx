import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-green-500 text-center">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 text-center mt-2">
          Your payment has been successfully processed. 
        </p>
        <p className="text-lg text-gray-700 text-center mt-2">
        Movie Booked Successfully!
        </p>


        <div className="mt-8 flex justify-center gap-6">
          <Link
            to="/user"
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

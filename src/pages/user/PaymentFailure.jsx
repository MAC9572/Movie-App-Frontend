import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const PaymentFailure = () => {
  const [countdown, setCountdown] = useState(5); // Countdown timer
  const navigate = useNavigate(); // For navigation

  // Decrement countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after the countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      navigate("/"); // Redirect to homepage after 5 seconds
    }

    return () => clearInterval(timer); // Clean up timer on component unmount
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-red-500 text-center">
          Payment Failed
        </h1>
        <p className="text-lg text-gray-700 text-center mt-2">
          Oops! Something went wrong with your payment. Please try again.
        </p>
        
        <div className="mt-6 p-4 bg-red-50 rounded-lg shadow-md">
          <p className="text-sm text-red-600">
            <strong>Error Message:</strong> Payment could not be processed at this time.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">Redirecting to the homepage in {countdown} seconds...</p>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Go to Homepage Now
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

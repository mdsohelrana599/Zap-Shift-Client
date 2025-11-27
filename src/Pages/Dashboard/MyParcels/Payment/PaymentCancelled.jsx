import React from "react";
import { XCircle } from "lucide-react"; // optional icon → npm i lucide-react
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-600 animate-pulse" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          Your payment was cancelled. Please try again.
        </p>

        <Link
          to="/dashboard/my-parcels"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;

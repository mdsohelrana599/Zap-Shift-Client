import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; // optional icon (install: npm i lucide-react)
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
      
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-20 h-20 text-green-600 animate-bounce" />
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </h2>

      <p className="text-gray-600 text-lg mb-2">
        <span className="font-semibold">Your TransactionId :</span>{" "}
        {paymentInfo.transactionId}
      </p>

      <p className="text-gray-600 text-lg mb-8">
        <span className="font-semibold">Your Parcel Tracking Id :</span>{" "}
        {paymentInfo.trackingId}
      </p>

      <Link
        to="/dashboard/my-parcels"
        className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Go to Home
      </Link>

    </div>
  </div>
);

};

export default PaymentSuccess;

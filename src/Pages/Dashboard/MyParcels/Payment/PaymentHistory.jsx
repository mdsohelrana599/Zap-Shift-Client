import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-4 md:p-8">
      <div className="px-4 md:px-10 bg-white rounded-2xl py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
          Payment History
        </h2>

        {/* ---------- Mobile Card View ---------- */}
        <div className="space-y-4 md:hidden ">
          {payments.map((payment, index) => (
            <div
              key={payment._id}
              className="border border-gray-200  rounded-xl p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-700">
                  Parcel #{index + 1}
                </p>
                <span className="text-green-600 font-medium">
                  ${payment.amount} (Paid)
                </span>
              </div>

              <p className="text-gray-800 font-semibold">
                {payment.parcelName}
              </p>

              <div className="mt-2 text-sm text-gray-600">
                <p className="font-semibold">Recipient Info:</p>
                
                <p className="font-semibold">{payment.paymentStatus}</p>
                    <p className="text-gray-600">{payment.paidAt}</p>
              </div>

              <p className="mt-2 text-sm text-gray-700 font-semibold">
                Tracking: {payment.trackingId}
              </p>

              <button className="mt-4 w-full py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
                View
              </button>
            </div>
          ))}
        </div>

        {/* ---------- Desktop Table View ---------- */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                  Parcel No
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                  Parcel Name
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                  Recipient Info
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                  Tracking Number
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                 Amount
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-5 px-6 text-gray-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-5 px-6 text-gray-700 font-medium">
                    {payment.parcelName}
                  </td>

                  <td className="py-5 px-6 text-gray-700 text-sm leading-relaxed">
                    <p className="font-semibold">{payment.paymentStatus}</p>
                    <p className="text-gray-600">{payment.paidAt}</p>
                    
                    
                  </td>

                  <td className="py-5 px-6 text-gray-700 font-semibold">
                    {payment.trackingId}
                  </td>

                  <td className="py-5 px-6 text-gray-700 font-semibold">
                    ${payment.amount}
                   
                  </td>

                  <td className="py-5 px-6">
                    <button className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

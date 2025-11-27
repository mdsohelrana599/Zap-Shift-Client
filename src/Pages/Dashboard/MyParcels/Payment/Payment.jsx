import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handelPayment = async () => {
    const paymentInfo = {
      parcelName: parcel.parcelName,
      cost: parcel.cost,
      parcelId: parcel.parcelId,
      senderEmail: parcel.senderEmail,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl">
        <span className="font-bold">Please Pay ${parcel.cost} for : </span>{" "}
        {parcel.parcelName}
      </h1>
      <button
        onClick={handelPayment}
        className="btn btn-primary text-black mt-3"
      >
        pay
      </button>
    </div>
  );
};

export default Payment;

import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendPercel = (data) => {
    console.log(data);
  };

  return (
    <div className=" px-13 py-15 bg-white rounded-3xl shadow  mt-8  text-secondary">
      {/* Title */}
      <h1 className="text-3xl font-bold">Send A Parcel</h1>
      <p className="mt-2 text-gray-600">Enter your parcel details</p>

      {/* Top Divider */}
      <div className="mt-6 border-t"></div>

      <form onSubmit={handleSubmit(handleSendPercel)}>
        {/* Document Selection */}
        <div className="flex items-center gap-10 mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              className="w-4 h-4 radio"
              value="document"
              defaultChecked
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              className="w-4 h-4 radio"
              value="non-document"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <label className="block mb-2">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              placeholder="Parcel Name"
              className="input  border rounded-md p-3 bg-white"
            />
          </div>

          <div>
            <label className="block mb-2">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              placeholder="Parcel Weight (KG)"
              className="input  border rounded-md p-3 bg-white"
            />
          </div>
        </div>

        {/* Middle Divider */}
        <div className="mt-10 border-t"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          {/* Sender */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Sender Details</h2>

            <div className="space-y-5">
              <label className="block mb-1">Sender Name</label>
              <input
                className="input"
                type="text"
                {...register("senderName")}
                placeholder="Sender Name"
              />

              <label className="block mb-1">Sender Email</label>
              <input
                className="input"
                type="email"
                {...register("senderEmail")}
                placeholder="Sender Email"
              />

              <label className="block mb-1">Sender Address</label>
              <input
                className="input"
                type="text"
                {...register("senderAddress")}
                placeholder="Address"
              />

              <label className="block mb-1">Sender Phone No</label>
              <input
                className="input"
                type="number"
                {...register("senderPhoneNo")}
                placeholder="Sender Phone No"
              />

              <fieldset className="fieldset text-[16px]">
               <label className=" block mb-1">Sender Regions</label>
                <select defaultValue="Pick a Region" className="select">
                  <option disabled={true}>Pick a Region</option>
                  <option>Chrome</option>
                  <option>FireFox</option>
                  <option>Safari</option>
                </select>
                <span className="label">Optional</span>
              </fieldset>

              <label className=" block mb-1">Your District</label>
              <input
                type="text"
                className="input "
                {...register("senderDistrict")}
                placeholder="Sender District"
              />

              <label className="block mb-1">Pickup Instruction</label>
              <textarea
                className="textarea w-full border rounded-md p-3"
                rows="3"
                {...register("senderInstruction")}
                placeholder="Pickup Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Receiver Details</h2>

            <div className="space-y-5">
              <label className="block mb-1">Receiver Name</label>
              <input
                className="input"
                type="text"
                {...register("ReceiverName")}
                placeholder="Receiver Name"
              />

              <label className="block mb-1">Receiver Email</label>
              <input
                className="input"
                type="email"
                {...register("ReceiverEmail")}
                placeholder="Receiver Email"
              />

              <label className="block mb-1">Receiver Address</label>
              <input
                className="input"
                type="text"
                {...register("ReceiverAddress")}
                placeholder="Address"
              />

              <label className="block mb-1">Receiver Contact No</label>
              <input
                className="input"
                type="number"
                {...register("ReceiverPhoneNo")}
                placeholder="Receiver Contact No"
              />

              <label className="block mb-1">Receiver District</label>
              <input
                type="text"
                className="input"
                {...register("receiverDistrict")}
                placeholder="Receiver District"
              />

              <label className="block mb-1">Delivery Instruction</label>
              <textarea
                className="textarea w-full border rounded-md p-3"
                rows="3"
                {...register("DeliveryInstruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-6 text-sm font-semibold">
          * PickUp Time 4pm–7pm Approx.
        </p>

        {/* Button */}
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className=" mt-6 mb-25 bg-primary text-secondary font-semibold px-6 py-3 rounded-md hover:bg-[#97d954] transition"
        />
      </form>
    </div>
  );
};

export default SendParcel;

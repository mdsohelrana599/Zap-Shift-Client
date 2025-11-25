import React from "react";
import riderImg from '../../assets/agent-pending.png'

const Rider = () => {
  return (
    <div className=" min-h-screen py-10 px-6">
      <div className=" mx-auto bg-white rounded-3xl p-10 shadow">
        {/* === Header === */}
        <h1 className="text-4xl font-bold text-[#2A2A2A]">Be a Rider</h1>
        <p className="mt-3 text-gray-500 max-w-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <hr className="my-10" />

        {/* === Grid === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* === Form === */}
          <form className="space-y-5">
            <h2 className="text-xl font-semibold">Tell us about yourself</h2>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold">Your Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full mt-1"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="font-semibold">Your age</label>
                <input
                  type="number"
                  className="input input-bordered w-full mt-1"
                  placeholder="Your age"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold">Your Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full mt-1"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="font-semibold">Your District</label>
                <select className="select select-bordered w-full mt-1">
                  <option>Select your District</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Rajshahi</option>
                  <option>Thakurgoan</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold">NID No</label>
                <input
                  type="text"
                  className="input input-bordered w-full mt-1"
                  placeholder="NID"
                />
              </div>

              <div>
                <label className="font-semibold">Contact</label>
                <input
                  type="text"
                  className="input input-bordered w-full mt-1"
                  placeholder="Contact"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="font-semibold">
                Which wire-house you want to work?
              </label>
              <select className="select select-bordered w-full mt-1">
                <option>Select wire-house</option>
                <option>Uttara</option>
                <option>Mirpur</option>
                <option>Gulshan</option>
              </select>
            </div>

            {/* Submit */}
            <button className="btn bg-primary text-black w-full hover:bg-lime-500">
              Submit
            </button>
          </form>

          {/* === Image Side === */}
          <div className="flex justify-center">
            <img src={riderImg} alt="Rider" className="w-80 lg:w-[400px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;

import React from "react";
import { NavLink } from "react-router";
import img from '../../../assets/bookingIcon.png'

const Works = () => {
  const items = [
    {
      title: "Booking Pick & Drop",
      text: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      text: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      text: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      text: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10">How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">
                {/* Icon placeholder */}
                <div className="w-10 h-10 border border-gray-400 rounded-md flex items-center justify-center">
                  <span className="text-gray-600">
                    <img src={img} alt="" />
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

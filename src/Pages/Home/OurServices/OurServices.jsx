import React from "react";
import icon from "../../../assets/service.png";

const OurServices = () => {
     const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlight: false,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true, // this will make the middle box green
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlight: false,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlight: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      highlight: false,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlight: false,
    },
  ];
  return (
    <div>
      <section className="py-10">
        <div className=" bg-secondary text-white p-12 rounded-3xl">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-3">Our Services</h2>
          <p className="text-center text-sm max-w-2xl mx-auto mb-10 opacity-80">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 text-center shadow-sm ${
                  item.highlight
                    ? "bg-[#CAEB66] text-black"
                    : "bg-white text-black"
                }`}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                  <img src={icon} alt="service_icon" className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

                {/* Description */}
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;

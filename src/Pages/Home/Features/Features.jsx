import React from "react";
import trackImg from "../../../assets/live-tracking.png";  // replace with your image
import safeImg from "../../../assets/safe-delivery.png";    // replace with your image
import supportImg from "../../../assets/safe-delivery.png"; // replace with your image

const features = [
  {
    img: trackImg,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    img: safeImg,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: supportImg,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Features = () => {
  return (
    <section className="py-15 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-40 md:w-48 object-contain"
            />

            {/* Text Content */}
            <div className="ml-10">
              <h3 className="text-2xl font-semibold mb-2 text-secondary">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

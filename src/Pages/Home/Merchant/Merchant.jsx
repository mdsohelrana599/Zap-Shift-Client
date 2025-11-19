import React from "react";
import deliveryIllustration from "../../../assets/location-merchant.png"; // Replace with your actual image

const Merchant = () => {
  return (
    <div className="py-15 px-4 md:px-12">
      <section className="md:p-15 p-5 relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white  rounded-2xl">
        {/* Optional subtle wave background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 to-transparent h-full w-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Merchant and Customer Satisfaction
                <br />
                <span className="text-cyan-300">is Our First Priority</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                We offer the lowest delivery charge with the highest value along
                with 100% safety of your product. Pathao courier delivers your
                parcels in every corner of Bangladesh right on time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-4 py-4 text-sm md:text-0 bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-bold rounded-full transition transform hover:scale-105 shadow-lg">
                  Become a Merchant
                </button>
                <button className="px-4 py-4 text-sm md:text-0 bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 hover:text-teal-900 text-white font-bold rounded-full transition transform hover:scale-105">
                  Earn with ZapShift Courier
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Package Stack Illustration */}
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <img
                    src={deliveryIllustration}
                    alt="Delivery packages with location pin"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Optional floating location pin */}
                {/* <div className="absolute -top-top-5 -right-5 animate-bounce">
                  <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchant;

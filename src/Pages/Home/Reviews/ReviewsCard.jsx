import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewsCard = ({ reviewe }) => {
  const { userName, review, user_photoURL } = reviewe;

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10">
        
        {/* Quote Icon */}
        <div className="mb-4 sm:mb-6">
          <FaQuoteLeft className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600 opacity-20" />
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day.
        </p>

        {/* Dotted Separator */}
        <div className="border-t-2 border-dashed border-gray-300 mb-6 sm:mb-8"></div>

        {/* Author */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14">
            <img
              src={user_photoURL}
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="font-semibold text-secondary text-base sm:text-lg">
              {userName}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">{review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;

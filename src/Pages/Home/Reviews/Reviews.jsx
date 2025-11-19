import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import customerImg from "../../../assets/customer-top.png";
import ReviewsCard from "./ReviewsCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div className="py-20">
      <div className="text-center">
        <img src={customerImg} alt="" className="block mx-auto mb-8" />
        <h3 className=" text-secondary text-4xl font-extrabold ">
          What our customers are sayings
        </h3>
        <p className="text-gray-600 mt-3">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
      
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
       
       
         {reviews.map((reviewe) => (
          <SwiperSlide key={reviewe.id}>
            <ReviewsCard reviewe={reviewe}></ReviewsCard>
          </SwiperSlide>
        ))}
      
      </Swiper>
    </div>
  );
};

export default Reviews;

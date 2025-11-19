import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import brands1 from "../../../assets/brands/amazon.png";
import brands2 from "../../../assets/brands/amazon_vector.png";
import brands3 from "../../../assets/brands/casio.png";
import brands4 from "../../../assets/brands/moonstar.png";
import brands5 from "../../../assets/brands/randstad.png";
import brands6 from "../../../assets/brands/star.png";
import brands7 from "../../../assets/brands/start_people.png";

const brandsLogos = [
  brands1,
  brands2,
  brands3,
  brands4,
  brands5,
  brands6,
  brands7,
];

const Brands = () => {
  return (
    <div className="my-10">
        <h3 className="text-center text-secondary text-4xl font-extrabold ">We've helped thousands of sales teams</h3>
      <Swiper
        slidesPerView={4}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper my-8"
      >
        {brandsLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;

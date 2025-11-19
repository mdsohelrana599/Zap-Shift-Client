import React from "react";
import Banner from "../Banner/Banner";
import Works from "../Works/Works";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import Merchant from "../Merchant/Merchant";
import Reviews from "../Reviews/Reviews";
import FAQSection from "../Reviews/FAQSection/FAQSection";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <OurServices></OurServices>
      <Brands></Brands>
      <Features></Features>
      <Merchant></Merchant>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;

import React from "react";
import { Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white rounded-t-3xl overflow-hidden shadow-2xl mt-20">
      <div className="px-6 py-14 sm:py-16 md:px-12 lg:px-20 text-center">

        {/* Logo + Tagline */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center gap-2 sm:gap-3">
            <Logo></Logo>
          </h2>

          <p className="mt-5 max-w-xl sm:max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 sm:w-32 mx-auto border-t border-gray-800 mb-10"></div>

        {/* Navigation Links */}
        <nav className="mb-12">
          <NavLink></NavLink>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-gray-400 text-sm sm:text-base">
            <li><NavLink to="/" className="hover:text-white transition hover:underline">Services</NavLink></li>
          <li><NavLink to="/coverage" className="hover:text-white transition hover:underline">Coverage</NavLink></li>
          <li><NavLink to="/" className="hover:text-white transition hover:underline">About Us</NavLink></li>
          <li><NavLink to="/" className="hover:text-white transition hover:underline">Pricing</NavLink></li>
          <li><NavLink to="/" className="hover:text-white transition hover:underline">Blog</NavLink></li>
          <li><NavLink to="/" className="hover:text-white transition hover:underline">Contact</NavLink></li>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center  gap-4 sm:gap-5">
          <a
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0077b5] rounded-full flex items-center justify-center  hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>

          <a
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>

          <a
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1877f2] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Facebook"
          >
           
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6"></Facebook>
          </a>

          <a
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff0000] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

        {/* Copyright */}
        {/* <p className="mt-10 text-gray-600 text-xs">
          © {new Date().getFullYear()} ZapShift. All rights reserved.
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;

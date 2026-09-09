import React, { useState } from "react";
import { Link } from "react-router-dom";
import Eventpic from "../assets/EventPic2.jpg";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-cover bg-center min-h-screen relative"
      style={{ backgroundImage: `url(${Eventpic})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        <p className="text-indigo-300 font-medium mb-2 tracking-wider">
          Ultimate Event Experience
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Browse concerts, conferences, festivals and book tickets online.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/events"
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure correct import path

const images = [assets.img1, assets.img2, assets.img3, assets.img5];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-80 md:h-96 lg:h-[400px] bg-blue-600 rounded-xl flex items-center justify-between px-10 overflow-hidden">
        {/* Left Section: Text & Button */}
        <div className="text-white max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            🛒 Shop the Latest Electronics <br />
          </h1>
          <br />
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img className="w-28" src={assets.group_profiles} alt="Profiles" />
            <p className="mt-2 text-sm md:text-base">
              Explore the newest gadgets, smartphones, and accessories at
              unbeatable prices.
            </p>
          </div>
        </div>

        {/* Right Section: Slideshow */}
        <div className="relative w-1/2 h-full flex items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute w-auto h-full object-contain transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Below Header Text Section */}
      <div className="mt-8 text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Find by Category
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Simply browse through our extensive list of top electronic brands and
          products. Get the best deals hassle-free!
        </p>
      </div>
    </div>
  );
};

export default Header;

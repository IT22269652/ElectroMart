import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.ab_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to ElectroMart, your ultimate destination for top-quality
            electronics and cutting-edge technology.At ElectroMart, we
            understand the importance of finding reliable, high-performance
            gadgets and devices that fit your needs. Whether you're looking for
            the latest smartphones, powerful laptops, or home entertainment
            systems, we’ve got you covered with a seamless shopping experience.
          </p>
          <p>
            ElectroMart is dedicated to providing a superior online shopping
            experience. We continuously enhance our platform by integrating the
            latest advancements in e-commerce, ensuring convenience, security,
            and efficiency. From product selection to checkout, we prioritize
            customer satisfaction at every step.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at ElectroMart is to make technology accessible to
            everyone. We aim to bridge the gap between customers and the latest
            innovations by offering a user-friendly platform, competitive
            prices, and exceptional service. Whether you're a tech enthusiast or
            a casual shopper, ElectroMart is here to power your digital
            lifestyle.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Seamless shopping experience with quick and secure transactions.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>
            Wide selection of top-quality electronics from trusted brands, all
            in one place.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored product recommendations and exclusive deals based on your
            preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import banner from "../assets/slide3.jpg";

const Banner = () => {
  return (
    <section
      className="m-0 mt-18 rounded relative h-[500px] bg-center bg-cover flex items-center md:mx-4 "
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${banner})`,
      }}
    >
      {/* Inner container with max width */}
      <div className="max-w-7xl mx-auto  text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Start learning from <span className="font-semibold text-yellow-400">best instructors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          Our courses are designed to inspire and empower you. Join us to gain knowledge and skills that will help you succeed.
        </p>
      </div>
    </section>
  );
};

export default Banner;

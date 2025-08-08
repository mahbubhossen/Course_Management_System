import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Learn From The Best",
    subtitle: "Get access to top-rated online courses",
    image: "/slide1.jpg",
  },
  {
    title: "Upgrade Your Skills",
    subtitle: "Stay ahead with modern tech training",
    image: "/slide2.jpg",
  },
  {
    title: "Flexible Learning",
    subtitle: "Learn anytime, anywhere at your pace",
    image: "/slide3.jpg",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="w-full mt-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[60vh] md:h-[75vh] lg:h-[90vh] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="relative h-full flex items-center justify-center z-10 px-4">
              <motion.div
                className="text-center text-white max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  {slide.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;

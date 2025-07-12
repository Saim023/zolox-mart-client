import React, { useState, useEffect, useRef } from "react";
import CarouselImg1 from "../../assets/Main-Banner-01_1.jpg";
import CarouselImg2 from "../../assets/Main-Banner-02_1.jpg";
import "./Carousel.css";

const images = [CarouselImg1, CarouselImg2];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  const totalSlides = images.length + 2;
  const transitionDuration = 500;

  const nextSlide = () => {
    if (currentIndex >= images.length) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);

      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, transitionDuration);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);

      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, transitionDuration);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={sliderRef}
        className={` flex ${
          isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {[images[images.length - 1], ...images, images[0]].map(
          (image, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <img src={image} className="w-full md:min-h-[80vh]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="md:text-7xl mb-8 font-bold uppercase tracking-widest trend">
                  On trend jersey
                </h1>
                <p className="md:text-2xl">
                  Everything 40% Flat On Handbags, Clothes And All Items Of
                  Girls
                </p>
                <button className="mt-4 px-6 py-2 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase">
                  Shop Now
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 btn btn-circle"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 btn btn-circle"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;

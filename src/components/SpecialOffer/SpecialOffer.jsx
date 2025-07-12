import React from "react";
import OfferImg1 from "../../assets/offer/ladies-offwhite-bag.png";
import OfferImg2 from "../../assets/offer/glass.png";
import OfferImg3 from "../../assets/offer/rose-gown.png";
import OfferImg4 from "../../assets/offer/women-shoe.png";
import OfferImg5 from "../../assets/offer/watch.png";
import "./SpecialOffer.css";
import { FaRegStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SpecialOffer = () => {
  return (
    <section className="special-offer grid gap-4 md:grid-cols-3 w-4/5 mx-auto my-8">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        <NavLink to="#">
          <div className="w-full h-[410px] bg-[#f7f7f7] relative overflow-hidden group">
            <h1 className="text-center text-2xl pt-2 tracking-widest uppercase">
              {" "}
              <span className="font-thin">Stylish</span>{" "}
              <span className="text-[#9740a3] font-medium">Handbag</span>
            </h1>
            <img
              src={OfferImg1}
              alt="Stylish Homemade Handbag"
              className="w-full h-full"
            />
            <div
              className="absolute top-0 left-1/2 w-0 h-full bg-[#9740a3]/40 opacity-40 z-10 
               transition-[width,left] duration-0 
               group-hover:left-0 group-hover:w-full 
               group-hover:duration-300"
            />
          </div>
        </NavLink>
        <NavLink to="#">
          <div className="w-full h-[240px] bg-[#f7f7f7] relative overflow-hidden group">
            <h1 className="text-center text-2xl pt-2 tracking-widest uppercase">
              {" "}
              <span className="font-thin">Black</span>{" "}
              <span className="text-[#9740a3] font-medium">Glass</span>
            </h1>
            <img
              src={OfferImg2}
              alt="Black Sunglasses"
              className="w-full h-full"
            />
            <div
              className="absolute top-0 left-1/2 w-0 h-full bg-[#9740a3]/40 opacity-40 z-10 
               transition-[width,left] duration-0 
               group-hover:left-0 group-hover:w-full 
               group-hover:duration-300"
            />
          </div>
        </NavLink>
      </div>

      {/* Center Column */}
      <div className="relative flex flex-col justify-center items-center bg-[#f7f7f7] overflow-hidden group">
        <NavLink to="#">
          <div>
            <div className=" absolute top-0 right-0 triangle">
              <div className=" absolute -top-40 triangle-radius -right-9 rotate-45 w-40 h-24 text-white text-center text-xl p-2 uppercase z-10">
                <div className="">
                  <FaRegStar className="mx-auto mb-1" />
                  <h1 className="font-thin">Special</h1>
                  <h1 className="font-medium tracking-wider">Offer</h1>
                </div>
              </div>
            </div>
            <div className="w-full h-[600px] ">
              <img
                src={OfferImg3}
                alt="Golden Gown"
                className="w-full h-full"
              />
              <div
                className="absolute top-0 left-1/2 w-0 h-full bg-[#9740a3]/40 opacity-40 z-10 
               transition-[width,left] duration-0 
               group-hover:left-0 group-hover:w-full 
               group-hover:duration-300"
              />
            </div>
          </div>
        </NavLink>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4">
        <NavLink to="#">
          <div className="w-full h-[410px] bg-[#f7f7f7] relative overflow-hidden group">
            <h1 className="text-center text-2xl pt-2 tracking-widest uppercase">
              {" "}
              <span className="font-thin">Glossy</span>{" "}
              <span className="text-[#9740a3] font-medium">Shoe</span>
            </h1>
            <img
              src={OfferImg4}
              alt="Glossy Black Shoe for Women"
              className="w-full h-full"
            />
            <div
              className="absolute top-0 left-1/2 w-0 h-full bg-[#9740a3]/40 opacity-40 z-10 
               transition-[width,left] duration-0 
               group-hover:left-0 group-hover:w-full 
               group-hover:duration-300"
            />
          </div>
        </NavLink>
        <NavLink to="#">
          <div className="w-full h-[240px] bg-[#f7f7f7] relative overflow-hidden group">
            <h1 className="text-center text-2xl pt-2 tracking-widest uppercase z-10 relative">
              <span className="font-thin">Ladies</span>{" "}
              <span className="text-[#9740a3] font-medium">Watch</span>
            </h1>
            <img
              src={OfferImg5}
              alt="Elegant Ladies Watch"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-0 left-1/2 w-0 h-full bg-[#9740a3]/40 opacity-40 z-10 
               transition-[width,left] duration-0 
               group-hover:left-0 group-hover:w-full 
               group-hover:duration-300"
            />
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default SpecialOffer;

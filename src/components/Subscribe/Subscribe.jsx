import React from "react";
import { LiaTelegramPlane } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";

const Subscribe = () => {
  return (
    <div className="flex items-center justify-center gap-12 h-20 my-10 group">
      <div className="relative flex items-center gap-3 ">
        <TfiEmail className="text-2xl group-hover:text-[#9740a3]" />
        <h1 className="text-xl md:text-2xl uppercase whitespace-nowrap">
          <span className="font-thin">
            Subscribe <span className="text-[#9740a3] font-normal">Us</span>
          </span>
        </h1>
      </div>
      <form>
        <div className="flex items-center pr-4 gap-2 bg-[#f7f7f7] text-base tracking-wider hover:text-[#9740a3]">
          <input
            type="email"
            aria-label="Email address"
            placeholder="Your email address"
            className="bg-[#f7f7f7] text-gray-400 outline-none px-4 py-3 md:w-96 h-12"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center h-12 py-3"
          >
            <LiaTelegramPlane className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;

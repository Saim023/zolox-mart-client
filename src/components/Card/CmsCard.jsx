import React from "react";

const CmsCard = ({ imageSrc, imageAlt = "Card image", title, description }) => {
  return (
    <div className="flex-col md:flex items-center content-center card lg:card-side bg-[#f7f7f7] shadow-sm px-4 py-6 rounded-none">
      <figure className="w-full sm:max-w-md md:max-w-lg p-4 flex justify-center items-center">
        <img
          className="transform hover:scale-110 duration-500 w-full object-contain"
          src={imageSrc}
          alt={imageAlt}
        />
      </figure>
      <div className="my-auto">
        <h2 className="card-title uppercase tracking-widest mb-3">{title}</h2>
        <p className="text-[#555] text-sm leading-relaxed tracking-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CmsCard;

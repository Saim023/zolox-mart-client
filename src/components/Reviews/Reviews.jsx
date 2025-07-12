import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/Reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log("Failed to load reviews:", err));
  }, []);

  return (
    <div className="flex items-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-4 max-w-xl mx-auto">
              <div className="mb-4">
                <img
                  src={review.image}
                  alt="Client"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              <p className="text-gray-600 italic mb-2">"{review.review}"</p>
              <h1 className="text-lg font-semibold">{review.name}</h1>
              <p className="text-sm text-gray-500">{review.designation}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;

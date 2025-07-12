import React, { useContext, useEffect, useRef, useState } from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CmsCard from "../../../components/Card/CmsCard";
import ParallaxImg from "../../../assets/banner/banner.jpg";
import CmsImg1 from "../../../assets/cms-01-removebg-preview.png";
import CmsImg2 from "../../../assets/cms-2-removebg-preview.png";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { TbBrandDatabricks } from "react-icons/tb";
import { Parallax } from "react-parallax";
import SpecialOffer from "../../../components/SpecialOffer/SpecialOffer";
import "../../../../src/Global.css";
import Reviews from "../../../components/Reviews/Reviews.jsx";
import Fashion from "../../../components/Fashion/Fashion.jsx";
import { AuthContext } from "../../../providers/AuthProvider.jsx";
import Swal from "sweetalert2";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../hooks/useWindowSize.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [width, height] = useWindowSize();
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#9740a3",
    inactiveFillColor: "#d2add7",
  };

  useEffect(() => {
    fetch("https://zolox-mart-server.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = (product) => {
    if (user && user.email) {
      console.log(product);
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        width: "350px",
        background: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        customClass: {
          popup: "my-swal-shadow",
          title: "my-swal-title",
          htmlContainer: "text-msg",
          confirmButton: "my-swal-confirm",
          cancelButton: "my-swal-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
    console.log(product);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1">
        <Carousel />
        <div>
          Width: {width}, Height: {height}
        </div>
        <div className="w-4/5 mx-auto">
          <div className="divider uppercase my-10 md:my-20 text-2xl md:text-5xl">
            <span className="font-thin"> Welcome to</span>{" "}
            <span className="text-[#9740a3] font-thin">
              {" "}
              Zol<span className=" font-bold">ox</span>
            </span>
          </div>
          <div>
            <p className="text-[#878787] text-center tracking-normal leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also into electronic
              typesetting, remaining essentially unchanged. It was popularised.
            </p>
          </div>

          <div className="my-20">
            <div className="grid md:grid-cols-2 gap-8">
              <CmsCard
                imageSrc={CmsImg1}
                imageAlt="Album Cover"
                title={
                  <>
                    <span className="font-thin bg-[#9740a3] px-2 text-white tracking-widest">
                      Smart
                    </span>{" "}
                    <span>Shoes</span>
                  </>
                }
                description="Stylish Casual Loafer"
              ></CmsCard>
              <CmsCard
                imageSrc={CmsImg2}
                imageAlt="Album Cover"
                title={
                  <>
                    <span className="font-thin bg-[#9740a3] px-2 text-white tracking-widest">
                      Smart
                    </span>{" "}
                    <span>Glass</span>
                  </>
                }
                description="Classic Black Protective Glass"
              ></CmsCard>
            </div>
          </div>
          {/* Item Card Slider */}
        </div>
        <div>
          <Parallax
            blur={1}
            strength={400}
            bgImage={ParallaxImg}
            bgImageAlt="ParallaxImg"
            bgImageStyle={{
              filter: "grayscale(90%)",
              objectFit: "cover",
              opacity: 0.1,
            }}
          >
            <h1 className="text-center pt-16 font-thin text-2xl tracking-wider uppercase">
              <span>New </span>
              <span className="font-normal text-[#9740a3]">Arrivals</span>
            </h1>
            <div className="relative w-4/5 h-[550px] bg-opacity-60 mx-auto flex items-center">
              <Swiper
                spaceBetween={30}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="mySwiper"
              >
                {items?.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div className="relative shadow-sm bg-white my-1 h-full md:h-[400px] group overflow-hidden">
                      <div className="absolute top-0 right-0 z-20 flex flex-col items-end p-2 space-y-2 transform translate-y-[-100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <button className=" text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
                          <FaRegHeart />
                        </button>
                        <button className="mb-2 text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
                          <FaEye />
                        </button>
                        <button className="mb-2 text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
                          <TbBrandDatabricks />
                        </button>
                      </div>
                      <img src={item.image} alt="" />
                      <div
                        id="description"
                        className="w-full py-1 text-center bg-white z-20 transform transition-all group-hover:-translate-y-10  duration-500"
                      >
                        <Rating
                          readOnly
                          className="mx-auto mt-1"
                          style={{ maxWidth: 90 }}
                          value={item.rating}
                          itemStyles={myStyles}
                        />
                        <h1 className="my-1">{item.name}</h1>
                        <p className="font-semibold mb-3">${item.price}</p>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#9740a3] hover:bg-[#b150bb] px-4 mb-6 py-1 text-white uppercase font-thin text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2"></button>
              <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2"></button>
            </div>
          </Parallax>
        </div>
        {/* Most Trending */}
        <div className="mt-20 ">
          <div className="w-4/5 mx-auto custom-divider-left text-start text-4xl md:text-5xl uppercase">
            <span className="font-thin">
              Most <span className="text-[#9740a3] font-normal">Trending</span>
            </span>
          </div>
          <div className="mt-20">
            <SpecialOffer></SpecialOffer>
          </div>
        </div>
        {/* Client Reviews */}
        <div className="w-4/5 mx-auto">
          <div className="divider text-4xl md:text-5xl uppercase my-20">
            <span className="font-thin">
              Client <span className="text-[#9740a3] font-normal">Reviews</span>
            </span>
          </div>
          <div>
            <Reviews></Reviews>
          </div>
        </div>
        {/* Fashion */}
        <div>
          <div className="w-4/5 mx-auto mt-20">
            <div className="divider-divider-right text-4xl md:text-5xl uppercase my-20">
              <span className="font-thin">
                Make Your{" "}
                <span className="text-[#9740a3] font-normal">Fashion</span>
              </span>
            </div>
          </div>
          <div>
            <Fashion></Fashion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

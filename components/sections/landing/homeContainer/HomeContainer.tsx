import React from "react";
import Delivery from "@/public/img/delivery.png";
import HeroBg from "@/public/img/heroBg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Sample images for testing
const images = ["/img/deal.jpg", "/img/deal2.jpg", "/img/deal1.jpg"];

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[600px]"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-red-100 px-4 py-1 rounded-full">
          <p className="text-base text-red-500 font-semibold">Fast Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <Image
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          ACNC Kitchen
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <a
          href={"/menu"}
          className="bg-gradient-to-br from-red-400 to-red-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </a>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-10 py-4 gap-4 flex-wrap">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="rounded-2xl">
                <img
                  src={image}
                  alt={"Food Image"}
                  className="w-full h-auto rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

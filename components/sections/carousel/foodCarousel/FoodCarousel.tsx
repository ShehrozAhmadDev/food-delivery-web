// FoodCarousel.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { IBanner } from "@/services/banner";

interface IFoodCarousel {
  bannerData: IBanner[];
}

const FoodCarousel = ({ bannerData }: IFoodCarousel) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
        el: ".swiper-pagination", // Custom class for pagination
      }}
      navigation={{
        nextEl: ".swiper-button-next", // Custom class for next button
        prevEl: ".swiper-button-prev", // Custom class for prev button
      }}
      modules={[Pagination, Navigation]}
      className={`mySwiper `} // Apply CSS module class
    >
      {bannerData.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image.imageUrl}
            alt={`Food ${index + 1}`}
            className="w-screen h-[470px] object-contain "
            width={400}
            height={400}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FoodCarousel;

import Image from "next/image";
import React from "react";
import { Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper";

const coverPhotos = [
  {
   id: 1, 
   url: "/home/cover3.jpg"
  },
  {
   id: 2, 
   url: "/home/cover4.jpg"
  },
  {
   id: 3, 
   url: "/home/cover2.jpg"
  },
  {
   id: 4, 
   url: "/home/cover1.jpg"
  },
]
const Hero = () => {
  return (
    <React.Fragment>
      <div className="w-full h-[90vh] flex">
        <div className="w-full h-[70%] relative">
          <div className="absolute bg-[rgba(0,0,0,0.4)] z-[1] top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <div className="w-full items-center justify-center flex flex-col gap-4">
            <Typography className="hero_heading capitalize text-white text-[30px]">
              BTRI School Alumni Association
            </Typography>
            <Typography className="text-[20px] text-white">
              MEETING THE MOMENT, TOGETHER
            </Typography>
            </div>
          </div>
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 3000 }}
            className="w-full h-full absolute z-[-1]"
          >
            {coverPhotos.map((photo, i)=> (
              <SwiperSlide key={i}>
              <Image src={photo.url} alt="" fill />
            </SwiperSlide>
            ))}
            
          </Swiper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;

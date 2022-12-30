import React from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import {Grid, Typography} from '@mui/material'


const Feedback: React.FC = () => {
  return (
    <>
          <Grid className="w-full p-5 min-h-[50vh] bg-slate-300 dark:bg-emerald-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-2xl uppercase">Feedback</Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 4000 }}
            className="swiper-review"
          >
            {items.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Banner item={item} />{" "}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
   
    </>
  );
};

type Item = {
  Name: string;
  Position: string;
  Comments: string;
  Image: string;
};

interface BannerProps {
  item: Item;
}

const Banner = (props: BannerProps) => {
  return (
    <div className="content text-white ">
      <div className="comments bg-gray-400 dark:bg-green-900">
        Animi sunt, ipsa error? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Non, placeat quisquam? dignissimos est sit reiciendis
        iste
      </div>
      <div className="profile text-black dark:text-white">
        <div className="img">
          <Image
            src={props.item.Image}
            fill
            alt=""
          />
        </div>
        <a href="#"> {props.item.Name}</a>
        <span>{props.item.Position}</span>
      </div>
    </div>
  );
};

const items: Item[] = [
  {
    Name: "Sazzad Hossen",
    Position: "Software Developer",
    Comments:
      "Animi sunt, ipsa error? Lorem ipsum dolor sit amet, consectetur adipisicing elit.Non, placeat quisquam? dignissimos est sit reiciendis iste",
    Image: "/home/cover.jpg",
  },
  {
    Name: "Amir Khan",
    Position: "Project Manager",
    Comments:
      "Animi sunt, ipsa error? Lorem ipsum dolor sit amet, consectetur adipisicing elit.Non, placeat quisquam? dignissimos est sit reiciendis iste",
    Image: "/home/cover.jpg",
  },
  {
    Name: "Moin Ali",
    Position: "Scientist",
    Comments:
      "Animi sunt, ipsa error? Lorem ipsum dolor sit amet, consectetur adipisicing elit.Non, placeat quisquam? dignissimos est sit reiciendis iste",
    Image: "/home/cover.jpg",
  },
];

export default Feedback;

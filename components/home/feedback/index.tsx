import React, { useContext, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Avatar, Grid, Typography } from "@mui/material";
import Upload from "./Upload";
import Edit from "./Edit";
import Delete from "./Delete";
import { Context, StoreProps } from "../../../store/store";
import { getData } from "../../../utils/fetchData";

interface ReviewProps {
  _id: string;
  name: string;
  profession: string;
  comment: string;
  avatar: string;
}
const Feedback = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const [data, setData] = useState<ReviewProps[]>([]);

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      if (!isCanceled) {
        const res = await getData("admin/reviews");
        setData(res.content);
      }
    };
    fetchData();
    return () => {
      isCanceled = true;
    };
  }, []);


  return (
    <>
      <Grid className="w-full max-w-full p-5 min-h-[50vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
        <Grid className="w-full relative flex items-center justify-center py-3">
          <Grid className="flex items-center">
            <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
            <Typography className="px-1 text-lg md:text-xl uppercase">
              Feedback
            </Typography>
            <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          </Grid>
          {auth?.user?.role === "admin" && (
            <Grid className="z-[1000] absolute bottom-[-2rem] md:right-0 md:bottom-auto">
              <Upload setData={setData} />
            </Grid>
          )}
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
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Banner item={item} setData={setData} />{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Grid>
    </>
  );
};

type Item = {
  _id: string;
  name: string;
  profession: string;
  comment: string;
  avatar: string;
};

interface BannerProps {
  item: Item;
  setData: Function;
}

const Banner = ({ item, setData }: BannerProps) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  return (
    <div className="content text-white">
      {auth?.user?.role === "admin" && (
        <Grid className="z-[1000] absolute w-full flex md:hidden justify-between right-0 ">
          <Edit item={item} setData={setData} />
          <Delete item={item} setData={setData} />
        </Grid>
      )}
      <div className="comments bg-green-900 dark:bg-zinc-700 text-slate-200 mt-[4rem] md:mt-0">
        {auth?.user?.role === "admin" && (
          <Grid className="z-[1000] absolute hidden md:flex gap-3 right-0 top-[-3rem]">
            <Edit item={item} setData={setData} />
            <Delete item={item} setData={setData} />
          </Grid>
        )}
        {item.comment}
      </div>
      <div className="profile text-black dark:text-white">
        <Avatar src={item.avatar} className="w-[80px] h-[80px]" />
        <Typography className="p-0 text-lg"> {item.name}</Typography>
        <span>{item.profession}</span>
      </div>
    </div>
  );
};

export default Feedback;

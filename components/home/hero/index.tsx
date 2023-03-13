import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper";
import { IoNewspaper } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsCalendar2Event } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { Context, StoreProps } from "../../../store/store";
import Upload from "./Upload";
import Edit from "./Edit";
import Delete from "./Delete";
import { getData } from "../../../utils/fetchData";


interface MediaProps {
  _id: string;
  file: string;
  caption: string;
  addToGallery: boolean;
}


const Hero = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const [data, setData] = useState<MediaProps[]>([]);

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      if (!isCanceled) {
        const res = await getData("admin/coverPhoto");
        setData(res.content);
      }
    };
    fetchData();
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <React.Fragment>
      <div className="text-white w-full flex flex-col">
        <div className="w-full max-w-full h-[40vh] md:h-[50vh] relative">
          {auth?.user?.role === "admin" && (
            <div className="absolute z-[10] right-5 top-5">
              <Upload setData={setData} data={data} />
            </div>
          )}
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            draggable
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={auth?.user?.role === "admin" ? false : true}
            className="w-full h-full max-w-full"
          >
            {data?.map((item, i) => (
              <SwiperSlide key={i}>
                <Image src={item.file} alt="" fill loading="lazy" />
                {auth?.user?.role === "admin" && (
                  <div className="absolute z-[10] right-[10rem] top-5 flex gap-3 items-center justify-end">
                    <Edit item={item} setData={setData} />
                    <Delete item={item} setData={setData} />
                  </div>
                )}
                <div className="absolute bg-[rgba(0,0,0,0.4)] z-[1] top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                  <div className="w-full flex items-center justify-center">
                    <Typography className="capitalize text-white text-xl md:text-[30px]">
                      {item.caption}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full px-5 bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <div className="w-full h-full relative">
            <div className="absolute z-[2] top-[3rem] md:top-[-4rem] right-0 left-0 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="h-[25rem] max-h-[25rem] w-full flex flex-col text-slate-200 bg-green-900 dark:bg-zinc-700">
                <div className="w-full text-white flex justify-center items-center gap-4 p-5 bg-green-800 dark:bg-zinc-900">
                  <TfiAnnouncement className="text-white" />
                  <Typography className="p-0">Announcements</Typography>
                </div>
                <hr className="w-full text-black dark:text-white mb-5" />
                <div className="flex flex-col h-full items-center justify-between">
                  <div className="w-full px-3">
                    <div className="flex items-center justify-start gap-2 pb-2">
                      <AiFillClockCircle />
                      <Typography className="p-0 text-sm">
                        28-12-2022
                      </Typography>
                    </div>
                    <ReadMore>
                      Praesent quam leo, mattis et dictum molestie, pulvinar sed
                      velit. Vivamus sit amet nulla vel lectus viverra fringilla
                      ac eget risus. Morbi aliquam sit amet orci non venenatis.
                    </ReadMore>
                    <hr className="w-full text-black dark:text-white my-5" />
                  </div>
                  <div className="w-full px-3">
                    <div className="flex items-center justify-start gap-2 pb-2">
                      <AiFillClockCircle />
                      <Typography className="p-0 text-sm">
                        28-12-2022
                      </Typography>
                    </div>
                    <ReadMore>
                      Praesent quam leo, mattis et dictum molestie, pulvinar sed
                      velit. Vivamus sit amet nulla vel lectus viverra fringilla
                      ac eget risus. Morbi aliquam sit amet orci non venenatis.
                    </ReadMore>
                  </div>
                  <div className="w-full flex items-center justify-center py-5">
                    <Button className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">
                      View all
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-[25rem] max-h-[25rem] w-full flex flex-col text-slate-200 bg-green-900 dark:bg-zinc-700">
                <div className="w-full flex justify-center items-center gap-4 p-5 bg-green-800 dark:bg-zinc-900">
                  <BsCalendar2Event />
                  <Typography className="p-0">Upcoming Event</Typography>
                </div>
                <hr className="w-full text-black dark:text-white mb-5" />
                <div className="w-full h-full px-3 flex flex-col justify-between">
                  <div className="w-full flex">
                    <div className="w-1/2 border-r h-full flex flex-col gap-4 items-center justify-center">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <AiFillClockCircle />
                        <Typography className="p-0 text-sm">
                          28-12-2022
                        </Typography>
                        <Typography className="p-0 text-sm">Tuesday</Typography>
                      </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center justify-center pl-3 break-words">
                      <Typography className="p-0">
                        Morbi aliquam sit amet
                      </Typography>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2 items-center justify-center">
                    <GoLocation />
                    <Typography className="p-0 text-sm">
                      Lawachara National Park
                    </Typography>
                  </div>
                  <div className="w-full flex items-center justify-center py-5">
                    <Button className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-[25rem] max-h-[25rem] w-full flex flex-col text-slate-200 bg-green-900 dark:bg-zinc-700">
                <div className="w-full text-white flex justify-center items-center gap-4 p-5 bg-green-800 dark:bg-zinc-900">
                  <IoNewspaper className="text-white" />
                  <Typography className="p-0">News</Typography>
                </div>
                <hr className="w-full text-black dark:text-white mb-5" />
                <div className="flex flex-col h-full items-center justify-between">
                  <div className="w-full px-3">
                    <div className="flex items-center justify-start gap-2 pb-2">
                      <AiFillClockCircle />
                      <Typography className="p-0 text-sm">
                        28-12-2022
                      </Typography>
                    </div>
                    <ReadMore>
                      Praesent quam leo, mattis et dictum molestie, pulvinar sed
                      velit. Vivamus sit amet nulla vel lectus viverra fringilla
                      ac eget risus. Morbi aliquam sit amet orci non venenatis.
                    </ReadMore>
                    <hr className="w-full text-black dark:text-white my-5" />
                  </div>
                  <div className="w-full px-3">
                    <div className="flex items-center justify-start gap-2 pb-2">
                      <AiFillClockCircle />
                      <Typography className="p-0 text-sm">
                        28-12-2022
                      </Typography>
                    </div>
                    <ReadMore>
                      Praesent quam leo, mattis et dictum molestie, pulvinar sed
                      velit. Vivamus sit amet nulla vel lectus viverra fringilla
                      ac eget risus. Morbi aliquam sit amet orci non venenatis.
                    </ReadMore>
                  </div>
                  <div className="w-full flex items-center justify-center py-5">
                    <Button className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">
                      View all
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

interface Props {
  children: string;
}
const ReadMore = ({ children }: Props) => {
  const text = children;

  return (
    <p className="pl-0 inline w-full">
      {text.slice(0, 50)}
      <span className="opacity-[0.7] text-white cursor-pointer">
        ...Read more
      </span>
    </p>
  );
};
export default Hero;

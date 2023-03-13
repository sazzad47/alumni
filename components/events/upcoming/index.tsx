import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context, StoreProps } from "../../../store/store";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import Delete from "./Delete";
import Link from "next/link";
import { AiFillClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

const Upload = dynamic(() => import("./upload"), { ssr: false });
const Update = dynamic(() => import("./update"), { ssr: false });

export interface Content {
  data: {
    _id: string;
    title: string;
    shortDescription: string;
    time: Date;
    photo: string;
    place: string;
    redirectionLink: string;
    detailedPage: string;
  }[];
}

export interface ContentItem {
  data: {
    _id: string;
    title: string;
    shortDescription: string;
    time: Date;
    photo: string;
    place: string;
    redirectionLink: string;
    detailedPage: string;
  };
  setUpdatedData: Function;
  handleClose?: () => void;
  messageForm?: boolean;
  setMessageForm?: Function;
}

const News = ({ data }: Content) => {
  const [updatedData, setUpdatedData] = useState(data);
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;

  useEffect(()=> {
    setUpdatedData(data);
  }, [data])


  return (
    <Grid className="w-full flex flex-col gap-5">
      <Grid className="flex items-center gap-3 ml-auto">
        <Grid className="w-full md:w-[20rem]">
          <SearchBar />
        </Grid>
        {auth?.user?.role === "admin" && (
          <Upload setUpdatedData={setUpdatedData} />
        )}
      </Grid>
      <Grid className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {updatedData?.map((item, i) => (
          <ContentCard key={i} data={item} setUpdatedData={setUpdatedData} />
        ))}
      </Grid>
    </Grid>
  );
};

const ContentCard = ({ data, setUpdatedData }: ContentItem) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const date = new Date(data.time);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

  return (
    <Grid className="w-full h-[15rem] bg-slate-300 dark:bg-zinc-700">
      <Grid className="w-full h-full flex">
        <Grid className="w-[40%] h-full p-3 flex flex-col items-center bg-slate-500 dark:bg-teal-900">
          <Grid className="h-1/2 flex flex-col items-center justify-center gap-1">
            <AiFillClockCircle className="text-xl text-white" />
            <Typography className="p-0 text-sm text-white">
              {formattedDate}
            </Typography>
            <Typography className="p-0 text-sm text-white">
              {formattedDayOfWeek}
            </Typography>
            <Typography className="p-0 text-sm text-white">
              {formattedTime}
            </Typography>
          </Grid>
          <Grid className="h-1/2 w-full flex flex-col items-center justify-center gap-1">
            <GoLocation className="text-xl text-white" />
            <Typography className="p-0 text-sm text-white">
              {data.place}
            </Typography>
          </Grid>
        </Grid>
        <Grid className="w-[60%] h-full relative flex flex-col justify-between gap-2 p-3">
          {auth?.user?.role === "admin" && (
            <Grid className="absolute flex z-[100] top-3 right-3">
              <Update data={data} setUpdatedData={setUpdatedData} />
              <Delete item={data} setData={setUpdatedData} />
            </Grid>
          )}
          <Grid>
            <Typography
              className={`p-0 text-lg line-clamp-2 font-semibold mb-2 ${
                auth?.user?.role === "admin" ? "mr-[5rem]" : ""
              }`}
            >
              {data.title}
            </Typography>
            <Typography className="p-0 text-sm line-clamp-4">
              {data.shortDescription}
            </Typography>
          </Grid>
          <Grid className="w-full flex justify-end">
            <Grid className="flex gap-4">
              <Link className="no-underline" href={`/events/upcoming/${data._id}`}>
                <Button
                  fullWidth
                  className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
                >
                  Details
                </Button>
              </Link>
              <Button
                onClick={() => window.location.replace(data.redirectionLink)}
                fullWidth
                className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
              >
                Join
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default News;

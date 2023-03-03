import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context, StoreProps } from "../../store/store";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import Image from "next/image";
import Delete from './Delete';
import Link from "next/link";

const Upload = dynamic(() => import("./upload"), { ssr: false });
const Update = dynamic(() => import("./update"), { ssr: false });

export interface Content {
  data: {
    _id: string;
    title: string;
    shortDescription: string;
    photo: string;
    keywords: string;
    detailedPage: string;
  }[];
}

export interface ContentItem {
  data: {
  _id: string;
  title: string;
  shortDescription: string;
  photo: string;
  keywords: string;
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

  return (
    <Grid className="w-full flex flex-col gap-5">
      <Grid className="flex items-center gap-3 ml-auto">
        <Grid className="w-full md:w-[20rem]">
          <SearchBar />
        </Grid>
        {auth?.user?.role === "admin" && <Upload setUpdatedData={setUpdatedData} />}
      </Grid>
      <Grid className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
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
 

  return (
    <Grid className="w-full h-[15rem] bg-slate-300 dark:bg-zinc-700">
      <Grid className="w-full h-full flex flex-col">
        <Grid className="w-full h-[50%] relative">
          {auth?.user?.role === "admin" && <Grid className="absolute flex z-[100] right-0 text-slate-200 bg-green-700 dark:bg-stone-500">
            <Update data={data} setUpdatedData={setUpdatedData} />
           <Delete item= {data} setData={setUpdatedData} />
          </Grid>}
          <Image src={data.photo} loading="lazy" alt="" fill sizes="(max-width: 600px) 100vw, 600px"/>
        </Grid>
        <Grid className="h-[50%] p-3 flex flex-col justify-between text-black dark:text-white">
          <Typography className="p-0 line-clamp-2 text-sm">
            {data.title}
          </Typography>
          <Link href={`/notice/${data._id}`}>
          <Button fullWidth className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">
            Details
          </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default News;

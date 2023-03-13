import { Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context, StoreProps } from "../../../store/store";
import dynamic from "next/dynamic";
import Parser from "html-react-parser";
import Image from "next/image";

const Update = dynamic(() => import("./update"), { ssr: false });

export interface Content {
  data: {
    _id: string;
    title: string;
    shortDescription: string;
    photo: string;
    keywords: string;
    detailedPage: string;
    createdAt: string;
  };
}
const News = ({ data }: Content) => {
  const [updatedData, setUpdatedData] = useState(data);
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;

  function localDate(props: string) {
    const date = new Date(props);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear()
    );
  }

  return (
    <Grid className="w-full flex flex-col gap-5 p-5">
      <Grid className="w-full flex items-start justify-between">
        <Grid className="flex flex-col gap-3">
        <Typography className="p-0 bold text-xl md:3xl">{updatedData.title}</Typography>
        <Typography className="p-0">{localDate(data?.createdAt)}</Typography>
        </Grid>
        {auth?.user?.role === "admin" && (
          <Update data={updatedData} setUpdatedData={setUpdatedData} />
        )}
      </Grid>
      <Grid className="w-full md:w-1/2 h-[10rem]">
        <Grid className="w-full h-full relative">
        <Image src={updatedData.photo} alt="photo" fill />
        </Grid>
      </Grid>
      <Grid className="w-full max-w-full text-black dark:text-white">
        {Parser(updatedData?.detailedPage)}
      </Grid>
    </Grid>
  );
};

export default News;

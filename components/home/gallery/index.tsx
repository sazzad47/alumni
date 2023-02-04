import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Context, StoreProps } from "../../../store/store";
import Upload from "./Upload";
import Edit from "./Edit";
import Delete from "./Delete";
import { useIsSmall } from '../../../utils/mediaQueries';

const variantsSmallDevice = {
  hover: {
    opacity: 1,
    scale: 1,
  },
  initial: {
    opacity: 0,
    scale: 1,
  },
  }
const variantsLargeDevice = {
  hover: {
    opacity: 1,
    scale: 1.2,
  },
  initial: {
    opacity: 0,
    scale: 1,
  },
};

interface MediaProps {
  _id: string;
  file: string;
  caption: string;
  addToHome: boolean;
}
const Gallery = ({ contents }: { contents: MediaProps[] }) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const [data, setData] = useState<MediaProps[]>(contents);
  
  

  return (
    <Grid className="w-full p-5 min-h-[50vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full relative flex flex-col items-center justify-center py-5">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-lg md:text-xl uppercase">
            Gallery
          </Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
        {auth?.user?.role === "admin" && (
          <Grid className="z-[100] my-3 relative md:absolute bottom-0 right-auto md:right-0 md:bottom-auto">
            <Upload setData={setData} data={data} />
          </Grid>
        )}
      </Grid>
      <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {data.filter((item) => item.addToHome === true).map((item, i) => (
          <Grid key={i} className="w-full h-[10rem] relative">
            <Contents item={item} setData={setData} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const Contents = ({
  item,
  setData,
}: {
  item: MediaProps;
  setData: Function;
}) => {
  const isSmall = useIsSmall()
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const controls = useAnimation();
  function handleMouseEnterControls() {
    controls.start("hover");
  }

  function handleMouseLeaveControls() {
    controls.start("initial");
  }

  return (
    <motion.div
      onClick={handleMouseEnterControls}
      onMouseEnter={handleMouseEnterControls}
      onMouseLeave={handleMouseLeaveControls}
    >
      <Image src={item.file} alt="" fill />
      <motion.div
        initial="initial"
        variants={isSmall? variantsLargeDevice: variantsSmallDevice}
        animate={controls}
        className="absolute z-10 top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)]"
      >
        <div className={`w-full flex flex-col ${auth?.user?.role === "admin"? "justify-start items-center": "items-center justify-center"} h-full relative`}>
          {auth?.user?.role === "admin" && (
            <div className="w-full flex justify-end h-[3rem]">
              <div className="flex gap-2">
                <Edit item={item} setData={setData} />
                <Delete item={item} setData={setData} />
              </div>
            </div>
          )}
          <Typography className="px-5 text-slate-200">
            {item.caption}
          </Typography>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Gallery;

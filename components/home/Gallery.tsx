import React from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const variants = {
  hover: {
    opacity: 1,
    scale: 1.3
  },
  initial: {
    opacity: 0,
    scale: 1,
  },
};

const Gallery = () => {
  return (
    <Grid className="w-full p-5 min-h-[50vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-lg md:text-xl uppercase">Gallery</Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
      <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
          <Grid key={i} className="w-full h-[10rem] relative">
            <Contents />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const Contents = () => {
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
      <Image src="/home/cover2.jpg" alt="" fill />
      <motion.div
        initial="initial"
        variants={variants}
        animate={controls}
        className="absolute z-10 top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)]"
      >
        <Typography className="px-5 text-slate-200">
          Nullam volutpat porta velit consectetur pellentesque
        </Typography>
      </motion.div>
    </motion.div>
  );
};
export default Gallery;

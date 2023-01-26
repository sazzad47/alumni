import React from "react";
import { Grid, Typography } from "@mui/material";
import EditPrivacy from "./EditPrivacy";
import Image from "next/image";
import MoreMenus from "./MoreMenus";

const Photos = () => {
  return (
    <Grid className="flex flex-col p-4 w-full my-5 bg-bgLight dark:bg-bgDark">
      <Grid className="w-full flex justify-between">
        <Typography className="p-0">Photos</Typography>
        <EditPrivacy />
      </Grid>
      <Grid className="w-full flex flex-wrap gap-[1rem] mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
          <Grid
            key={i}
            className="w-[calc(20%-0.8rem)] h-[8rem] overflow-hidden relative p-5 border rounded-lg flex items-center justify-between gap-3"
          >
            <Image src="/home/cover3.jpg" alt="" fill />
            <Grid className="absolute top-1 right-1">
              <MoreMenus/>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Photos;

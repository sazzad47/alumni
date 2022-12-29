import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Stories = () => {
  return (
    <Grid className="w-full p-5 min-h-[50vh] bg-slate-300 dark:bg-emerald-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-2xl uppercase">Memories</Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
      <Grid className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Grid key={i} className="w-full h-[20rem] bg-gray-600 dark:bg-green-900">
            <Grid className="w-full h-full flex flex-col">
              <Grid className="w-full h-[40%] relative">
                <Image src="/home/cover4.jpg" alt="" fill />
              </Grid>
              <Grid className="h-[60%] flex flex-col gap-2 p-3 text-white">
                <Typography className="text-lg">Nullam volutpat porta velit</Typography>
                <Typography className="break-words text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  posuere nulla ac mauris luctus, nec hendrerit purus gravida.
                  Vestibulum vulputate ultricies aliquam.
                </Typography>
                <Button className="normal-case text-white bg-green-700 px-4 hover:bg-green-800">Read more</Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Stories;

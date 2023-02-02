import { Grid, Typography } from "@mui/material";
import React from "react";
import SupportIcon from "@mui/icons-material/Support";
import { UserData } from "..";

const Biography = ({ data }: UserData) => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <BiographyInfo data={data} />
    </Grid>
  );
};

const BiographyInfo = ({ data }: UserData) => {
  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <SupportIcon />
        <Typography className="p-0 font-bold">Biography</Typography>
      </Grid>
      <Typography className="p-0">{data.biography}</Typography>
    </Grid>
  );
};

export default Biography;

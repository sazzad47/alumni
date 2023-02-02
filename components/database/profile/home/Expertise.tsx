import { Grid, Typography } from "@mui/material";
import React from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { UserData } from "..";

const Expertise = ({ data }: UserData) => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <ExpertiseInfo data={data} />
    </Grid>
  );
};

const ExpertiseInfo = ({ data }: UserData) => {
  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <LocalLibraryIcon />
        <Typography className="p-0 font-bold">Expertise</Typography>
      </Grid>
      <Typography className="p-0">{data.expertise}</Typography>
    </Grid>
  );
};

export default Expertise;

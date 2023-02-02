import { Grid, Typography } from "@mui/material";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { UserData } from "..";

const Intro = ({ data }: UserData) => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <GeneralInfo data={data} />
    </Grid>
  );
};

const GeneralInfo = ({ data }: UserData) => {
  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <PermIdentityIcon />
        <Typography className="p-0 font-bold">General Information</Typography>
      </Grid>
      <Grid className="flex flex-col gap-2">
        <Grid className="w-full md:w-[20rem] flex flex-col gap-5">
          {data.dateOfBirth && (
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Date of Birth</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {data.dateOfBirth}
                </Typography>
              </Grid>
            </Grid>
          )}
          {data.placeOfBirth && (
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Place of Birth</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {data.placeOfBirth}
                </Typography>
              </Grid>
            </Grid>
          )}
          {data.currentLocation && (
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Current Location</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {data.currentLocation}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Intro;

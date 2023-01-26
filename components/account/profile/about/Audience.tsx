import React from "react";
import { Grid, Typography, Divider, Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";
import { AudienceProps } from "./work_edu/Work";



interface Props {
  workAudience: AudienceProps;
  setWorkAudience: Function;
  handleClose: ()=> void;
}

const Audience = ({ setWorkAudience, workAudience, handleClose }: Props) => {
  return (
    <Grid className="audience_Modal text-textLight dark:text-textDark p-2">
      <Grid className="relative flex items-center justify-center w-full h-[2rem]">
        <Typography className="p-0">Select audience</Typography>
        
      </Grid>
      <Divider className="my-3" />
      <Grid>
        <Grid className="mt-3">
          <Grid
            component="label"
            htmlFor="public"
            className="w-full h-[4rem] px-3 cursor-pointer flex items-center justify-between hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover"
          >
            <Grid className="flex items-center">
              <Avatar>
                <PublicIcon />
              </Avatar>
              <Grid className="flex flex-col">
                <Typography className="pl-3 p-0 text-lg font-semibold">
                  Public
                </Typography>
                <Typography className="pl-3 p-0 text-sm opacity-[0.7]">
                  Anyone on or off Gamma
                </Typography>
              </Grid>
            </Grid>
            <input
              type="radio"
              name="audience"
              id="public"
              className="w-[20px] h-[20px]"
              checked={workAudience.audience === "Public"}
              onChange={() => {
                setWorkAudience({
                  audience: "Public",
                  icon: <PublicIcon fontSize="inherit" />,
                });
                handleClose();
                
              }}
            />
          </Grid>
          <Grid
            component="label"
            htmlFor="friends"
            className="w-full h-[4rem] px-3 cursor-pointer flex items-center justify-between hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover"
          >
            <Grid className="flex items-center">
              <Avatar>
                <GroupIcon />
              </Avatar>
              <Grid className="flex flex-col">
                <Typography className="pl-3 p-0 text-lg font-semibold">
                  Friends
                </Typography>
                <Typography className="pl-3 p-0 text-sm opacity-[0.7]">
                  Your friends on Gamma
                </Typography>
              </Grid>
            </Grid>
            <input
              type="radio"
              name="audience"
              id="friends"
              className="w-[20px] h-[20px]"
              checked={workAudience.audience === "Friends"}
              onChange={() => {
                setWorkAudience({
                  audience: "Friends",
                  icon: <GroupIcon fontSize="inherit" />,
                });
                handleClose();
              }}
            />
          </Grid>
          <Grid
            component="label"
            htmlFor="onlyMe"
            className="w-full h-[4rem] px-3 cursor-pointer flex items-center justify-between hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover"
          >
            <Grid className="flex items-center">
              <Avatar>
                <LockIcon />
              </Avatar>
              <Grid className="flex flex-col">
                <Typography className="pl-3 p-0 text-lg font-semibold">
                  Only me
                </Typography>
              </Grid>
            </Grid>
            <input
              type="radio"
              name="audience"
              id="onlyMe"
              className="w-[20px] h-[20px]"
              checked={workAudience.audience === "Only me"}
              onChange={() => {
                setWorkAudience({
                  audience: "Only me",
                  icon: <LockIcon fontSize="inherit" />,
                });
                handleClose();
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Audience;

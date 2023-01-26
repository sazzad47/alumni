import React, { useRef } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useTheme } from "next-themes";
import Image from "next/image";
import About from "./about";
import Videos from "./videos";
import Members from "./members";
import Photos from "./photos";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import Home from "./home";

const Common = () => {
  const profilePhotoInput = useRef<HTMLInputElement>(null);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleProfilePhoto = () => {};

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  return (
    <Grid container className="w-full flex flex-col">
      <Grid
        item
        className="w-full flex flex-col items-center justify-center relative p-5"
      >
        <Grid className="relative w-[150px] h-[150px]">
          <Avatar
            onClick={handleChooseProfilePhoto}
            src="/user.jpg"
            className="w-full h-full cursor-pointer"
          />
          <input
            ref={profilePhotoInput}
            hidden
            type="file"
            accept="image/*"
            onChange={handleProfilePhoto}
          />
          <IconButton
            onClick={handleChooseProfilePhoto}
            className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[40px] h-[40px] absolute left-[105px] bottom-[-1px] text-slate-200 z-[20]"
          >
            <CameraAltIcon />
          </IconButton>
        </Grid>
        <Grid className="relative w-full mt-3">
          <Grid className="w-full flex flex-col items-center justify-start gap-2">
            <Grid className="flex gap-2 items-center">
              <Typography className="p-0 text-2xl">Sazzad Hossen</Typography>
              <Tooltip title="Honorary member">
                <WorkspacePremiumIcon className="text-lg" />
              </Tooltip>
            </Grid>
            <Grid><Typography className="text-lg text-slate-500">Batch: 2014</Typography> </Grid>
            
            <Button
              variant="contained"
              className="hidden md:block text-md absolute right-0 normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            >
              {" "}
              <EditIcon className="text-sm" /> Edit profile
            </Button>
          </Grid>
          <Grid className="block md:hidden w-full py-5">
          <Button
              variant="contained"
              className="text-md absolute right-0 normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            >
              {" "}
              <EditIcon className="text-sm" /> Edit profile
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className="w-full px-5">
        <Home />
      </Grid>
    </Grid>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Common;

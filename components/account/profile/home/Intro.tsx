import { Grid, Typography, Divider, IconButton } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Intro = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700 p-4">
      <Grid className="flex flex-col gap-5">
        <Grid>
          <Grid className="flex gap-3 items-center mb-3">
            <HomeIcon />
            <Typography className="p-0 font-bold">Place of Birth</Typography>
          </Grid>

          <Typography className="p-0">
            Nilphamari Sadar, Nilphamari, Bangladesh
          </Typography>
        </Grid>
        <Grid>
          <Grid className="flex gap-3 items-center mb-3">
            <PlaceIcon />
            <Typography className="p-0 font-bold">Current Location</Typography>
          </Grid>
          <Typography className="p-0">Savar, Dhaka, Bangladesh</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Intro;

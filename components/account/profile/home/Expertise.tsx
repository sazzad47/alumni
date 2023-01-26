import { Grid, Typography, Divider, IconButton } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SupportIcon from "@mui/icons-material/Support";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Expertise = () => {
  return (
    <Grid className="bg-slate-300 dark:bg-zinc-700 p-4">
        <Grid>
          <Grid className="flex gap-3 items-center mb-3">
            <LocalLibraryIcon />
            <Typography className="p-0 font-bold">Expertise</Typography>
          </Grid>
          <Typography className="p-0">
          Python, Java, C++, PHP, SQL, R, Django, Node.js , Angular, Bootstrap, Tailwind CSS, React, React Native
          </Typography>
        </Grid>
    </Grid>
  );
};

export default Expertise;

import { Grid, Typography, Divider, IconButton } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import {FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitterSquare, FaYoutube, FaTiktok} from 'react-icons/fa'


const SocialLinks = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700 p-4">
      
      <Grid className="flex gap-3 items-center mb-3">
            <RssFeedIcon />
            <Typography className="p-0 font-bold">Social Links</Typography>
          </Grid>
        <Grid className="flex gap-3 items-center">
         <IconButton className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
          <FaFacebookF className="text-lg"/>
         </IconButton>
         <IconButton className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
          <FaInstagramSquare className="text-lg"/>
         </IconButton>
         <IconButton className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
          <FaLinkedinIn className="text-lg"/>
         </IconButton>
         <IconButton className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
          <FaTwitterSquare className="text-lg"/>
         </IconButton>
        </Grid>
        
      
    </Grid>
  );
};

export default SocialLinks;

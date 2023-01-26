import { Grid, Typography, Divider, IconButton } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SupportIcon from "@mui/icons-material/Support";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Biography = () => {
  return (
    <Grid className="bg-slate-300 dark:bg-zinc-700 p-4">
        <Grid>
          <Grid className="flex gap-3 items-center mb-3">
            <SupportIcon />
            <Typography className="p-0 font-bold">Biography</Typography>
          </Grid>
          <Typography className="p-0">
            Your professional bio should be as unique as you are. That said,
            there are a few items you&apos;ll want to include to make sure that your
            readers get the information they&apos;re looking for. Your bio should
            include important professional roles and achievements. It&apos;s also
            valuable to add passions, personal interests, and how you bring your
            values to your work. Finally, your bio should give your readers a
            chance to get to know you. So, it should reflect your personality.
          </Typography>
        </Grid>
    </Grid>
  );
};

export default Biography;

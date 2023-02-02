import { Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

const SocialLinks = ({ data }) => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <SocialLinksInfo data={data} />
    </Grid>
  );
};

const SocialLinksInfo = ({ data }) => {
  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <RssFeedIcon />
        <Typography className="p-0 font-bold">Social Links</Typography>
      </Grid>
      <Grid className="flex gap-3 items-center">
        {data.socialLinks.map((item, i) => {
          let link = item.domain + item.username;
          let icons = [
            {
              id: 1,
              domain: "https://www.facebook.com/",
              icon: <FaFacebookF className="text-lg" />,
            },
            {
              id: 2,
              domain: "https://www.instagram.com/",
              icon: <FaInstagramSquare className="text-lg" />,
            },
            {
              id: 3,
              domain: "https://www.linkedin.com/",
              icon: <FaLinkedinIn className="text-lg" />,
            },
            {
              id: 4,
              domain: "https://twitter.com/",
              icon: <FaTwitterSquare className="text-lg" />,
            },
            {
              id: 5,
              domain: "https://www.youtube.com/",
              icon: <FaYoutube className="text-lg" />,
            },
          ];
          return (
            <IconButton
              key={i}
              onClick={() => window.open(link, "_self")}
              className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]"
            >
              {
                icons.find((domainIcon) => domainIcon.domain === item.domain)
                  .icon
              }
            </IconButton>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default SocialLinks;

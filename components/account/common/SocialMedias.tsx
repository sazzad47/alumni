import React, { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { Grid, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const SocialMedias = () => {
  const [open, setOpen] = useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid className="relative">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Button
            onClick={() => setOpen(!open)}
            className="focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
          >
            Facebook <ArrowDropDownIcon />
          </Button>
        </ClickAwayListener>
        {open && <DropdownMenu />}
      </Grid>
    </React.Fragment>
  );
};

function DropdownMenu() {
  return (
    <div className="z-[1] absolute w-[300px] h-[150px] flex items-center justify-center overflow-hidden rounded-[var(--border-radius)] bg-[#eee] dark:bg-[#242526]">
      <Grid className="w-full px-3 overflow-y-auto h-[130px]">
        {[
          "Twitter", "Youtube", "LinkedIn", "Instagram", "TikTok", "Snapchat", "WhatsApp", "Twitch", "WeChat", "Kik", "Spotify",
          "Skype", "GitHub", "Pinterest",
        ].map((name, i) => (
          <Grid
            key={i}
            className="w-full p-2 rounded-md cursor-pointer hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark"
          >
            {name}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SocialMedias;

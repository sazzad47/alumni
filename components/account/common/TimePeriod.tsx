import React, { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { Grid, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const TimePeriod = () => {
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
            Year <ArrowDropDownIcon />
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
          1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
          2007, 2008, 2009,
        ].map((year, i) => (
          <Grid
            key={i}
            className="w-full p-2 rounded-md cursor-pointer hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark"
          >
            {year}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TimePeriod;

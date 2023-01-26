import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Checkbox,
  Divider,
  Dialog
} from "@mui/material";
import { useTheme } from "next-themes";
import TimePeriod from "../../../common/TimePeriod";
import PublicIcon from '@mui/icons-material/Public';
import Audience from "../Audience";

export interface AudienceProps {
  audience: string;
  icon: JSX.Element;
}

const Work = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [currentlyWork, setCurrentlyWork] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [workAudience, setWorkAudience] = useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon fontSize="inherit" />,
  });

  const AddWorkForm = () => {
    setWorkForm(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid>
        <Grid className="flex flex-col items-start mb-5">
          <Typography className="p-0">Work</Typography>
      {!workForm && (
          <Button
            onClick={AddWorkForm}
            disableRipple
            className="flex justify-start p-0 focus:outline-none normal-case mt-2 text-textLight dark:text-textDark"
          >
            <AddCircleOutlineIcon className="p-0 mr-2" />
            Add a workplace
          </Button>
      )}
        </Grid>
      {workForm && (
        <form>
          <Grid className="flex flex-col w-full gap-5">
            <TextField
              sx={{
                input: { color: currentTheme === "dark" ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              className="w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
              placeholder="Company"
            />
            <TextField
              sx={{
                input: { color: currentTheme === "dark" ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              className="w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
              placeholder="Position"
            />
            <TextField
              sx={{
                input: { color: currentTheme === "dark" ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              className="w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
              placeholder="City/Town"
            />
            <TextField
              multiline
              minRows={3}
              sx={{
                textarea: { color: currentTheme === "dark" ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                    color: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: currentTheme === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              className="w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
              placeholder="Description"
            />
            <Grid className="flex flex-col">
              <Typography className="p-0">Time Period</Typography>
              <Grid className="flex items-center mt-2">
                <Checkbox
                  onChange={() => setCurrentlyWork(!currentlyWork)}
                  checked={currentlyWork}
                  sx={{
                    color: currentTheme === "dark" ? "#fff" : "#000",
                    padding: 0,
                    "&.Mui-checked": {
                      color: currentTheme === "dark" ? "#fff" : "#000",
                    },
                  }}
                />
                <Typography className="p-0 pl-3">
                  I currently work here
                </Typography>
              </Grid>
              <Grid className="w-full my-3">
                {currentlyWork ? (
                  <Grid className="flex items-center">
                    <Typography className="p-0 pr-3">From</Typography>
                    <TimePeriod />
                  </Grid>
                ) : (
                  <Grid className="flex items-center">
                    <TimePeriod />
                    <Typography className="p-0 px-3">to</Typography>
                    <TimePeriod />
                  </Grid>
                )}
              </Grid>
              <Divider />
              <Grid className="w-full flex justify-between items-center mt-4">
                <Button
                  onClick={handleClickOpen}
                  className="flex gap-1 focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
                >
                  {workAudience.icon} {workAudience.audience}
                </Button>
                <Grid className="flex gap-4">
                  <Button
                    onClick={() => setWorkForm(false)}
                    className="focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
                  >
                    Cancel
                  </Button>
                  <Button className="focus:outline-none bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark hover:bg-bgButtonSecondaryHover dark:hover:bg-bgButtonSecondaryDarkHover text-textDark normal-case">
                    Save
                  </Button>
                </Grid>
                <Dialog
                  sx={{
                    "& .MuiDialog-paper": {
                      backgroundColor:
                        currentTheme === "dark" ? "#474849" : "#fff",
                      width: "30rem",
                      height: "20rem",
                      maxHeight: "20rem",
                      overflow: "hidden",
                      transition: "height width var(--speed) ease",
                    },
                  }}
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <Audience
                    handleClose={handleClose}
                    workAudience={workAudience}
                    setWorkAudience={setWorkAudience}
                  />
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Grid>
  );
};

export default Work;

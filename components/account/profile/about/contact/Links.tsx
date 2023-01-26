import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Dialog,
} from "@mui/material";
import { useTheme } from "next-themes";
import PublicIcon from "@mui/icons-material/Public";
import Audience from "../Audience";
import SocialMedias from "../../../common/SocialMedias";

export interface AudienceProps {
  audience: string;
  icon: JSX.Element;
}

const HighSchool = () => {
  return (
    <Grid className="my-5">
      <Grid className="flex flex-col items-start gap-2">
      <Typography className="p-0 mb-1">Websites and social links</Typography>
        <WebsiteLinkForm/>
        <SocialLinkForm/>
      </Grid>
    </Grid>
  );
};
const WebsiteLinkForm = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [workAudience, setWorkAudience] = useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon className="text-sm mr-1" />,
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
    <Grid className="w-full">
         {!workForm && (
          <Button
            onClick={AddWorkForm}
            disableRipple
            className="flex justify-start p-0 focus:outline-none normal-case mt-2 text-textLight dark:text-textDark"
          >
            <AddCircleOutlineIcon className="p-0 mr-2" />
            Add a website
          </Button>
        )}
        {workForm && (
        <form className="mt-2">
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
              placeholder="Website address"
            />
            <Divider />
            <Grid className="w-full flex justify-between items-center">
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
        </form>
      )}
    </Grid>
  )
}
const SocialLinkForm = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [workAudience, setWorkAudience] = useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon className="text-sm mr-1" />,
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
    <Grid className="w-full h-[12rem]">
         {!workForm && (
          <Button
            onClick={AddWorkForm}
            disableRipple
            className="flex justify-start p-0 focus:outline-none normal-case mt-2 text-textLight dark:text-textDark"
          >
            <AddCircleOutlineIcon className="p-0 mr-2" />
            Add a social link
          </Button>
        )}
        {workForm && (
        <form className="mt-2">
          <Grid className="flex flex-col w-full gap-5">
            <Grid className="flex gap-5">
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
              className="w-[12rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
              placeholder="Username"
            />
            <SocialMedias/>
            </Grid>
            <Divider />
            <Grid className="w-full flex justify-between items-center">
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
        </form>
      )}
    </Grid>
  )
}
export default HighSchool;

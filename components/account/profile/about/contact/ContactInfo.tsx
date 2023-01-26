import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from "@mui/icons-material/Edit";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Dialog,
  IconButton,
} from "@mui/material";
import { useTheme } from "next-themes";
import PublicIcon from "@mui/icons-material/Public";
import Audience from "../Audience";

export interface AudienceProps {
  audience: string;
  icon: JSX.Element;
}

const College = () => {
 
  return (
    <Grid className="">
      <Grid className="flex flex-col items-start">
        <Typography className="p-0 mb-3">Contact Info</Typography>
        <MobileForm />
        <EmailForm />
      </Grid>
    </Grid>
  );
};

const MobileForm = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [workAudience, setWorkAudience] = useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon fontSize="inherit" />,
  });

  const AddMobileForm = () => {
    setWorkForm(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid className="w-full mb-5">
      {!workForm && (
        <Grid className="w-full flex justify-between">
          <Grid className="flex gap-5">
            <Grid>
              <CallIcon />
            </Grid>
            <Grid className="flex flex-col">
              <Typography className="p-0">0122222222</Typography>
              <Typography className="p-0 text-sm opacity-[0.8]">
                Mobile
              </Typography>
            </Grid>
          </Grid>
          <Grid className="flex gap-3">
            <IconButton
              onClick={handleClickOpen}
              className="w-[30px] h-[30px] focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
            >
              {workAudience.icon}
            </IconButton>
            <IconButton
              onClick={AddMobileForm}
              className="w-[30px] h-[30px] focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
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
              placeholder="Mobile"
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
            </Grid>
          </Grid>
        </form>
      )}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: currentTheme === "dark" ? "#474849" : "#fff",
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
  );
};
const EmailForm = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [workAudience, setWorkAudience] = useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon fontSize="inherit" />,
  });

  const AddMobileForm = () => {
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
        <Grid className="w-full flex justify-between">
          <Grid className="flex gap-5">
            <Grid>
              <EmailIcon />
            </Grid>
            <Grid className="flex flex-col">
              <Typography className="p-0">test@gmail.com</Typography>
              <Typography className="p-0 text-sm opacity-[0.8]">
                Email
              </Typography>
            </Grid>
          </Grid>
          <Grid className="flex gap-3">
            <IconButton
              onClick={handleClickOpen}
              className="w-[30px] h-[30px] focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
            >
              {workAudience.icon}
            </IconButton>
            <IconButton
              onClick={AddMobileForm}
              className="w-[30px] h-[30px] focus:outline-none bg-bgButton dark:bg-bgButtonDark hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover text-textLight dark:text-textDark normal-case"
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
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
              placeholder="Email"
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
            </Grid>
          </Grid>
        </form>
      )}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: currentTheme === "dark" ? "#474849" : "#fff",
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
  );
};
export default College;

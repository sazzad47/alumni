import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Checkbox,
  Divider,
  Dialog,
  Radio,
  FormLabel,
} from "@mui/material";
import { useTheme } from "next-themes";
import TimePeriod from "../../../common/TimePeriod";
import PublicIcon from "@mui/icons-material/Public";
import Audience from "../Audience";

export interface AudienceProps {
  audience: string;
  icon: JSX.Element;
}

const College = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [currentlyWork, setCurrentlyWork] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState("college");
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Grid className="my-5">
      <Grid className="flex flex-col items-start mb-5">
        <Typography className="p-0">College</Typography>
        {!workForm && (
          <Button
            onClick={AddWorkForm}
            disableRipple
            className="flex justify-start p-0 focus:outline-none normal-case mt-2 text-textLight dark:text-textDark"
          >
            <AddCircleOutlineIcon className="p-0 mr-2" />
            Add college
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
              placeholder="School"
            />

            <Grid className="flex flex-col">
              <Typography className="p-0">Time Period</Typography>
              <Grid className="w-full my-3">
                <Grid className="flex items-center">
                  <TimePeriod />
                  <Typography className="p-0 px-3">to</Typography>
                  <TimePeriod />
                </Grid>
              </Grid>
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
                <Typography className="p-0 pl-3">Graduated</Typography>
              </Grid>
              <TextField
                multiline
                minRows={3}
                sx={{
                  textarea: {
                    color: currentTheme === "dark" ? "#fff" : "#000",
                  },
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
                className="w-[20rem] mt-4 rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
                placeholder="Description"
              />
              <Typography className="p-0 mt-4 mb-1">Concentrations</Typography>
              <Grid className="flex flex-col gap-3">
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
                  placeholder="Concentration"
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
                  placeholder="Concentration"
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
                  placeholder="Concentration"
                />
              </Grid>
              <Typography className="p-0 mt-4 mb-1">Attended for</Typography>
              <FormLabel className="text-textLight dark:text-textDark" id="college">
                <Radio
                  checked={selectedValue === "college"}
                  onChange={handleChange}
                  value="college"
                  name="attendedFor"
                  inputProps={{ "aria-label": "college" }}
                  sx={{
                    color: "dark" ? "#fff" : "#000", padding: 0, paddingRight: 1,
                    '&.Mui-checked': {
                      color: "dark" ? "#fff" : "#000",
                    },
                  }}
                />
                College
              </FormLabel>
              <FormLabel className="text-textLight dark:text-textDark mt-2" id="graduateSchool">
                <Radio
                  checked={selectedValue === "graduateSchool"}
                  onChange={handleChange}
                  value="graduateSchool"
                  name="attendedFor"
                  inputProps={{ "aria-label": "graduateSchool" }}
                  sx={{
                    color: "dark" ? "#fff" : "#000", padding: 0, paddingRight: 1,
                    '&.Mui-checked': {
                      color: "dark" ? "#fff" : "#000",
                    },
                  }}
                />
                Graduate School
              </FormLabel>
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
                  className="w-[20rem] my-3 rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
                  placeholder="Degree"
                />
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

export default College;

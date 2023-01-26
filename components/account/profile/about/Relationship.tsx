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
import Audience from "./Audience";
import RelationStatus from "../../common/RelationStatus";

export interface AudienceProps {
  audience: string;
  icon: JSX.Element;
}
const Relationship = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [workForm, setWorkForm] = useState<boolean>(false);
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
    <Grid className="flex flex-col px-4">
      <Grid className="flex flex-col items-start">
        <Typography className="p-0 mb-3">Relationship</Typography>
        {!workForm && (
          <Button
            onClick={AddWorkForm}
            disableRipple
            className="flex justify-start p-0 focus:outline-none normal-case text-textLight dark:text-textDark"
          >
            <AddCircleOutlineIcon className="p-0 mr-2" />
            Add a relationship status
          </Button>
        )}
      </Grid>
      {workForm && (
        <form>
          <Grid className="flex flex-col w-full gap-5">
            <RelationStatus/>
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
  );
};

export default Relationship;

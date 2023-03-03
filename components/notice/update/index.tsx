import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTheme } from "next-themes";
import Form from './Form';
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ContentItem } from "../index";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update({ data, setUpdatedData }: ContentItem ) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpenDialog} className="">
          <EditIcon className="text-white" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor:
              currentTheme === "dark" ? "rgb(63 63 70)" : "rgb(203 213 225)",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor:
              currentTheme === "dark" ? "rgb(63 63 70)" : "rgb(20 83 45)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Notice
            </Typography>
          </Toolbar>
        </AppBar>
        <Form data={data} setUpdatedData={setUpdatedData} handleCloseDialog={handleCloseDialog} />
      </Dialog>
    </div>
  );
}

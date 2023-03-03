import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CloudUpload } from "@mui/icons-material";
import { useTheme } from "next-themes";
import Form from './Form';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Upload({setUpdatedData}: {setUpdatedData: Function}) {
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
      <Button
        onClick={handleOpenDialog}
        className="text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
        startIcon={<CloudUpload />}
        variant="contained"
      >
        Upload
      </Button>
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
        <Form setUpdatedData={setUpdatedData} handleCloseDialog={handleCloseDialog} />
      </Dialog>
    </div>
  );
}

import * as React from "react";
import { useTheme } from "next-themes";
import { Box, Dialog } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";
import { AudienceProps } from "../about/work_edu/Work";
import Audience from "../about/Audience";

export default function EditPrivacy() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [workAudience, setWorkAudience] = React.useState<AudienceProps>({
    audience: "Public",
    icon: <PublicIcon fontSize="inherit" />,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          m: 0,
          p: 0,
        }}
      >
        <IconButton
          className="focus:outline-none hover:bg-bgButtonHover dark:hover:bg-bgButtonDarkHover"
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreHorizIcon className="text-end text-textLight dark:text-textDark" />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: "0px 0px 25px 25px rgba(0,0,0,0.2)",
            backgroundColor: currentTheme === "dark" ? "#474849" : "#fff",
            color: currentTheme === "dark" ? "#fff" : "#000",
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleOpenDialog}
          className="hover:bg-bgLightHover dark:hover:bg-bgDarkHover mx-3"
        >
          Edit privacy
        </MenuItem>
      </Menu>
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
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <Audience
          handleClose={handleCloseDialog}
          workAudience={workAudience}
          setWorkAudience={setWorkAudience}
        />
      </Dialog>
    </React.Fragment>
  );
}

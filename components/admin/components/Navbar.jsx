import React, { useContext, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import Cookie from "js-cookie";

import {
  AppBar,
  Button,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme
} from "@mui/material";
import { GlobalTypes } from "../../../store/types";
import { Context } from "../../../store/store";
import { useRouter } from "next/router";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: GlobalTypes.AUTH, payload: {} });
    return router.push("/login");
  };
  return (
    <AppBar
      sx={{
        // position: "static",
        backgroundColor: theme.palette.background.alt,
        boxShadow: "none",
        width: !isNonMobile? "100%" : isSidebarOpen? "calc(100% - 250px)" : "100%",
        
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="/user.jpg"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

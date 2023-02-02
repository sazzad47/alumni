import * as React from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useContext } from "react";
import { Context } from "../../store/store";
import { GlobalTypes } from "../../store/types";
import { useTheme } from "next-themes";

export default function UserMenu({
  boxClass,
  isAccountSubMenu,
}) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let accountSubMenuClass = [
    "auth_sub__menus bg-green-900 dark:bg-zinc-700 text-slate-200",
  ];

  if (isAccountSubMenu) {
    accountSubMenuClass.push("auth_sub__menus__Active");
  } else {
    accountSubMenuClass.push("");
  }

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: GlobalTypes.AUTH, payload: {} });
    return router.push("/");
  };
  return (
    <>
      <nav className="">
        <ul className={boxClass.join(" ")}>
          <li className="">
            <Avatar
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className="cursor-pointer bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            >
              {auth.user?.firstName?.charAt(0)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              id="manage-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  boxShadow: "0px 0px 25px 25px rgba(0,0,0,0.2)",
                  backgroundColor:
                    currentTheme === "dark" ? "rgb(63 63 70)" : "rgb(20 83 45)",
                  color: "white",
                  overflow: "visible",
                  mt: 1,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  router.push("/account/profile");
                }}
                className=""
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/account/settings");
                }}
                className=""
              >
                Settings
              </MenuItem>
              <MenuItem onClick={() => handleLogout()} className="">
                Logout
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>

      {/* <li
        onClick={toggleAccountSubMenu}
        className="menu-item auth_mobile_menu auth_sub__menus__arrows"
      >
        <NavLink href="#" className="nav-item nav-link">
          Account
        </NavLink>
        <ul className={accountSubMenuClass.join(" ")}>
          <li
            onClick={() => {
              setisMenu(false)
            }}
          >
           <Link href="/account/profile"
            >
              Profile
            </Link>
          </li>
          <li
            onClick={() => {
              setisMenu(false)
            }}
          >
           <Link href="/account/settings"
            >
              Settings
            </Link>
          </li>
          <li>
            <a
              onClick={() => {
                handleLogout();
                setisMenu(false);
              }}
            >
              Logout
            </a>{" "}
          </li>
        </ul>
      </li> */}
    </>
  );
}

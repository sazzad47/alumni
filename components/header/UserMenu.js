import * as React from "react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useRouter } from "next/router";
// import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";
import { useContext } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";

export default function UserMenu({ boxClass, toggleClass }) {
  const router = useRouter();
  // const { state, dispatch } = useContext(DataContext);
  // const { auth } = state;
  const [isAccountMenuSubMenu, setAccountMenuSubMenu] = React.useState(false);
  const toggleAccountSubmenu = () => {
    setAccountMenuSubMenu(isAccountMenuSubMenu === false ? true : false);
  };
  let boxAccountClassSubMenu = ["auth_sub__menus"];
  if (isAccountMenuSubMenu) {
    boxAccountClassSubMenu.push("auth_sub__menus__Active");
  } else {
    boxAccountClassSubMenu.push("");
  }
  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    // dispatch({ type: "AUTH", payload: {} });
    // dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };
  return (
    <>
      <nav className="main-nav auth_computer_menu">
        <ul className={boxClass.join(" ")}>
          <li
            onClick={toggleAccountSubmenu}
            className="menu-item auth_sub__menus__arrows"
          >
            <NavLink href="#" className="nav-item nav-link">
              <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}>
                {/* {auth.user?.name.charAt(0)} */}S
              </Avatar>
            </NavLink>
            <ul className={boxAccountClassSubMenu.join(" ")}>
              <li>
                {" "}
                <Link href="/dashboard">
                  {/* <a onClick={toggleClass}>Dashboard</a> */}Dashboard
                </Link>{" "}
              </li>
              <li>
                <Link href="/settings">
                  {/* <a onClick={toggleClass}>Settings</a> */}Settings
                </Link>{" "}
              </li>
              <li>
                <a
                  onClick={() => {
                    handleLogout();
                    toggleClass();
                  }}
                >
                  Logout
                </a>{" "}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <li
        onClick={toggleAccountSubmenu}
        className="menu-item auth_mobile_menu auth_sub__menus__arrows"
      >
        <NavLink href="#" className="nav-item nav-link">
          Account
        </NavLink>
        <ul className={boxAccountClassSubMenu.join(" ")}>
          <li>
            {" "}
            <Link href="/dashboard">
              {/* <a onClick={toggleClass}>Dashboard</a> */}Dashboard
            </Link>{" "}
          </li>
          <li>
            <Link href="/settings">
              {/* <a onClick={toggleClass}>Settings</a> */}Settings
            </Link>{" "}
          </li>
          <li>
            <a
              onClick={() => {
                handleLogout();
                toggleClass();
              }}
            >
              Logout
            </a>{" "}
          </li>
        </ul>
      </li>
    </>
  );
}

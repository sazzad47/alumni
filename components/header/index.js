import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import logo from "../../public/logo.png";
// import { DataContext } from "../../store/GlobalState";
import LoggedRouter from "./LoggedRouter";
import { NavLink } from "./NavLink";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";


const Navbar = () => {
  // const { state } = useContext(DataContext);
  // const { auth } = state;
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system"? systemTheme: theme;
  const [isMenu, setisMenu] = useState(false);
  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }
  const [isApplyMenuSubMenu, setApplyMenuSubMenu] = useState(false);
  const [isCheckingMenuSubMenu, setCheckingMenuSubMenu] = useState(false);
 
  let boxApplyClassSubMenu = ["sub__menus"];
  if (isApplyMenuSubMenu) {
    boxApplyClassSubMenu.push("sub__menus__Active");
  } else {
    boxApplyClassSubMenu.push("");
  }
  let boxCheckingClassSubMenu = ["sub__menus"];
  if (isCheckingMenuSubMenu) {
    boxCheckingClassSubMenu.push("sub__menus__Active");
  } else {
    boxCheckingClassSubMenu.push("");
  }
  return (
    <header className="header_section bg-gray-200 dark:bg-[var(--hero)]">
      <div className="header_content">
        <div className="relative flex items-center justify-center bg-[#364863] w-[40px] h-[40px] rounded-full">
          <Link href="/">
            <Image src="/logo.png" alt="" width={20} height={20} />
          </Link>
        </div>
        <nav className="main-nav d-block">
          <ul className={boxClass.join(" ")}>
            <li onClick={()=> setisMenu(false)} className="menu-item">
              <NavLink
                href="/"
                exact
                className="nav-item nav-link"
              >
                Home
              </NavLink>
            </li>
            <li
              onClick={()=> setisMenu(false)}
              className="menu-item sub__menus__arrows"
            >
              <NavLink href="/activities" className="nav-item nav-link">
                Activities
              </NavLink>
            </li>
            <li
              onClick={()=> setisMenu(false)}
              className="menu-item sub__menus__arrows"
            >
              <NavLink href="/news" className="nav-item nav-link">
                News
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/events"
                className="nav-item nav-link"
              >
                Events
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/members"
                className="nav-item nav-link"
              >
                Members
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/gallery"
                className="nav-item nav-link"
              >
                Gallery
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/about"
                className="nav-item nav-link"
              >
                About
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/contact"
                className="nav-item nav-link"
              >
                Contact
              </NavLink>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item nav-auth-btn">
              {/* {Object.values(auth).length === 0 ? ( */}
              <NavLink
                href="/auth"
                className="nav-item nav-link"
              >
                Login
              </NavLink>
              {/* ) : (
                <LoggedRouter boxClass={boxClass} toggleClass={toggleClass} />
              )} */}
            </li>
          </ul>
        </nav>
        <div className="auth-segment">
          {/* {Object.values(auth).length === 0 ? ( */}
          <div className="flex items-center gap-4">
          <IconButton className="text-black dark:text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
            <Link href="/auth">
              <button className="classic_btn">Login</button>
            </Link>
          </div>
          {/* ) : (
            <LoggedRouter boxClass={boxClass} toggleClass={toggleClass} />
          )} */}
        </div>
        {isMenu === true ? (
          <div className="hidden menubar__button">
            <div className="flex items-center gap-4">
              <IconButton className="text-black dark:text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)} className="text-white">
                <AiOutlineCloseCircle />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden menubar__button">
            <div className="flex items-center gap-4">
            <IconButton className="text-black dark:text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)}>
                <FiAlignRight />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

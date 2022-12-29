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
    boxClass.push("menuq2 bg-gray-300 dark:bg-green-700");
  } else {
    boxClass.push("");
  }
  const [isAboutSubMenu, setAboutSubMenu] = useState(false);
  const [isMembersSubMenu, setMembersSubMenu] = useState(false);
  const [isEventSubMenu, setEventSubMenu] = useState(false);
  const [isSchoolSubMenu, setSchoolSubMenu] = useState(false);

  const toggleAboutSubMenu = () => {
    setAboutSubMenu(!isAboutSubMenu);
    setMembersSubMenu(false);
    setEventSubMenu(false);
    setSchoolSubMenu(false);
  };
  const toggleMembersSubMenu = () => {
    setMembersSubMenu(!isMembersSubMenu);
    setAboutSubMenu(false);
    setEventSubMenu(false);
    setSchoolSubMenu(false);
  };
  const toggleEventSubMenu = () => {
    setEventSubMenu(!isEventSubMenu);
    setMembersSubMenu(false);
    setAboutSubMenu(false);
    setSchoolSubMenu(false);
  };
  const toggleSchoolSubMenu = () => {
    setSchoolSubMenu(!isSchoolSubMenu);
    setAboutSubMenu(false);
    setEventSubMenu(false);
    setMembersSubMenu(false);
  };
 
  let aboutSubMenuClass = ["sub__menus bg-gray-200 dark:bg-green-900 text-black dark:text-white ml-[-1rem]"];
  if (isAboutSubMenu) {
    aboutSubMenuClass.push("sub__menus__Active");
  } else {
    aboutSubMenuClass.push("");
  }
  
  let membersSubMenuClass = ["sub__menus bg-gray-200 dark:bg-green-900 text-black dark:text-white"];
  if (isMembersSubMenu) {
    membersSubMenuClass.push("sub__menus__Active");
  } else {
    membersSubMenuClass.push("");
  }
  let eventSubMenuClass = ["sub__menus bg-gray-200 dark:bg-green-900 text-black dark:text-white"];
  if (isEventSubMenu) {
    eventSubMenuClass.push("sub__menus__Active");
  } else {
    eventSubMenuClass.push("");
  }

  let schoolSubMenuClass = ["sub__menus bg-gray-200 dark:bg-green-900 text-black dark:text-white"];
  if (isSchoolSubMenu) {
    schoolSubMenuClass.push("sub__menus__Active");
  } else {
    schoolSubMenuClass.push("");
  }
  return (
    <header className="text-black dark:text-white header_section bg-gray-200 dark:bg-green-900">
      <div className="header_content">
        <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full">
          <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/">
          <Image src="/logo.png" alt="" width={40} height={40} />
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
              onClick={toggleAboutSubMenu}
              className="menu-item sub__menus__arrows"
            >
              <NavLink href="#" className="nav-item nav-link">
                About
              </NavLink>
              <ul className={aboutSubMenuClass.join(" ")}>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/about/association">
                    Association
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/about/constitution">
                   Constitution
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/about/plan">
                    Plan
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={toggleMembersSubMenu}
              className="menu-item sub__menus__arrows"
            >
              <NavLink href="#" className="nav-item nav-link">
                Members
              </NavLink>
              <ul className={membersSubMenuClass.join(" ")}>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/members/database">
                    Database
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/members/register">
                   Register
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={toggleEventSubMenu} className="menu-item sub__menus__arrows">
              <NavLink
                href="#"
                className="nav-item nav-link"
              >
                Events
              </NavLink>
              <ul className={eventSubMenuClass.join(" ")}>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/events/upcoming">
                    Upcoming
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/events/past">
                   Past
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={()=> setisMenu(false)} className="menu-item ">
              <NavLink
                href="/activities"
                className="nav-item nav-link"
              >
                Activities
              </NavLink>
            </li>
            <li onClick={toggleSchoolSubMenu} className="menu-item sub__menus__arrows">
              <NavLink
                href="#"
                className="nav-item nav-link"
              >
                School
              </NavLink>
              <ul className={schoolSubMenuClass.join(" ")}>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/school/history">
                    History
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/school/current">
                   Current
                  </Link>
                </li>
              </ul>
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
            <Link className="text-slate-900 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-300" href="/auth">
              <button className="classic_btn">Login</button>
            </Link>
          </div>
          {/* ) : (
            <LoggedRouter boxClass={boxClass} toggleClass={toggleClass} />
          )} */}
        </div>
        {isMenu === true ? (
          <div style={{display: "none"}} className="menubar__button">
            <div className="flex items-center gap-4">
              <IconButton className="text-black dark:text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)} className="text-black dark:text-white">
                <AiOutlineCloseCircle className="" />
              </div>
            </div>
          </div>
        ) : (
          <div style={{display: "none"}} className="menubar__button">
            <div className="flex items-center gap-4">
            <IconButton className="text-black dark:text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)} className="text-black dark:text-white">
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

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import LoggedRouter from "./LoggedRouter";
import { NavLink } from "./NavLink";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { Context } from "../../store/store";


const Navbar = () => {
  const { state } = useContext(Context);
  const { auth } = state;
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system"? systemTheme: theme;
  const [isMenu, setisMenu] = useState(false);
 
  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2 bg-green-800 dark:bg-zinc-800 text-slate-200");
  } else {
    boxClass.push("");
  }
  const [isAboutSubMenu, setAboutSubMenu] = useState(false);
  const [isMembersSubMenu, setMembersSubMenu] = useState(false);
  const [isEventSubMenu, setEventSubMenu] = useState(false);
  const [isSchoolSubMenu, setSchoolSubMenu] = useState(false);
  const [isAccountSubMenu, setAccountSubMenu] = useState(false);

  const toggleAboutSubMenu = () => {
    setAboutSubMenu(!isAboutSubMenu);
    setMembersSubMenu(false);
    setEventSubMenu(false);
    setSchoolSubMenu(false);
    setAccountSubMenu(false);
  };
  const toggleMembersSubMenu = () => {
    setMembersSubMenu(!isMembersSubMenu);
    setAboutSubMenu(false);
    setEventSubMenu(false);
    setSchoolSubMenu(false);
    setAccountSubMenu(false);
  };
  const toggleEventSubMenu = () => {
    setEventSubMenu(!isEventSubMenu);
    setMembersSubMenu(false);
    setAboutSubMenu(false);
    setSchoolSubMenu(false);
    setAccountSubMenu(false);
  };
  const toggleSchoolSubMenu = () => {
    setSchoolSubMenu(!isSchoolSubMenu);
    setAboutSubMenu(false);
    setEventSubMenu(false);
    setMembersSubMenu(false);
    setAccountSubMenu(false);
  };
  const toggleAccountSubMenu = () => {
    setAccountSubMenu(!isAccountSubMenu);
    setSchoolSubMenu(false);
    setAboutSubMenu(false);
    setEventSubMenu(false);
    setMembersSubMenu(false);
  };
 
  let aboutSubMenuClass = ["sub__menus bg-green-900 dark:bg-zinc-700 text-slate-200"];
  if (isAboutSubMenu) {
    aboutSubMenuClass.push("sub__menus__Active");
  } else {
    aboutSubMenuClass.push("");
  }
  
  let membersSubMenuClass = ["sub__menus bg-green-900 dark:bg-zinc-700 text-slate-200"];
  if (isMembersSubMenu) {
    membersSubMenuClass.push("sub__menus__Active");
  } else {
    membersSubMenuClass.push("");
  }
  let eventSubMenuClass = ["sub__menus bg-green-900 dark:bg-zinc-700 text-slate-200"];
  if (isEventSubMenu) {
    eventSubMenuClass.push("sub__menus__Active");
  } else {
    eventSubMenuClass.push("");
  }

  let schoolSubMenuClass = ["sub__menus bg-green-900 dark:bg-zinc-700 text-slate-200"];
  if (isSchoolSubMenu) {
    schoolSubMenuClass.push("sub__menus__Active");
  } else {
    schoolSubMenuClass.push("");
  }
  return (
    <header className="header_section z-[1000] w-full max-w-full text-slate-200 bg-green-900 dark:bg-zinc-700">
      <div className="header_content">
        <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full">
          <Link className="text-slate-200 hover:text-slate-300" href="/">
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
                  <Link className="text-slate-200 hover:text-slate-300" href="/about/association">
                    Association
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-200 hover:text-slate-300" href="/about/constitution">
                   Constitution
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-200 hover:text-slate-300" href="/about/plan">
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
                  <Link className="text-slate-200 hover:text-slate-300" href="/members/database">
                    Database
                  </Link>
                </li>
                {Object.keys(auth).length === 0 && <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-200 hover:text-slate-300" href="/members/register">
                   Register
                  </Link>
                </li>}
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
                  <Link className="text-slate-200 hover:text-slate-300" href="/events/upcoming">
                    Upcoming
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-200 hover:text-slate-300" href="/events/past">
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
                  <Link className="text-slate-200 hover:text-slate-300" href="/school/history">
                    History
                  </Link>
                </li>
                <li onClick={()=> setisMenu(false)}>
                  <Link className="text-slate-200 hover:text-slate-300" href="/school/current">
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
            <li className="menu-item nav-auth-btn">
              {Object.values(auth).length === 0 ? (
              <NavLink
                onClick={()=> setisMenu(false)}
                href="/login"
                className="nav-item nav-link"
              >
                Login
              </NavLink>
              ) : (
                <LoggedRouter boxClass={boxClass} setisMenu={setisMenu} toggleAccountSubMenu={toggleAccountSubMenu} isAccountSubMenu={isAccountSubMenu} />
              )}
            </li>
          </ul>
        </nav>
        <div className="auth-segment">
          {Object.values(auth).length === 0 ? (
          <div className="flex items-center gap-4">
          <IconButton className="text-slate-200" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
            <Link className="text-slate-200 " href="/login">
              <button className="classic_btn bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">Login</button>
            </Link>
          </div>
           ) : (
            <div className="flex items-center gap-4">
          <IconButton className="text-slate-200" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <LoggedRouter boxClass={boxClass} setisMenu={setisMenu} />
          </div>
          )}
        </div>
        {isMenu === true ? (
          <div style={{display: "none"}} className="menubar__button">
            <div className="flex items-center gap-4">
              <IconButton className="text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)} className="text-white">
                <AiOutlineCloseCircle className="" />
              </div>
            </div>
          </div>
        ) : (
          <div style={{display: "none"}} className="menubar__button">
            <div className="flex items-center gap-4">
            <IconButton className="text-white" onClick={()=> {
                currentTheme==="dark"? setTheme('light') : setTheme('dark')
              }}>
              <Brightness4Icon />
              </IconButton>
              <div onClick={()=> setisMenu(!isMenu)} className="text-white">
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

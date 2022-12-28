import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiAlignRight, FiXCircle } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import logo from "../../public/logo.png";
// import { DataContext } from "../../store/GlobalState";
import LoggedRouter from "./LoggedRouter";
import { NavLink } from "./NavLink";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  // const { state } = useContext(DataContext);
  // const { auth } = state;
  const [isMenu, setisMenu] = useState(false);
  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }
  const [isApplyMenuSubMenu, setApplyMenuSubMenu] = useState(false);
  const [isCheckingMenuSubMenu, setCheckingMenuSubMenu] = useState(false);
  const toggleApplySubmenu = () => {
    setApplyMenuSubMenu(isApplyMenuSubMenu === false ? true : false);
    setCheckingMenuSubMenu(false);
  };
  const toggleCheckingSubmenu = () => {
    setCheckingMenuSubMenu(isCheckingMenuSubMenu === false ? true : false);
    setApplyMenuSubMenu(false);
  };
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
    <header className="header_section">
      <div className="header_content">
        <div className="">
          <Link href="/">
            <Image src="/logo.png" alt="" width={25} height={25} />
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
            <Brightness4Icon />
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
              <Brightness4Icon />
              <div onClick={()=> setisMenu(!isMenu)} className="text-white">
                <AiOutlineCloseCircle />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden menubar__button">
            <div className="flex items-center gap-4">
              <Brightness4Icon />
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

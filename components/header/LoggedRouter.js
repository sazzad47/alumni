import React from "react";
import UserMenu from "./UserMenu";

const LoggedRouter = ({ boxClass, setisMenu, toggleAccountSubMenu, isAccountSubMenu }) => {
  return (
    <React.Fragment>
      <UserMenu boxClass={boxClass} setisMenu={setisMenu} toggleAccountSubMenu={toggleAccountSubMenu} isAccountSubMenu={isAccountSubMenu} />
    </React.Fragment>
  );
};

export default LoggedRouter;

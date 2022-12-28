import React from "react";
import UserMenu from "./UserMenu";

const LoggedRouter = ({ boxClass, toggleClass }) => {
  return (
    <React.Fragment>
      <UserMenu boxClass={boxClass} toggleClass={toggleClass} />
    </React.Fragment>
  );
};

export default LoggedRouter;

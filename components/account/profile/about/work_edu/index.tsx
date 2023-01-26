import React from "react";
import { Grid } from "@mui/material";
import Work from "./Work";
import College from "./College";
import HighSchool from "./High_School";

const WorkEdu = () => {
  return (
    <Grid className="flex flex-col px-4">
      <Work />
      <College />
      <HighSchool />
    </Grid>
  );
};

export default WorkEdu;

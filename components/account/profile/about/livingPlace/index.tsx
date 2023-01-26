import React from "react";
import { Grid } from "@mui/material";
import CurrentCity from "./CurrentCity";
import HomeTown from "./HomeTown";

const LivingPlace = () => {
  return (
    <Grid className="flex flex-col px-4">
      <CurrentCity />
      <HomeTown />
    </Grid>
  );
};

export default LivingPlace;

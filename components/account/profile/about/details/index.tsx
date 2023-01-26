import React from "react";
import { Grid } from "@mui/material";
import About from "./About";
import Quotes from "./Quotes";

const Details = () => {
  return (
    <Grid className="flex flex-col px-4">
      <About />
      <Quotes />
    </Grid>
  );
};

export default Details;

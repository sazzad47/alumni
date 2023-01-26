import { Grid } from "@mui/material";
import React from "react";
import Biography from "./Biography";
import Expertise from "./Expertise";
import Intro from "./Intro";
import SocialLinks from "./SocialLinks";
import WorkEdu from "./WorkEdu";

const Home = () => {
  return (
    <Grid className="my-5 flex flex-col gap-5 w-full">
        <Intro />
        <WorkEdu/>
        <Expertise/>
        <Biography/>
        <SocialLinks/>
    </Grid>
  );
};

export default Home;

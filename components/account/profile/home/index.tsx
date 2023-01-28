import { Grid } from "@mui/material";
import React from "react";
import Biography from "./Biography";
import Expertise from "./Expertise";
import Intro from "./Intro";
import SocialLinks from "./SocialLinks";
import WorkEdu from "./WorkEdu";

const Home = () => {
  return (
    <Grid className="mt-0 mb-5 flex flex-col w-full gap-3 bg-slate-300 dark:bg-zinc-700 p-4">
        <Intro />
        <WorkEdu/>
        <Expertise/>
        <Biography/>
        <SocialLinks/>
    </Grid>
  );
};

export default Home;

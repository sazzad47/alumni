import { Grid } from "@mui/material";
import React from "react";
import Biography from "./Biography";
import Expertise from "./Expertise";
import Intro from "./Intro";
import SocialLinks from "./SocialLinks";
import Education from "./Education";
import Profession from './Profession';

const Home = () => {
  return (
    <Grid className="mt-0 mb-5 grid grid-cols-1 md:grid-cols-2 w-full gap-5 bg-slate-300 dark:bg-zinc-700 p-4">
        <Intro />
        <Education/>
        <Profession/>
        <Expertise/>
        <Biography/>
        <SocialLinks/>
    </Grid>
  );
};

export default Home;

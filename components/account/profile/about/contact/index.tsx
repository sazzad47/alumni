import React from "react";
import { Grid } from "@mui/material";
import ContactInfo from "./ContactInfo";
import Links from "./Links";

const Contact = () => {
  return (
    <Grid className="flex flex-col px-4">
      <ContactInfo />
      <Links />
    </Grid>
  );
};

export default Contact;

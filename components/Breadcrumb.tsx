import { Grid, Typography } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Breadcrumb = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <Grid className="w-full h-[10vh] p-4 bg-slate-300 dark:bg-zinc-700 flex items-center gap-3">
      <Typography className="p-0 text-lg">Home</Typography>
      <KeyboardDoubleArrowLeftIcon className="text-2xl" />
      <Typography className="p-0 text-lg">{title}</Typography>
      {subtitle && (
        <>
          <KeyboardDoubleArrowLeftIcon className="text-2xl" />
          <Typography className="p-0 text-lg">{subtitle}</Typography>
        </>
      )}
    </Grid>
  );
};

export default Breadcrumb;

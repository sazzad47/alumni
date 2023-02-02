import React from "react";
import { Grid, Typography, Tooltip } from "@mui/material";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { UserData } from "..";

const GeneralInfo = ({ data }: UserData) => {
  return (
    <Grid className="w-full flex items-center justify-center">
      <Grid className="w-full mt-3 flex flex-col items-center justify-start gap-1">
        <Grid className="flex gap-2 items-center">
          <Typography className="p-0 text-2xl">
            {data.firstName} {data.lastName}{" "}
          </Typography>
          <Tooltip title="Honorary member">
            <WorkspacePremiumIcon className="text-lg" />
          </Tooltip>
        </Grid>
        <Typography className="text-lg text-slate-500 dark:text-slate-300">
          Batch: {data.ssc_batch}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;

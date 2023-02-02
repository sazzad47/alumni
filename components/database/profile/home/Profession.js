import { Grid, Typography } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";

const Profession = ({ data }) => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <Grid className="flex flex-col gap-3">
        <ProfessionComponent data={data} />
      </Grid>
    </Grid>
  );
};

const ProfessionComponent = ({ data }) => {
  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <WorkIcon />
        <Typography className="p-0 font-bold">Profession</Typography>
      </Grid>
      <Grid className="flex flex-col gap-2">
        {data.profession.map((item, index) => (
          <Grid key={index} className="w-full md:w-[20rem] min-h-[5rem] flex">
            <Grid className="w-[30%]">
              <Typography className="p-0">
                {item.from}-{item.current ? "present" : item.to}
              </Typography>
            </Grid>
            <Grid className="w-[70%] flex flex-col gap-2">
              <Typography className="p-0 font-bold">{item.position}</Typography>
              <Typography className="p-0">{item.company}</Typography>
              <Typography className="p-0">{item.description}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Profession;

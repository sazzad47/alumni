import React from "react";
import { Grid, Typography } from "@mui/material";
import EditPrivacy from "./EditPrivacy";
import Image from "next/image";
import Link from "next/link";
import MoreMenus from "./MoreMenus";

const Members = () => {
  return (
    <Grid className="flex flex-col p-4 w-full my-5 bg-bgLight dark:bg-bgDark">
      <Grid className="w-full flex justify-between">
        <Typography className="p-0">Members</Typography>
        <EditPrivacy />
      </Grid>
      <Grid className="w-full flex flex-wrap justify-between gap-[1rem] mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
          <Grid
            key={i}
            className="w-[calc(50%-0.5rem)] p-5 border border-opacity-5 flex items-center justify-between gap-3"
          >
            <Link href="/gamma/profiles/123">
              <Grid className="relative w-[5rem] h-[6rem]">
                <Image src="/user.jpg" alt="" fill />
              </Grid>
            </Link>
            <Grid className="flex w-[70%] flex-col items-start">
              <Link href="/gamma/profiles/123">
                <Typography className="p-0 text-textLight dark:text-textDark">
                  Arif Azad
                </Typography>
              </Link>
              <Typography className="p-0 text-sm opacity-[0.7]">
                Software Engineer at Google
              </Typography>
            </Grid>
            <Grid>
              <MoreMenus />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Members;

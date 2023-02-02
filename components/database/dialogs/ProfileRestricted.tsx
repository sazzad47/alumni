import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { UserData } from "../profile";

const ProfileRestricted = ({ data, handleClose }: UserData) => {
  const router = useRouter();
  return (
    <Grid className="w-full h-full flex flex-col p-5">
      <Grid className="w-full flex items-center justify-center">
        <Typography className="pb-2 text-2xl text-slate-900 dark:text-slate-200">
          Access restricted!
        </Typography>
      </Grid>
      <Divider className="w-full my-2" />
      <Grid className="w-full flex justify-center items-center">
        <Typography className="p-0 text-lg text-black dark:text-white">
          Please register to view the profile of {data.firstName}{" "}
          {data.lastName} or login if you already have an account.
        </Typography>
      </Grid>
      <Grid className="w-full pt-3 flex items-center justify-end">
        <Grid className="flex gap-5">
          <Button
            onClick={() => {
              if (handleClose !== undefined) handleClose();
            }}
            className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
          >
            Close
          </Button>
          <Button
            onClick={() => router.push("/members/register")}
            variant="contained"
            className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileRestricted;

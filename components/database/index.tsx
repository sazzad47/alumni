
import { Avatar, Button, Dialog, Grid, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Context, StoreProps } from "../../store/store";
import MessageDialog from "./dialogs/MessageDialog";
import MessageRestricted from "./dialogs/MessageRestricted";
import ProfileRestricted from "./dialogs/ProfileRestricted";
import { UserData } from "./profile";
import SearchBar from "./SearchBar";

export interface User {
  data: {
    _id: string;
    firstName?: string;
    lastName?: string;
    ssc_batch?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    currentLocation?: string;
    education?: {
      school: string;
      current: boolean;
      from: string;
      to: string;
      degree: string;
      description: string;
    }[];
    profession?: {
      position: string;
      company: string;
      description: string;
      current: boolean;
      from: string;
      to: string;
    }[];
    expertise?: string;
    biography?: string;
    socialLinks?: { username: string; domain: string }[];
    status?: string;
    subscription?: string;
    email: string;
    role?: string;
    avatar?: string;
    root?: boolean;
    uploadedByAdmin?: boolean;
  }[];
}
const Database = ({ data }: User) => {
  return (
    <Grid className="w-full flex flex-col gap-5">
      <Grid className="w-full md:w-[20rem] block ml-auto">
        <SearchBar />
      </Grid>

      <Grid className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        {data.map((user, i) => (
          <ProfileCard key={i} data={user} />
        ))}
      </Grid>
    </Grid>
  );
};

const ProfileCard = ({ data }: UserData) => {
  const router = useRouter();
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState<boolean>(false);
  const initState = {profileRestriction: false, messageRestriction: false, messageDialog: false};
  const [dialogs, setDialogs] = useState<{profileRestriction: boolean, messageRestriction: boolean, messageDialog: boolean}>(initState)
 
  const showProfile = () => {
    if (auth?.token) {
      router.push(
        `${
          auth?.user?.id === data._id
            ? "/account/profile"
            : `/members/profiles?id=${data._id}`
        }`
      )
    } else {
      setDialogs({...dialogs, profileRestriction: true})
      setOpen(true);
    }
  };
  const sendMessage = () => {
    if (auth?.token) {
      setDialogs({...dialogs, messageDialog: true})
      setOpen(true);
    } else {
      setDialogs({...dialogs, messageRestriction: true})
      setOpen(true);
    }
  };
  const handleClose = () => {
    setDialogs(initState);
    setOpen(false);
  };
  return (
    <Grid className="h-[15rem] p-2 bg-slate-300 dark:bg-zinc-700">
      <Grid className="w-full flex flex-col gap-2 items-center justify-between">
        <Avatar src={data.avatar} className="w-[7rem] h-[7rem]" />
        <Typography className="p-0 text-xl">
          {data.firstName} {data.lastName}
        </Typography>
        <Typography className="p-0 text-sm">Batch: {data.ssc_batch}</Typography>
        <Grid className="w-full flex justify-between items-center">
          <Button
            fullWidth={data.uploadedByAdmin}
            onClick={showProfile}
            variant="contained"
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
          >
            Profile
          </Button>
          {!data.uploadedByAdmin && <Button
            onClick={sendMessage}
            variant="contained"
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
          >
            Message
          </Button>}
        </Grid>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: currentTheme === "dark" ? "#474849" : "#fff",
              width: "25rem",
              minHeight: "12rem",
            },
          }}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          {dialogs.profileRestriction && <ProfileRestricted data={data} handleClose={handleClose} />}
          {dialogs.messageRestriction && <MessageRestricted data={data} handleClose={handleClose} />}
          {dialogs.messageDialog && <MessageDialog data={data} handleClose={handleClose} />}
        </Dialog>
      </Grid>
    </Grid>
  );
};



export default Database;

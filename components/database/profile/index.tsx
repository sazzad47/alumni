import React, { useState } from "react";
import { Grid, Avatar, Button } from "@mui/material";

import Home from "./home";
import GeneralInfo from "./home/GeneralInfo";
import SendMessage from "./SendMessage";
import MessageIcon from "@mui/icons-material/Message";

export interface UserData {
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
  };
  handleClose?: () => void;
  messageForm?: boolean;
  setMessageForm?: Function;
}
const Profile = ({ data }: UserData) => {
  const [messageForm, setMessageForm] = useState<boolean>(false);

  return (
    <Grid container className="w-full flex flex-col">
      <Grid
        item
        className="w-full flex flex-col items-center justify-center relative p-5"
      >
        <Grid className="relative w-[150px] h-[150px]">
          <Avatar src={data.avatar} className="w-full h-full" />
        </Grid>
        <Grid className="w-full flex flex-col md:flex-row items-start md:items-center relative">
          <GeneralInfo data={data} />
          {!data.uploadedByAdmin && (
            <>
              <Grid className="hidden md:block absolute right-0 mt-3">
                <Button
                  onClick={() => setMessageForm(true)}
                  variant="contained"
                  startIcon={<MessageIcon />}
                  className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
                >
                  Message
                </Button>
              </Grid>
              <Grid className="mt-3 w-full flex md:hidden justify-end">
                <Button
                  onClick={() => setMessageForm(true)}
                  variant="contained"
                  startIcon={<MessageIcon />}
                  className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
                >
                  Message
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <SendMessage
          data={data}
          messageForm={messageForm}
          setMessageForm={setMessageForm}
        />
      </Grid>
      <Grid item className="w-full px-5">
        <Home data={data} />
      </Grid>
    </Grid>
  );
};

export default Profile;

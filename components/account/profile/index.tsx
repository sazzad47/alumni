import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  Button,
  Dialog,
  Divider,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Home from "./home";
import { Context, StoreProps } from "../../../store/store";
import { GlobalTypes } from "../../../store/types";
import { patchData } from "../../../utils/fetchData";
import { imageUpload } from "../../../utils/imageUpload";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "next-themes";
import Image from "next/image";
import GeneralInfo from "./home/GeneralInfo";
import SendMessage from "./SendMessage";
import MessageIcon from '@mui/icons-material/Message';

const Profile = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const [messageForm, setMessageForm] = useState<boolean>(false);
  const profilePhotoInput = useRef<HTMLInputElement>(null);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<any | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setPhoto(newPhoto);
      setPhotoURL(newPhotoURL);
      handleClickOpen();
    }
  };

  const updatePhoto = async () => {
    let media: any;
    dispatch({ type: GlobalTypes.LOADING, payload: { loading: true } });

    if (photo) media = await imageUpload([photo]);

    patchData(
      "user",
      {
        avatar: media[0],
      },
      auth?.token
    ).then((res) => {
      if (res.err) {
        console.log("error", res.err);
      }

      dispatch({
        type: GlobalTypes.AUTH,
        payload: {
          token: auth?.token,
          user: res.user,
        },
      });
    });
    dispatch({ type: GlobalTypes.LOADING, payload: { loading: false } });
    handleClose();
  };
  useEffect(() => {
    if (auth?.user) setPhotoURL(auth.user.avatar);
  }, [auth?.user]);

  return (
    <Grid container className="w-full flex flex-col">
      <Grid
        item
        className="w-full flex flex-col items-center justify-center relative p-5"
      >
        <Grid className="relative w-[150px] h-[150px]">
          <Avatar
            onClick={handleChooseProfilePhoto}
            src={photoURL}
            className="w-full h-full cursor-pointer"
          />
          <input
            ref={profilePhotoInput}
            hidden
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
          <IconButton
            onClick={handleChooseProfilePhoto}
            className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[40px] h-[40px] absolute left-[105px] bottom-[-1px] text-slate-200 z-[20]"
          >
            <CameraAltIcon />
          </IconButton>
        </Grid>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: currentTheme === "dark" ? "#474849" : "#fff",
              width: "30rem",
              height: "27rem",
              maxHeight: "30rem",
              overflow: "hidden",
              transition: "height width var(--speed) ease",
            },
          }}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <Grid className="w-full h-full flex flex-col px-4">
            <Grid className="w-full h-[10%] flex items-center justify-center">
              <Typography className="p-0 text-lg text-slate-900 dark:text-slate-200">
                Preview
              </Typography>
            </Grid>
            <Divider className="w-full" />
            <Grid className="w-full h-[70%] relative">
              <Image src={photoURL} alt="" fill />
            </Grid>
            <Grid className="w-full h-[20%] flex items-center justify-end">
              <Grid className="flex gap-5">
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={updatePhoto}
                  variant="contained"
                  className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
                >
                  {loading ? (
                    <ThreeDots
                      height="30"
                      width="30"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    <Typography>Save</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Grid className="w-full flex flex-col md:flex-row items-start md:items-center relative">
          <GeneralInfo />
          <Grid className="hidden md:block absolute right-0 mt-3">
            <Button onClick={()=> setMessageForm(true)} variant="contained" startIcon={<MessageIcon/>} className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">Message</Button>
          </Grid>
          <Grid className="mt-3 w-full flex md:hidden justify-end">
            <Button onClick={()=> setMessageForm(true)} variant="contained" startIcon={<MessageIcon/>} className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">Message</Button>
          </Grid>
        </Grid>
       <SendMessage messageForm = {messageForm} setMessageForm = {setMessageForm} />
      </Grid>
      <Grid item className="w-full px-5">
        <Home />
      </Grid>
    </Grid>
  );
};

export default Profile;

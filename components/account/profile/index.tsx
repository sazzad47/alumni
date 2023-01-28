import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Dialog,
  Divider,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Home from "./home";
import { Context, StoreProps } from "../../../store/store";
import { GlobalTypes } from "../../../store/types";
import { patchData } from "../../../utils/fetchData";
import { imageUpload } from '../../../utils/imageUpload'
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "next-themes";
import Image from "next/image";

const Profile = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
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
      let newPhoto = e.target.files[0]
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setPhoto(newPhoto)
      setPhotoURL(newPhotoURL);
      handleClickOpen()
    }
  };
  
  const updatePhoto = async () => {
    let media: any;
    dispatch({type: GlobalTypes.LOADING, payload: {loading: true}})

    if(photo) media = await imageUpload([photo])
   
    patchData('user', {
        avatar: media[0]
    }, auth?.token).then(res => {
        if(res.err) {
          console.log('error', res.err)
        }

        dispatch({type: GlobalTypes.AUTH, payload: {
            token: auth?.token,
            user: res.user
        }})
        
    })
    dispatch({type: GlobalTypes.LOADING, payload: {loading: false}})
    handleClose()
}
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
            <Typography className="p-0 text-lg text-slate-900 dark:text-slate-200">Preview</Typography>
          </Grid>
          <Divider className="w-full"/>
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
              // disabled={!data}
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
        <GeneralInfo />
      </Grid>
      <Grid item className="w-full px-5">
        <Home />
      </Grid>
    </Grid>
  );
};

const GeneralInfo = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const prevFirstName = auth?.user?.firstName;
  const prevLastName = auth?.user?.lastName;
  const prevSSC_Batch = auth?.user?.ssc_batch;
  const [inputForm, setInputForm] = useState<boolean>(false);
  const initState = { firstName: "", lastName: "", ssc_batch: "" };
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    ssc_batch: string;
  }>(initState);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await patchData("user", userData, auth?.token);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    if (res.err) return setErrorMessage([res.err]);
    dispatch({
      type: GlobalTypes.AUTH,
      payload: {
        token: auth?.token,
        user: res.user,
      },
    });
    setInputForm(false);
  };

  useMemo(() => {
    if (!focused && !inputForm && !prevFirstName) {
      setErrorMessage(["Please add your biography."]);
    } else if (focused) {
      setErrorMessage([]);
    }
  }, [focused, inputForm, prevFirstName]);

  return (
    <Grid className="w-full flex items-center justify-center">
      {!inputForm && (
        <Grid className="w-full mt-3 flex flex-col items-center justify-start gap-1">
          <Grid className="flex gap-2 items-center">
            <Typography className="p-0 text-2xl">
              {prevFirstName} {prevLastName}{" "}
            </Typography>
            <Tooltip title="Honorary member">
              <WorkspacePremiumIcon className="text-lg" />
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => setInputForm(true)}
                disableRipple
                className="text-inherit flex justify-start p-0 focus:outline-none normal-case"
              >
                <EditIcon className="p-0" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Typography className="text-lg text-slate-500 dark:text-slate-300">
            Batch: {prevSSC_Batch}
          </Typography>
        </Grid>
      )}

      {errorMessage.length !== 0 && (
        <Grid className="w-full md:w-[20rem] p-4 my-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
          {errorMessage.map((error, i) => (
            <Grid key={i} className="flex items-center gap-2">
              <ErrorIcon />
              <Typography className="p-0 text-sm">{error}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
      {inputForm && (
        <Form
          setInputForm={setInputForm}
          data={userData}
          setData={setUserData}
          setFocused={setFocused}
          handleSubmit={handleSubmit}
          loading={loading}
          prevFirstName={prevFirstName}
          prevLastName={prevLastName}
          prevSSC_Batch={prevSSC_Batch}
        />
      )}
    </Grid>
  );
};

const Form = ({
  setInputForm,
  data,
  setData,
  setFocused,
  handleSubmit,
  loading,
  prevFirstName,
  prevLastName,
  prevSSC_Batch
}: {
  setInputForm: Function;
  data: {firstName: string, lastName: string, ssc_batch: string};
  setData: Function;
  setFocused: Function;
  handleSubmit: Function;
  loading?: boolean;
  prevFirstName?: string;
  prevLastName?: string;
  prevSSC_Batch?: string;
}) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (auth?.user) setData({...data, firstName: prevFirstName, lastName: prevLastName, ssc_batch: prevSSC_Batch});
  }, [auth?.user]);

  return (
    <form className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <TextField
          multiline
          autoFocus
          onChange={(e) => setData({...data, firstName: e.target.value})}
          value={data.firstName}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
            label: {
              color: currentTheme === "dark" ? "rgb(214 211 209)" : "",
            },
            "& label.Mui-focused": {
              color:
                currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            },
            "& .MuiOutlinedInput-root": {
              color: currentTheme === "dark" ? "white" : "black",
              "& fieldset": {
                color: "white",
                borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            },
          }}
          label="First Name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          autoFocus
          onChange={(e) => setData({...data, lastName: e.target.value})}
          value={data.lastName}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
            label: {
              color: currentTheme === "dark" ? "rgb(214 211 209)" : "",
            },
            "& label.Mui-focused": {
              color:
                currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            },
            "& .MuiOutlinedInput-root": {
              color: currentTheme === "dark" ? "white" : "black",
              "& fieldset": {
                color: "white",
                borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            },
          }}
          label="Last Name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          autoFocus
          onChange={(e) => setData({...data, ssc_batch: e.target.value})}
          value={data.ssc_batch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
            label: {
              color: currentTheme === "dark" ? "rgb(214 211 209)" : "",
            },
            "& label.Mui-focused": {
              color:
                currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            },
            "& .MuiOutlinedInput-root": {
              color: currentTheme === "dark" ? "white" : "black",
              "& fieldset": {
                color: "white",
                borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            },
          }}
          label="SSC Batch"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />

        <Grid className="w-full md:w-[20rem] flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                setInputForm(false);
                setData("");
              }}
              className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={!data}
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
    </form>
  );
};
export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from "@mui/icons-material/Error";
import { UserData } from "../profile";
import { Context, StoreProps } from "../../../store/store";
import { GlobalTypes } from "../../../store/types";
import { postData } from "../../../utils/fetchData";
import { useTheme } from "next-themes";
import { ThreeDots } from "react-loader-spinner";

const MessageDialog = ({ data, handleClose }: UserData) => {
  const { dispatch } = useContext(Context) as StoreProps;
  const initState = { fullName: "", email: "", ssc_batch: "", message: "", userEmail: data.email };
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
    ssc_batch: string;
    message: string;
  }>(initState);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState(false);


  const handleOpenToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await postData("user/message", userData);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    if (res.err) return setErrorMessage([res.err]);
    if (handleClose !== undefined) handleClose();
      handleOpenToast();
      setUserData(initState);
  };
  
  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Grid className="w-full h-full flex flex-col p-5">
      <Grid className="w-full flex items-center justify-center">
        <Typography className="pb-2 text-2xl text-slate-900 dark:text-slate-200">
          Send a message
        </Typography>
      </Grid>
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
      <Form 
      handleClose={handleClose}
      data={userData}
      setData={setUserData}
      setFocused={setFocused}
      handleSubmit={handleSubmit}
      />
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message="Message sent successfully"
        action={action}
      />
    </Grid>
  );
};

const Form = ({
  handleClose,
  data,
  setData,
  setFocused,
  handleSubmit,
}: {
  handleClose?: ()=> void;
  data: { fullName: string; email: string; ssc_batch: string; message: string };
  setData: Function;
  setFocused: Function;
  handleSubmit: Function;
}) => {
  const { state } = useContext(Context) as StoreProps;
  const { loading } = state;
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <form className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <TextField
          multiline
          autoFocus
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          value={data.fullName}
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
          type="text"
          label="Your full name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          type="email"
          multiline
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
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
          label="Email"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          onChange={(e) => setData({ ...data, ssc_batch: e.target.value })}
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
        <TextField
          multiline
          minRows={5}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          value={data.message}
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
          type="text"
          label="Message"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />

        <Grid className="w-full md:w-[20rem] flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                if (handleClose !== undefined) handleClose();
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
                <Typography>Send</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageDialog;

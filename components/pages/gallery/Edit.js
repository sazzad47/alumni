import {
  Grid,
  Button,
  Dialog,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Tooltip,
  Checkbox,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { ThreeDots } from "react-loader-spinner";
import ErrorIcon from "@mui/icons-material/Error";
import { imageUpload } from "../../../utils/imageUpload";
import { patchData } from "../../../utils/fetchData";
import { useTheme } from "next-themes";
import { Context } from "../../../store/store";
import { GlobalTypes } from "../../../store/types";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CloudUpload } from "@mui/icons-material";

const Edit = ({ item, setData }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Grid className="text-white">
      <Tooltip title="Edit">
        <IconButton onClick={handleOpenDialog} className="">
          <EditIcon className="text-white" />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor:
              currentTheme === "dark" ? "rgb(63 63 70)" : "rgb(203 213 225)",

            width: "25rem",
            minHeight: "12rem",
          },
        }}
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <UpdateDialog
          item={item}
          setData={setData}
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </Grid>
  );
};

const UpdateDialog = ({ item, setData, handleClose }) => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const initState = { file: "", caption: "", addToHome: false };
  const [userData, setUserData] = useState(item);
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let media;
    setLoading(true);

    if (userData.file) media = await imageUpload([userData.file]);
    const res = await patchData(
      `admin/media/${item._id}`,
      { ...userData, file: userData.file ? media[0] : "" },
      auth.token
    );
    setLoading(false);
    if (res.err) return setErrorMessage([res.err]);
    setData(res.content);
    dispatch({
      type: GlobalTypes.NOTIFY,
      payload: { notify: true, msg: "Updated successfully" },
    });
    if (handleClose !== undefined) handleClose();
    setUserData(initState);
  };

  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  return (
    <Grid className="w-full h-full flex flex-col p-5">
      <Grid className="w-full flex flex-col items-center justify-center">
        <Typography className="pb-2 text-lg md:text-2xl text-black dark:text-slate-200">
          Update
        </Typography>
        <Typography className="p-0 text-sm text-zinc-700 dark:text-green-300">
          Let your content beautify your design.
        </Typography>
      </Grid>
      {errorMessage.length !== 0 && (
        <Grid className="w-full p-4 my-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
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
        loading={loading}
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
  loading,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const profilePhotoInput = useRef(null);
  const [photoURL, setPhotoURL] = useState(data.file);

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  const handleFile = (e) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setData({ ...data, file: newPhoto });
      setPhotoURL(newPhotoURL);
    }
  };
 console.log('data', data)
  return (
    <form className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        {photoURL !== null && (
          <Tooltip title="Close">
            <IconButton
              onClick={() => setPhotoURL(null)}
              className="text-white absolute right-5 top-[6rem] z-[10000]"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        )}
        <Grid
          onClick={handleChooseProfilePhoto}
          className="relative bg-slate-500 dark:bg-zinc-600 z-[10] w-full cursor-pointer h-[10rem] flex items-center justify-center"
        >
          {photoURL !== null && <Image src={photoURL} alt="" fill />}
          {photoURL === null && (
            <Avatar className="bg-bgButton dark:bg-bgButtonDark ">
              <CloudUpload />
            </Avatar>
          )}
          <input
            ref={profilePhotoInput}
            hidden
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </Grid>
        <TextField
          multiline
          onChange={(e) => setData({ ...data, caption: e.target.value })}
          value={data.caption}
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
          label="Caption"
          className="w-full rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <Grid className="w-full flex items-center justify-start">
          <Checkbox
            onChange={(e) => setData({ ...data, addToHome: e.target.checked })}
            checked={data.addToHome}
            sx={{
              color:
                currentTheme === "dark" ? "rgb(120 113 108)" : "rgb(21 128 61)",
              padding: 0,
              "&.Mui-checked": {
                color:
                  currentTheme === "dark"
                    ? "rgb(120 113 108)"
                    : "rgb(21 128 61)",
              },
            }}
          />
          <Typography className="p-0 pl-2">Add to home gallery</Typography>
        </Grid>
        <Grid className="w-full flex justify-end ">
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
              disabled={!data.caption || !photoURL}
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
                <Typography>Update</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Edit;

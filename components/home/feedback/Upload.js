import { Grid, Button, Dialog, Typography, TextField, Avatar } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CloudUpload } from '@mui/icons-material';
import { ThreeDots } from 'react-loader-spinner';
import ErrorIcon from "@mui/icons-material/Error";
import { imageUpload } from '../../../utils/imageUpload';
import { postData } from '../../../utils/fetchData';
import { useTheme } from 'next-themes';
import { Context } from '../../../store/store';
import { GlobalTypes } from '../../../store/types';

const Upload = ({setData}) => {
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
    <Grid className='text-white'>
        <Button onClick={handleOpenDialog} className='text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600' startIcon={<CloudUpload/>} variant="contained">Upload</Button>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor:
                currentTheme === "dark"
                  ? "rgb(63 63 70)"
                  : "rgb(203 213 225)",

              width: "25rem",
              minHeight: "12rem",
            },
          }}
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <UploadDialog setData={setData} handleClose={handleCloseDialog} />
        </Dialog>
    </Grid>
  )
}

const UploadDialog = ({setData, handleClose }) => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const initState = { avatar: "", name: "", profession: "", comment: "" };
  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
 


  const handleSubmit = async () => {
    let media;
    setLoading(true);

    if (userData.avatar) media = await imageUpload([userData.avatar]);
      const res = await postData("admin/reviews", {...userData, avatar: userData.avatar? media[0]: ""}, auth.token);
      setLoading(false);
      if (res.err) return setErrorMessage([res.err]);
      setData(res.content)
      dispatch({
        type: GlobalTypes.NOTIFY,
        payload: { notify: true, msg: "Uploaded successfully" },
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
          Uplaod a Review
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
  const [photoURL, setPhotoURL] = useState(null);

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  const handleFile = (e) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setData({...data, avatar: newPhoto});
      setPhotoURL(newPhotoURL);
    }
  };

  return (
    <form className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <Grid className='w-full flex items-center justify-center'>

      <Avatar
            onClick={handleChooseProfilePhoto}
            src={photoURL}
            className="w-[7rem] h-[7rem] cursor-pointer"
          />
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
          autoFocus
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
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
          label="Full Name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          type="text"
          multiline
          onChange={(e) => setData({ ...data, profession: e.target.value })}
          value={data.profession}
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
          label="Profession"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          onChange={(e) => setData({ ...data, comment: e.target.value })}
          value={data.comment}
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
          label="Comment"
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
              disabled={!data.name || !data.profession || !data.comment}
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
                <Typography>Upload</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Upload
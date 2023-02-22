import { Grid, Button, Dialog, useTheme, Typography, TextField, Avatar } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CloudUpload } from '@mui/icons-material';
import { Context } from '../../../../store/store';
import { ThreeDots } from 'react-loader-spinner';
import ErrorIcon from "@mui/icons-material/Error";
import { imageUpload } from '../../../../utils/imageUpload';
import { GlobalTypes } from '../../../../store/types';
import { postData } from '../../../../utils/fetchData';

const Upload = ({setGetData}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    
    const handleOpenDialog = () => {
        setOpen(true);
      };
    const handleCloseDialog = () => {
        setOpen(false);
      };
  return (
    <Grid className='text-white'>
        <Button onClick={handleOpenDialog} className='text-white' startIcon={<CloudUpload/>} variant="contained">Upload</Button>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "rgb(159 18 57)",
              color: theme.palette.secondary[100],
              width: "25rem",
              minHeight: "12rem",
            },
          }}
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <UploadDialog setGetData={setGetData} handleClose={handleCloseDialog} />
        </Dialog>
    </Grid>
  )
}

const UploadDialog = ({setGetData, handleClose }) => {
  const { dispatch } = useContext(Context);
  const initState = { avatar: "", firstName: "", lastName: "", ssc_batch: "", email: "" };
  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
 


  const handleSubmit = async () => {
    let media;
    dispatch({ type: GlobalTypes.LOADING, payload: { loading: true } });

    if (userData.avatar) media = await imageUpload([userData.avatar]);
      const res = await postData("members/uploads", {...userData, avatar: userData.avatar? media[0]: ""});
      dispatch({ type: GlobalTypes.LOADING, payload: false });
      if (res.err) return setErrorMessage([res.err]);
      setGetData(prevState => !prevState );
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
      <Grid className="w-full flex items-center justify-center">
        <Typography className="pb-2 text-lg md:text-2xl text-slate-200">
          Upload a Member
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
}) => {
  const { state } = useContext(Context);
  const { loading } = state;
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
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          value={data.firstName}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
          
            "& label.Mui-focused": {
              color:
                "rgb(214 211 209)",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                color: "white",
    
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  "rgb(214 211 209)"
              },
            },
          }}
          type="text"
          label="First Name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          type="text"
          multiline
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          value={data.lastName}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
          
            "& label.Mui-focused": {
              color:
                "rgb(214 211 209)",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                color: "white",
    
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  "rgb(214 211 209)"
              },
            },
          }}
          label="Last Name"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          onChange={(e) => setData({ ...data, ssc_batch: e.target.value })}
          value={data.ssc_batch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
          
            "& label.Mui-focused": {
              color:
                "rgb(214 211 209)",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                color: "white",
    
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  "rgb(214 211 209)"
              },
            },
          }}
          label="SSC Batch"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />
        <TextField
          multiline
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
          
            "& label.Mui-focused": {
              color:
                "rgb(214 211 209)",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                color: "white",
    
              },
              "&:hover fieldset": {
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  "rgb(214 211 209)"
              },
            },
          }}
          label="Create a username"
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
              disabled={!data.firstName || !data.lastName || !data.ssc_batch}
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
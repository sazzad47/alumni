import {
  Grid,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { GlobalTypes } from "../../store/types";
import { Context } from "../../store/store";
import { ThreeDots } from "react-loader-spinner";
import { imageUpload } from "../../utils/imageUpload";
import { patchData } from "../../utils/fetchData";

const Logo = ({handleCloseDialog, data, setData}) => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
 
  const [logo, setLogo] = useState(data)
 
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    let media;
    setLoading(true);

    if (logo) media = await imageUpload([logo]);
      const res = await patchData("admin/logo", {file: media[0]}, auth.token);
      setLoading(false);
      if (res.err) return setErrorMessage([res.err]);
      setData(res.content)
      dispatch({
        type: GlobalTypes.NOTIFY,
        payload: { notify: true, msg: "Updated successfully" },
      });
      if (handleCloseDialog !== undefined) handleCloseDialog();
   
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
        Update Logo
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
    handleClose={handleCloseDialog}
    data={logo}
    setData={setLogo}
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

  const profilePhotoInput = useRef(null);
  const [photoURL, setPhotoURL] = useState(data);

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  const handleFile = (e) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setData(newPhoto);
      setPhotoURL(newPhotoURL);
    }
  };

  return (
    <form className="w-full pt-3">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <Grid className='w-full flex items-center justify-center'>
      <Avatar
            onClick={handleChooseProfilePhoto}
            src={photoURL}
            className="w-[7rem] h-[7rem] cursor-pointer"
          />
          <input
            ref={profilePhotoInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            hidden
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </Grid>
        <Grid className="w-full flex justify-end mt-3">
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
                <Typography>Update</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default Logo;




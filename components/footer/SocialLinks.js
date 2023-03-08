import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../utils/fetchData";
import { GlobalTypes } from "../../store/types";
import { Context } from "../../store/store";
import { ThreeDots } from "react-loader-spinner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SocialLinks = ({handleCloseDialog, data, setData}) => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
 
  const [socialLinks, setSocialLinks] = useState(data)
 
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
   
    const res = await patchData("admin/socialLinks", { socialLinks }, auth?.token);
    if (res.err) return (
      <>
       {setErrorMessage([res.err])}
       {setLoading(false)}
      </>
    )
    setData(res.content.socialLinks);
    setLoading(false);
    handleCloseDialog();
    dispatch({
      type: GlobalTypes.NOTIFY,
      payload: { notify: true, msg: "Updated successfully" },
    });
   
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
          Update Social Links
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
        handleCloseDialog={handleCloseDialog}
        data={socialLinks}
        setData={setSocialLinks}
        setFocused={setFocused}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Grid>
  );
};


const Form = ({
  handleCloseDialog,
  data,
  setData,
  setFocused,
  handleSubmit,
  loading,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleChange = (event, index)=> {
    let newData = [...data];
    newData[index][event.target.name] = event.target.value;
    setData(newData)
  }
  
  const addMore = ()=> {
    let object = {
      username: '',
      domain: ''
    }
    setData([...data, object])
  }
  
  const deleteField = (index) => {
    let updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };


  return (
    <Grid className="">
      <form>
       
        <Grid className="flex flex-col gap-5">
        {data?.map((item, index)=> (
               <Grid key={index} className="flex flex-col w-full gap-2">
                 <Grid className="w-full flex justify-end">
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteField(index)}
                  className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1 text-black dark:text-white"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
               <FormControl>
                 <InputLabel id="demo-simple-select-label" sx={{
                    
                    color: currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                     "&.Mui-focused": {
                       color: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                     },
                 
                 }} >Social Media</InputLabel>
                 <Select
                   autoFocus
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   name="domain"
                   value={item.domain}
                   onChange={(event)=> handleChange(event, index)}
                   onFocus={() => setFocused(true)}
                   onBlur={() => setFocused(false)}
                   
                   sx={{
                    color: currentTheme === "dark" ? "white" : "black",
                     label: {
                       color: "darkred",
                       "&.Mui-focused": {
                         color: "darkred",
                       },
                     },
                     '.MuiOutlinedInput-notchedOutline': {
                      color: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                       borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
                     },
                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                       color: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                       borderColor: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                     },
                     '&:hover .MuiOutlinedInput-notchedOutline': {
                      color: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                       borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
                     },
                     '.MuiSvgIcon-root ': {
                       fill: currentTheme === "dark"
                       ? "rgb(214 211 209)"
                       : "rgb(21 128 61)",
                     },
                     
                   }}
                   inputProps={{
                    MenuProps: {
                        MenuListProps: {
                            sx: {
                                backgroundColor: currentTheme === "dark"
                                ? "rgb(63 63 70)"
                                : "rgb(212 212 216)",
                                color: currentTheme === "dark"
                                ? "white"
                                : "black",
                            }
                        }
                    }
                }}
                   label="Social media"
                   className="rounded-md"
                 >
                   <MenuItem value="https://www.facebook.com/">Facebook</MenuItem>
                   <MenuItem value="https://www.instagram.com/">Instagram</MenuItem>
                   <MenuItem value="https://www.linkedin.com/">LinkedIn</MenuItem>
                   <MenuItem value="https://twitter.com/">Twitter</MenuItem>
                   <MenuItem value="https://www.youtube.com/">Youtube</MenuItem>
                 </Select>
               </FormControl>
               <TextField
                 multiline
                 onChange={(event)=> handleChange(event, index)}
                 name="username"
                 value={item.username}
                 onFocus={() => setFocused(true)}
                 onBlur={() => setFocused(false)}
                 sx={{
                   label: {
                     color: currentTheme === "dark" ? "rgb(214 211 209)" : "",
                   },
                   "& label.Mui-focused": {
                     color:
                       currentTheme === "dark"
                         ? "rgb(214 211 209)"
                         : "rgb(21 128 61)",
                   },
                   "& .MuiOutlinedInput-root": {
                     color: currentTheme === "dark" ? "white" : "black",
                     "& fieldset": {
                       color: "white",
                       borderColor:
                         currentTheme === "dark" ? "rgb(120 113 108)" : "",
                     },
                     "&:hover fieldset": {
                       borderColor:
                         currentTheme === "dark" ? "rgb(168 162 158)" : "",
                     },
                     "&.Mui-focused fieldset": {
                       borderColor:
                         currentTheme === "dark"
                           ? "rgb(214 211 209)"
                           : "rgb(21 128 61)",
                     },
                   },
                 }}
                 placeholder="Username"
                 label="Username"
                 className="rounded-md"
               />
               </Grid>
              ))}
         
          <Button
            onClick={addMore}
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            className="w-[10rem] text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 focus:outline-none normal-case"
          >
            
            Add another link
          </Button>

          <Grid className="w-full flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  handleCloseDialog();
                  setData([
                    {username: '', domain: ''}
                  ]);
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
    </Grid>
  );
};
export default SocialLinks;




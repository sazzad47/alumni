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
import React, { useContext, useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../../../utils/fetchData";
import { GlobalTypes } from "../../../../store/types";
import { Context } from "../../../../store/store";
import { ThreeDots } from "react-loader-spinner";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitterSquare, FaYoutube } from 'react-icons/fa'


const SocialLinks = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">    
        <SocialLinksInfo />
    </Grid>
  );
};

const SocialLinksInfo = () => {
  const { state, dispatch } = useContext(Context);
  const { auth, loading } = state;
  const prevData = auth?.user?.socialLinks;
  const [inputForm, setInputForm] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    {username: '', domain: ''}
  ])
 
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  
  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await patchData("user", { socialLinks }, auth?.token);
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
    if (!focused && !inputForm && !prevData.length) {
      setErrorMessage(["Please add your social links."]);
    } else if (focused) {
      setErrorMessage([]);
    }
  }, [focused, inputForm, prevData]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <RssFeedIcon />
        <Typography className="p-0 font-bold">Social Links</Typography>
        {!inputForm && (
          <Tooltip title="Edit">
            <IconButton
              onClick={() => setInputForm(true)}
              disableRipple
              className="text-inherit flex justify-start p-0 focus:outline-none normal-case"
            >
              <EditIcon className="p-0 mr-2" />
            </IconButton>
          </Tooltip>
        )}
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
      {inputForm ? (
        <Form
          setInputForm={setInputForm}
          data={socialLinks}
          setData={setSocialLinks}
          setFocused={setFocused}
          handleSubmit={handleSubmit}
          loading={loading}
          prevData={prevData}
        />
      ) : (
          <Grid className="flex gap-3 items-center">
            {prevData?.map((item, i)=> {
              let link = item.domain + item.username;
              let icons = [
                {id: 1, 
                 domain: "https://www.facebook.com/",
                 icon: <FaFacebookF className="text-lg"/>
                },
                {id: 2, 
                 domain: "https://www.instagram.com/",
                 icon: <FaInstagramSquare className="text-lg"/>
                },
                {id: 3, 
                 domain: "https://www.linkedin.com/",
                 icon: <FaLinkedinIn className="text-lg"/>
                },
                {id: 4, 
                 domain: "https://twitter.com/",
                 icon: <FaTwitterSquare className="text-lg"/>
                },
                {id: 5, 
                 domain: "https://www.youtube.com/",
                 icon: <FaYoutube className="text-lg"/>
                },
              ]
              return (
                <IconButton key={i} onClick={() => window.open(link, '_self')} className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
                 {icons.find(domainIcon => domainIcon.domain === item.domain).icon}
             </IconButton>
              )
            })}
         
        </Grid>
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
  prevData,
}) => {
  const { state } = useContext(Context);
  const { auth } = state;
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
  

  useEffect(() => {
    if (auth?.user?.socialLinks.length) setData(prevData);
  }, [auth?.user]);

  return (
    <Grid className="">
      <form>
       
        <Grid className="flex flex-col gap-5">
        {data?.map((item, index)=> (
               <Grid key={index} className="flex flex-col w-full gap-2">

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
                   className="md:w-[20rem] rounded-md"
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
                 className="md:w-[20rem] rounded-md"
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

          <Grid className="w-full md:w-[20rem] flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  setInputForm(false);
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




import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from '@mui/icons-material/Error';
import Container from "@mui/material/Container";
import { postData } from '../../utils/fetchData'
import { useTheme } from "next-themes";
import validate, { RegisterDataProps } from "../../utils/validate";


export default function SignUp() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [checked, setChecked] = useState<boolean>(false);
  const initState = {firstName: '', lastName: '', ssc_batch: '', email: '', confirm_email: '', password: '', confirm_password: ''};
  const [formData, setFormData] = useState<RegisterDataProps>(initState);
  const {firstName, lastName, ssc_batch, email, confirm_email, password, confirm_password} = formData;
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
       const {name, value} = event.target;
       setFormData({...formData, [name]: value})
  }
 
  useEffect(()=> {
      if (focused) {
        setErrorMessage([])
      }
  },[focused])
  
  const handleSubmit = async (e: React.SyntheticEvent)=> {
    e.preventDefault()
    const errMsg = validate({firstName, lastName, ssc_batch, email, confirm_email, password, confirm_password})
    const showMessage = ()=> {
      setErrorMessage(errMsg)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    if (errMsg.length !== 0) return showMessage()
    console.log("formData",formData)
    const res = await postData("auth/verifyEmail", formData);

    if (res.err)
      console.log("res", res);
  }

  return (
    <Container component="main" className="flex items-center justify-center">
      <Box
        className="bg-slate-300 dark:bg-zinc-700 w-[30rem] max-w-full p-5"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src="/logo.png"/>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {errorMessage.length !== 0 && <Grid className="w-full p-4 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
          {errorMessage.map((error, i)=> (
            <Grid key={i} className="flex items-center gap-2">
              <ErrorIcon/>
              <Typography className="p-0 text-sm">
                {error}
              </Typography>
            </Grid>
          ))}
        </Grid>}
        <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "firstName",
                  id: "firstName",
                  label: "First Name",
                  value: firstName,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "lastName",
                  id: "lastName",
                  label: "Last Name",
                  value: lastName,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
            
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "ssc_batch",
                  id: "ssc_batch",
                  label: "SSC Batch",
                  value: ssc_batch,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
             
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "email",
                  id: "email",
                  label: "Email Address",
                  value: email,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
             
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "email",
                  name: "confirm_email",
                  id: "confirm_email",
                  label: "Confirm your email address",
                  value: confirm_email,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
            
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "password",
                  name: "password",
                  id: "password",
                  label: "Password",
                  value: password,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
             
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "password",
                  name: "confirm_password",
                  id: "confirm_password",
                  label: "Confirm your password",
                  value: confirm_password,
                  onChange: handleChange,
                  setFocused: setFocused
                }}
              />
            
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={()=> setChecked(!checked)}
                    checked={checked}
                    sx={{
                      color:
                        currentTheme === "dark"
                          ? "rgb(120 113 108)"
                          : "rgb(21 128 61)",
                      "&.Mui-checked": {
                        color:
                          currentTheme === "dark"
                            ? "rgb(120 113 108)"
                            : "rgb(21 128 61)",
                      },
                    }}
                  />
                }
                label="I agree to the terms & conditions."
              />
            </Grid>
          </Grid>
          <Button
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            type="submit"
            disabled={!checked}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="/login"
                className="text-slate-900 dark:text-slate-200"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

interface Props {
  inputProps: {
    type: string;
    name: string;
    id: string;
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setFocused: Function;
  };
}

const InputField = ({ inputProps }: Props) => {
  const { type, name, id, label, value, onChange, setFocused } = inputProps;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      required
      fullWidth
      id={id}
      label={label}
      onChange = {onChange}
      onFocus = {()=> setFocused(true)}
      onBlur = {()=> setFocused(false)}
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
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
          },
        },
      }}
    />
  );
};

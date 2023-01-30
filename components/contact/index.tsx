import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Container from "@mui/material/Container";
import { postData } from "../../utils/fetchData";
import { useTheme } from "next-themes";
import validate from "../../utils/validate";
import { Context, StoreProps } from "../../store/store";
import { GlobalTypes } from "../../store/types";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [checked, setChecked] = useState<boolean>(false);
  const {
    firstName,
    lastName,
    ssc_batch,
    email,
    confirm_email,
  } = { ...state.register };
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const registerData = { ...state.register };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: GlobalTypes.REGISTER, payload: { name, value } });
  };

  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const errMsg = validate(registerData);
    const showMessage = () => {
      setErrorMessage(errMsg);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    if (errMsg.length !== 0) return showMessage();

    const res = await postData("auth/verifyEmail", registerData);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    if (res.err) return errMsg.push(res.err) && showMessage();
    router.push('/members/register/verify_email')
    
  };
  useEffect(() => {
    if (auth !== undefined) {
      if (Object.keys(auth).length !== 0) router.push("/");
    }
  }, []);
  return (
    <Container component="main" className="bg-slate-300 dark:bg-zinc-700 w-full md:w-[30rem] p-5 flex items-center justify-center">
      <Box
        className=""
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src="/logo.png" />
        <Typography component="h1" variant="h5">
          Send us a message
        </Typography>
        {errorMessage.length !== 0 && (
          <Grid className="w-full p-4 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
            {errorMessage.map((error, i) => (
              <Grid key={i} className="flex items-center gap-2">
                <ErrorIcon />
                <Typography className="p-0 text-sm">{error}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "ssc_batch",
                  id: "ssc_batch",
                  label: "Full Name",
                  value: ssc_batch,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "email",
                  name: "email",
                  id: "email",
                  label: "Email Address",
                  value: email,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  multiline: true,
                  minRows: 5,
                  type: "email",
                  name: "confirm_email",
                  id: "confirm_email",
                  label: "Message",
                  value: confirm_email,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
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
        </Box>
      </Box>
    </Container>
  );
}

interface Props {
  inputProps: {
    multiline?: boolean;
    minRows?: number | string;
    type: string;
    name: string;
    id: string;
    label: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setFocused: Function;
  };
}

const InputField = ({ inputProps }: Props) => {
  const {multiline, minRows, type, name, id, label, value, onChange, setFocused } = inputProps;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <TextField
      multiline={multiline}
      minRows= {minRows}
      type={type}
      name={name}
      value={value}
      required
      fullWidth
      id={id}
      label={label}
      onChange={onChange}
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
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
          },
        },
      }}
    />
  );
};

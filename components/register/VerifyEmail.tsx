import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { loading } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [otp, setOtp] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const registerData = { ...state.register };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOtp(value);
  };

  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await postData("auth/register", { registerData, code: otp });
    const showError =()=> {
        setErrorMessage([res.err])
        dispatch({ type: GlobalTypes.LOADING, payload: false });
    }
    if (res.err) return showError();

    dispatch({
      type: GlobalTypes.AUTH,
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    const firstLogin = true;
    localStorage.setItem("firstLogin", JSON.stringify(firstLogin));
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    router.push("/members/register/verify_info");
  };
  console.log("store", state.auth);
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
        <Avatar src="/logo.png" />
        <Typography component="h1" variant="h5">
          Verify your email address
        </Typography>
        {errorMessage.length !== 0 ? (
          <Grid className="w-full p-4 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
            {errorMessage.map((error, i) => (
              <Grid key={i} className="flex items-center gap-2">
                <ErrorIcon />
                <Typography className="p-0 text-sm">{error}</Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid className="w-full p-5 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col">
            <Typography className="p-0">
              We sent a 4-digit verification code to your email address. Please
              enter the code to verify your email address.
            </Typography>
          </Grid>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          sx={{ mt: 3 }}
          className="w-full"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "otp",
                  id: "otp",
                  label: "Verification Code",
                  value: otp,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
          </Grid>
          <Button
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            type="submit"
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
              <Typography>Verify</Typography>
            )}
          </Button>
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
    value?: string;
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

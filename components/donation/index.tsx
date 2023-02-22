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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Payment from "./payment";
import Message from "./Message";
import Overview from "./Overview";
import VerifyEmail from "./VerifyEmail";

interface SubscriptionProps {
  _id: string;
  title: string;
  facilities: { facility: string }[];
  price: number;
  per?: string;
  currency: string;
}

export default function SignUp({
  contents,
}: {
  contents: SubscriptionProps[];
}) {
  const [data, setData] = useState<SubscriptionProps[]>(contents);
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [checked, setChecked] = useState<boolean>(false);
 
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const initState = { firstName: "", lastName: "", phone: "", email: "", amount: "", currency: "" };
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    amount: string;
    currency: string;

  }>(initState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({...userData, [name]: value})
  };

  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const errMsg = validate(registerData);
    // const showMessage = () => {
    //   setErrorMessage(errMsg);
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    // };
    // if (errMsg.length !== 0) return showMessage();

    // dispatch({ type: GlobalTypes.LOADING, payload: true });

    // const res = await postData("auth/verifyEmail", registerData);
    // dispatch({ type: GlobalTypes.LOADING, payload: false });
    // if (res.err) return errMsg.push(res.err) && showMessage();
    sessionStorage.setItem("donationData", JSON.stringify(userData));
    router.push("/donate?overview=true", undefined, { shallow: true });
  };
 


  const { overview, donation } = router.query;
  if ( donation ) {
    return <Message donation= {donation} />;
  } else if ( overview ) {
    return <Overview/>
  } 
  
  return (
    <Container
      component="main"
      className="bg-slate-300 dark:bg-zinc-700 w-full md:w-[30rem] p-5 flex items-center justify-center"
    >
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
          Donate
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
            <Grid item xs={12} sm={6}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "firstName",
                  id: "firstName",
                  label: "First Name",
                  value: userData.firstName,
                  onChange: handleChange,
                  setFocused: setFocused,
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
                  value: userData.lastName,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
           
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "number",
                  name: "phone",
                  id: "phone",
                  label: "Phone",
                  value: userData.phone,
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
                  value: userData.email,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
           
            <Payment userData={userData} setUserData= {setUserData} setFocused={setFocused} />
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={() => setChecked(!checked)}
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
            onClick={handleSubmit}
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
              <Typography>Next</Typography>
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
    value?: string | number;
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

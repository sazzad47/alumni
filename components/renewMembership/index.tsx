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
  
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { loading } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [checked, setChecked] = useState<boolean>(false);
 
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const initState = { email: "", membership: "", currency: "", amount: 0 };
  const [userData, setUserData] = useState<{
    email: string;
    membership: string;
    currency: string;
    amount?: number;
  }>(initState);


  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await postData("members/renew", userData);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    if (res.err) return setErrorMessage([res.err]);
    router.push(`${res.url}`);
  };


  const { payment } = router.query;
  if ( payment ) return <Message payment= {payment} />;
  
  
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
          Renew Membership
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
           
            <Payment contents={contents} userData={userData} setUserData= {setUserData} setFocused={setFocused} />
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
              <Typography>Checkout</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}


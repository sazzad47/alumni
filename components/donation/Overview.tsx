import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { Context, StoreProps } from "../../store/store";
import { postData } from "../../utils/fetchData";
import { GlobalTypes } from "../../store/types";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

interface RegisterProps {
  firstName?: string;
  lastName?: string;
  ssc_batch?: string;
  phone?: number;
  email?: string;
  membership?: string;
  currency?: string;
  amount?: string;
}

export default function OverView() {
  const router = useRouter();
  const [data, setData] = useState<RegisterProps>({});
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { loading } = state;

  const {
    firstName,
    lastName,
    phone,
    email,
    amount,
    currency,
  } = data;

  function formateAmount(amount?: string) {
    let formattedAmount: string;
    if (currency === "usd") {
      formattedAmount = `$${amount} USD`;
    } else {
      formattedAmount = `${amount} BDT`;
    }
    return formattedAmount;
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await postData("donate", data);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
    if (res.err) return console.log("error", res.err);
    router.push(`${res.url}`);
  };

  useEffect(() => {
    if (window) {
      const newData = sessionStorage.getItem("donationData");
      if (newData) {
        setData(JSON.parse(newData));
      }
    }
  }, []);

  console.log("registarData", data);
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
        <Grid className="flex items-center gap-2">
          {/* <CheckCircleOutlineIcon/> */}
          <Typography component="h1" variant="h5">
            Donate
          </Typography>
        </Grid>
        <Typography className="p-0 text-sm text-zinc-800 dark:text-green-300">
          Please check your information before you continue.
        </Typography>

        <Grid className="w-full p-5 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col">
          <Grid container spacing={2} className="w-full">
            <Grid item xs={6}>
              <Typography className="p-0">Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">
                {firstName} {lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">Email:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">{email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">Phone:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">{phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">Amount:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="p-0">{formateAmount(amount)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }} className="w-full">
          <Button
            onClick={handleSubmit}
            // disabled={!firstName || !lastName || !ssc_batch || !email || !membership || !amount}
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
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
              <Typography>Donate</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

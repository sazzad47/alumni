import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
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
import { getData, postData } from "../../../utils/fetchData";
import { useTheme } from "next-themes";
import validate from "../../../utils/validate";
import { Context, StoreProps } from "../../../store/store";
import { GlobalTypes } from "../../../store/types";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SubscriptionProps {
  _id: string;
  title: string;
  facilities: { facility: string }[];
  price: number;
  per?: string;
  currency: string;
}

export default function Payment({
  contents,
}: {
  contents: SubscriptionProps[];
}) {
  const [data, setData] = useState<SubscriptionProps[]>(contents);
  const [info, setInfo] = useState([]);
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const { membership, currency, amount } = {
    ...state.register,
  };

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const from = data.find((item) => item.title === membership)?.currency;

  function calculateAmount(amount?: number) {
    var rate = info[currency as unknown as number];
    if (amount !== undefined) {
      return Number(amount) * rate;
    }
  }

  // const handleSubmit = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  //   dispatch({ type: GlobalTypes.LOADING, payload: true });

  //   const res = await postData("payment", userData);
  //   dispatch({ type: GlobalTypes.LOADING, payload: false });
  //   if (res.err)
  //     return (
  //       <>

  //         {dispatch({ type: GlobalTypes.LOADING, payload: false })}
  //       </>
  //     );

  // };
  useEffect(() => {
    if (from !== undefined) {
      Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      ).then((res) => {
        setInfo(res.data[from]);
      });
    }
  }, [currency, membership]);

  useEffect(() => {
    const totalAmount = calculateAmount(
      data.find((item) => item.title === membership)?.price
    );
    dispatch({
      type: GlobalTypes.REGISTER,
      payload: { name: "amount", value: Number(totalAmount) },
    });
  }, [currency, membership]);

  useEffect(() => {
    if (auth !== undefined) {
      if (Object.keys(auth).length === 0) router.push("/members/register");
    }
  }, []);

  function formateAmount(amount?: number) {
    let formattedAmount: string;
    if (currency === "usd") {
      formattedAmount = `$${amount} USD`;
    } else {
      formattedAmount = `${amount} BDT`;
    }
    return formattedAmount;
  }

  return (
    <>
      {" "}
      <Grid item xs={12} className="">
        <FormControl className="w-full">
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color:
                currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
              "&.Mui-focused": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            }}
          >
            Select membership
          </InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="membership"
            value={membership}
            onChange={(event) =>
              dispatch({
                type: GlobalTypes.REGISTER,
                payload: { name: "membership", value: event.target.value },
              })
            }
            sx={{
              color: currentTheme === "dark" ? "white" : "black",
              label: {
                color: "darkred",
                "&.Mui-focused": {
                  color: "darkred",
                },
              },
              ".MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              ".MuiSvgIcon-root ": {
                fill:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            }}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor:
                      currentTheme === "dark"
                        ? "rgb(63 63 70)"
                        : "rgb(212 212 216)",
                    color: currentTheme === "dark" ? "white" : "black",
                  },
                },
              },
            }}
            label="Select membership"
            className="rounded-md"
          >
            {data.map((item, i) => (
              <MenuItem key={i} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} className="">
        <FormControl className="w-full">
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color:
                currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
              "&.Mui-focused": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            }}
          >
            Select currency
          </InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="currency"
            value={currency}
            onChange={(event) =>
              dispatch({
                type: GlobalTypes.REGISTER,
                payload: { name: "currency", value: event.target.value },
              })
            }
            sx={{
              color: currentTheme === "dark" ? "white" : "black",
              label: {
                color: "darkred",
                "&.Mui-focused": {
                  color: "darkred",
                },
              },
              ".MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
                borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
              },
              ".MuiSvgIcon-root ": {
                fill:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            }}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor:
                      currentTheme === "dark"
                        ? "rgb(63 63 70)"
                        : "rgb(212 212 216)",
                    color: currentTheme === "dark" ? "white" : "black",
                  },
                },
              },
            }}
            label="Select currency"
            className="rounded-md"
          >
            <MenuItem value="bdt">BDT</MenuItem>
            <MenuItem value="usd">USD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {currency && membership && (
        <Grid item xs={12}>
          <Grid className="w-full p-4 bg-stone-400 dark:bg-zinc-500 flex justify-center gap-3">
            <Grid className="flex items-center gap-2">
              <Typography className="p-0 text-md text-zinc-800 dark:text-green-300">
                Total amount:
              </Typography>
              <Typography className="p-0 text-md text-zinc-800 dark:text-green-300">
                {formateAmount(amount)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

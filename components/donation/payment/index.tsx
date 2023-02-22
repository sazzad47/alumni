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

interface InputProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  amount: string;
  currency: string;
}

export default function Payment({
  userData,
  setUserData,
  setFocused,
}: {
 userData: InputProps; setUserData: Function; setFocused: Function;
}) {
  
  const [info, setInfo] = useState([]);
  const router = useRouter();
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
 const { amount, currency } = userData;

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  

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
    
      Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/bdt.json`
      ).then((res) => {
        setInfo(res.data['bdt']);
      });
  
  }, [currency, amount]);



  return (
    <>
      {" "}
      <Grid item xs={12}>
        <TextField
          type="number"
          name="amount"
          value={amount}
          required
          fullWidth
          id="amount"
          label="Amount"
          placeholder="Please enter your donation amount"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) =>
            setUserData({ ...userData, amount: event.target.value })
          }
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
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            },
          }}
        />
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
              setUserData({ ...userData, currency: event.target.value })
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
      
    </>
  );
}

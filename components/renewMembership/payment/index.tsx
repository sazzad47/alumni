import React, { useEffect, useState } from "react";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "next-themes";
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
  email: string;
  membership: string;
  currency: string;
  amount?: number;
}
export default function Payment({
  contents,
  userData,
  setUserData,
  setFocused,
}: {
  contents: SubscriptionProps[]; userData: InputProps; setUserData: Function; setFocused: Function;
}) {
  
  const [info, setInfo] = useState([]);
 
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const from = contents.find(
    (item) => item.title === userData.membership
  )?.currency;

  function calculateAmount(amount?: number) {
    var rate = info[userData.currency as unknown as number];
    if (amount !== undefined) {
      return Number(amount) * rate;
    }
  }

  useEffect(() => {
    if (from !== undefined) {
      Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      ).then((res) => {
        setInfo(res.data[from]);
      });
    }
  }, [userData.currency, userData.membership]);

  useEffect(() => {
    const totalAmount = calculateAmount(
      contents.find((item) => item.title === userData.membership)?.price
    );
    setUserData({ ...userData, amount: totalAmount })
  }, [userData.currency, userData.membership]);

  function formateAmount(amount?: number) {
    let formattedAmount: string;
    if (userData.currency === "usd") {
      formattedAmount = `$${amount} USD`;
    } else {
      formattedAmount = `${amount} BDT`;
    }
    return formattedAmount;
  }

  return (
    <>
      <Grid item xs={12}>
        <TextField
          type="email"
          name="email"
          value={userData.email}
          required
          fullWidth
          id="email"
          label="Email"
          placeholder="Please enter your registered email address"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
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
            Select membership
          </InputLabel>
          <Select
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="membership"
            value={userData.membership}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(event) =>
              setUserData({ ...userData, membership: event.target.value })
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
            {contents.map((item, i) => (
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
            value={userData.currency}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
      {userData.currency && userData.membership && (
        <Grid item xs={12}>
          <Grid className="w-full p-4 bg-stone-400 dark:bg-zinc-500 flex justify-center gap-3">
            <Grid className="flex items-center gap-2">
              <Typography className="p-0 text-md text-zinc-800 dark:text-green-300">
                Total amount:
              </Typography>
              <Typography className="p-0 text-md text-zinc-800 dark:text-green-300">
                {formateAmount(userData.amount)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

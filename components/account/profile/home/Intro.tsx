import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../../../utils/fetchData";
import { GlobalTypes } from "../../../../store/types";
import { Context, StoreProps } from "../../../../store/store";
import { ThreeDots } from "react-loader-spinner";

const Intro = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <GeneralInfo />
    </Grid>
  );
};

const GeneralInfo = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const prevData = auth?.user?.placeOfBirth;
  const [inputForm, setInputForm] = useState<boolean>(false);
  const initState = { placeOfBirth: "", dateOfBirth: "", currentLocation: "" };
  const [userData, setUserData] = useState<{
    placeOfBirth: string;
    dateOfBirth: string;
    currentLocation: string;
  }>(initState);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await patchData("user", { ...userData }, auth?.token);
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
    if (!focused && !inputForm && !prevData) {
      setErrorMessage(["Please add your general information."]);
    } else if (focused) {
      setErrorMessage([]);
    }
  }, [focused, inputForm, prevData]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <PermIdentityIcon />
        <Typography className="p-0 font-bold">General information</Typography>
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
          data={userData}
          setData={setUserData}
          setFocused={setFocused}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <Grid className="flex flex-col gap-2">
          <Grid className="w-full md:w-[20rem] flex flex-col gap-5">
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Date of Birth</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {auth?.user?.dateOfBirth}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Place of Birth</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {auth?.user?.placeOfBirth}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="w-full flex items-start">
              <Grid className="w-[40%]">
                <Typography className="p-0">Current Location</Typography>
              </Grid>
              <Grid className="w-[60%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">
                  {auth?.user?.placeOfBirth}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
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
}: {
  setInputForm: Function;
  data: { placeOfBirth: string; dateOfBirth: string; currentLocation: string };
  setData: Function;
  setFocused: Function;
  handleSubmit: Function;
  loading?: boolean;
}) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;

  useEffect(() => {
    if (auth?.user)
      setData({
        ...data,
        placeOfBirth: auth.user.placeOfBirth,
        dateOfBirth: auth.user.dateOfBirth,
        currentLocation: auth.user.currentLocation,
      });
  }, [auth?.user]);

  return (
    <Grid className="">
      <form>
        <Grid className="flex flex-col w-full gap-2">
          <CustomTextField
            inputProps={{
              autoFocus: true,
              multiline: true,
              type: "text",
              name: "placeOfBirth",
              id: "placeOfBirth",
              label: "Place of birth",
              value: data.placeOfBirth,
              onChange: (e) =>
                setData({ ...data, placeOfBirth: e.target.value }),
              setFocused: setFocused,
            }}
          />
          <CustomTextField
            inputProps={{
              multiline: true,
              type: "text",
              name: "dateOfBirth",
              id: "dateOfBirth",
              label: "Date of birth",
              value: data.dateOfBirth,
              onChange: (e) =>
                setData({ ...data, dateOfBirth: e.target.value }),
              setFocused: setFocused,
            }}
          />
          <CustomTextField
            inputProps={{
              multiline: true,
              type: "text",
              name: "currentLocation",
              id: "currentLocation",
              label: "Current Location",
              value: data.currentLocation,
              onChange: (e) =>
                setData({ ...data, currentLocation: e.target.value }),
              setFocused: setFocused,
            }}
          />

          <Grid className="w-full md:w-[20rem] flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  setInputForm(false);
                  setData("");
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

interface Props {
  inputProps: {
    multiline?: boolean;
    autoFocus?: boolean;
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
const CustomTextField = ({ inputProps }: Props) => {
  const {
    multiline,
    autoFocus,
    minRows,
    type,
    name,
    id,
    label,
    value,
    onChange,
    setFocused,
  } = inputProps;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <TextField
      multiline={multiline}
      minRows={minRows}
      type={type}
      name={name}
      value={value}
      required
      fullWidth
      id={id}
      label={label}
      onChange={onChange}
      autoFocus={autoFocus}
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
      className="w-full md:w-[20rem]"
    />
  );
};

export default Intro;

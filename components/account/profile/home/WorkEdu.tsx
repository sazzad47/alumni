import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../../../utils/fetchData";
import { GlobalTypes } from "../../../../store/types";
import { Context, StoreProps } from "../../../../store/store";
import { ThreeDots } from "react-loader-spinner";

const WorkEdu = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <Grid className="flex flex-col gap-3">
        <Education />
        <Profession />
      </Grid>
    </Grid>
  );
};

const Education = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const prevData = auth?.user?.education;
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [education, setEducation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await patchData("user", { education }, auth?.token);
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
      setErrorMessage(["Please add your education."]);
    } else if (focused) {
      setErrorMessage([]);
    }
  }, [focused, inputForm, prevData]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <SchoolIcon />
        <Typography className="p-0 font-bold">Education</Typography>
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
          data={education}
          setData={setEducation}
          setFocused={setFocused}
          handleSubmit={handleSubmit}
          loading={loading}
          prevData={prevData}
        />
      ) : (
        <Typography className="p-0">{prevData}</Typography>
      )}
    </Grid>
  );
};
const Profession = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;
  const prevData = auth?.user?.profession;
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });

    const res = await patchData("user", { profession }, auth?.token);
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
      setErrorMessage(["Please add your profession."]);
    } else if (focused) {
      setErrorMessage([]);
    }
  }, [focused, inputForm, prevData]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <WorkIcon />
        <Typography className="p-0 font-bold">Profession</Typography>
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
          data={profession}
          setData={setProfession}
          setFocused={setFocused}
          handleSubmit={handleSubmit}
          loading={loading}
          prevData={prevData}
        />
      ) : (
        <Typography className="p-0">{prevData}</Typography>
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
  prevData,
}: {
  setInputForm: Function;
  data: string;
  setData: Function;
  setFocused: Function;
  handleSubmit: Function;
  loading?: boolean;
  prevData?: string;
}) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (auth?.user) setData(prevData);
  }, [auth?.user]);

  return (
    <Grid className="">
      <form>
        <Grid className="flex flex-col w-full gap-2">
          <TextField
            multiline
            autoFocus
            onChange={(e) => setData(e.target.value)}
            value={data}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            sx={{
              label: {
                color: currentTheme === "dark" ? "rgb(214 211 209)" : "",
              },
              "& label.Mui-focused": {
                color:
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
              "& .MuiOutlinedInput-root": {
                color: currentTheme === "dark" ? "white" : "black",
                "& fieldset": {
                  color: "white",
                  borderColor:
                    currentTheme === "dark" ? "rgb(120 113 108)" : "",
                },
                "&:hover fieldset": {
                  borderColor:
                    currentTheme === "dark" ? "rgb(168 162 158)" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    currentTheme === "dark"
                      ? "rgb(214 211 209)"
                      : "rgb(21 128 61)",
                },
              },
            }}
            className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
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
export default WorkEdu;

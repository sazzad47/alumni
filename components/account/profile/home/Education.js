import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../../../utils/fetchData";
import { GlobalTypes } from "../../../../store/types";
import { Context } from "../../../../store/store";
import { ThreeDots } from "react-loader-spinner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Education = () => {
  return (
    <Grid className="w-full bg-slate-300 dark:bg-zinc-700">
      <Grid className="flex flex-col gap-3">
        <EducationComponent />
      </Grid>
    </Grid>
  );
};

const EducationComponent = () => {
  const { state, dispatch } = useContext(Context);
  const { auth, loading } = state;
  const prevData = auth?.user?.education;
  const [inputForm, setInputForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [education, setEducation] = useState([
    {
      school: "",
      current: false,
      from: "",
      to: "",
      degree: "",
      description: "",
    },
  ]);

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
    if (!focused && !inputForm && !prevData.length) {
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
        <Grid className="w-full p-4 my-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3 text-inherit">
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
        <Grid className="flex flex-col gap-2">
          {prevData.map((item, index) => (
            <Grid key={index} className="w-full md:w-[20rem] min-h-[5rem] flex">
              <Grid className="w-[30%]">
                <Typography className="p-0">
                  {item.from}-{item.current ? "present" : item.to}
                </Typography>
              </Grid>
              <Grid className="w-[70%] flex flex-col gap-2">
                <Typography className="p-0 font-bold">{item.degree}</Typography>
                <Typography className="p-0">{item.school}</Typography>
                <Typography className="p-0">{item.description}</Typography>
              </Grid>
            </Grid>
          ))}
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
  prevData,
}) => {
  const { state } = useContext(Context);
  const { auth } = state;
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (auth?.user?.education.length) setData(prevData);
  }, [auth?.user]);

  function generateArrayOfYears() {
    let max = new Date().getFullYear();
    let min = 1971;
    let years = [];

    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }

  const handleChange = (event, index) => {
    let newData = [...data];
    newData[index][event.target.name] = event.target.value;
    setData(newData);
  };
  const deleteField = (index) => {
    let updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };
  const addMore = () => {
    let object = {
      school: "",
      current: false,
      from: "",
      to: "",
      degree: "",
      description: "",
    };
    setData([...data, object]);
  };

  return (
    <Grid className="">
      <form className="flex flex-col gap-5">
        {data.map((item, index) => (
          <Grid key={index}>
            <Grid className="w-full md:w-[20rem] flex justify-end text-black dark:text-white">
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteField(index)}
                  className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid className="flex flex-col w-full gap-2">
              <CustomTextField
                inputProps={{
                  multiline: true,
                  autoFocus: true,
                  type: "text",
                  name: "school",
                  id: "school",
                  label: "Institute",
                  value: item.school,
                  onChange: (event) => handleChange(event, index),
                  setFocused: setFocused,
                }}
              />
              <Grid className="flex flex-col">
                <Typography className="p-0">Time Period</Typography>
                <Grid className="flex items-center mt-2">
                  <Checkbox
                    onChange={() => {
                      let newData = [...data];
                      newData[index]["current"] = !item.current;
                      setData(newData);
                    }}
                    checked={item.current}
                    sx={{
                      color: currentTheme === "dark" ? "#fff" : "#000",
                      padding: 0,
                      "&.Mui-checked": {
                        color: currentTheme === "dark" ? "#fff" : "#000",
                      },
                    }}
                  />
                  <Typography className="p-0 pl-3">
                    I currently study here
                  </Typography>
                </Grid>
                <Grid className="w-full my-3">
                  {item.current ? (
                    <Grid className="flex items-center">
                      <Typography className="p-0 pr-3">From</Typography>
                      <CustomSelect
                        inputProps={{
                          type: "number",
                          name: "from",
                          id: "from",
                          label: "Year",
                          value: item.from,
                          onChange: (event) => handleChange(event, index),
                          setFocused: setFocused,
                        }}
                      >
                        {generateArrayOfYears().map((year, i) => (
                          <MenuItem key={i} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Grid>
                  ) : (
                    <Grid className="w-full md:w-[20rem] justify-between flex items-center">
                      <Typography className="p-0 pr-3">From</Typography>
                      <CustomSelect
                        inputProps={{
                          type: "number",
                          name: "from",
                          id: "from",
                          label: "Year",
                          value: item.from,
                          onChange: (event) => handleChange(event, index),
                          setFocused: setFocused,
                        }}
                      >
                        {generateArrayOfYears().map((year, i) => (
                          <MenuItem key={i} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <Typography className="p-0 px-3">to</Typography>
                      <CustomSelect
                        inputProps={{
                          type: "number",
                          name: "to",
                          id: "to",
                          label: "Year",
                          value: item.to,
                          onChange: (event) => handleChange(event, index),
                          setFocused: setFocused,
                        }}
                      >
                        {generateArrayOfYears().map((year, i) => (
                          <MenuItem key={i} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <CustomTextField
                inputProps={{
                  multiline: true,
                  type: "text",
                  name: "degree",
                  id: "degree",
                  label: "Degree",
                  value: item.degree,
                  onChange: (event) => handleChange(event, index),
                  setFocused: setFocused,
                }}
              />
              <CustomTextField
                inputProps={{
                  multiline: true,
                  minRows: 4,
                  type: "text",
                  name: "description",
                  id: "description",
                  label: "Description",
                  value: item.description,
                  onChange: (event) => handleChange(event, index),
                  setFocused: setFocused,
                }}
              />
            </Grid>
          </Grid>
        ))}
        <Button
          onClick={addMore}
          startIcon={<AddCircleOutlineIcon />}
          disableRipple
          className="w-[12rem] text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 focus:outline-none normal-case"
        >
          Add another degree
        </Button>

        <Grid className="w-full md:w-[20rem] flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                setInputForm(false);
                setData([
                  {
                    school: "",
                    current: false,
                    from: "",
                    to: "",
                    degree: "",
                    description: "",
                  },
                ]);
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
      </form>
    </Grid>
  );
};

const CustomSelect = ({ children, inputProps }) => {
  const { type, name, id, label, value, onChange, setFocused, autoFocus } = inputProps;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <FormControl>
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          color:
            currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
          "&.Mui-focused": {
            color:
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        autoFocus={autoFocus}
        required
        type={type}
        labelId={name}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            borderColor: currentTheme === "dark" ? "rgb(120 113 108)" : "",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            color:
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            borderColor:
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            color:
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
            borderColor: currentTheme === "dark" ? "rgb(168 162 158)" : "",
          },
          ".MuiSvgIcon-root ": {
            fill:
              currentTheme === "dark" ? "rgb(214 211 209)" : "rgb(21 128 61)",
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
        label={label}
        className="min-w-[6rem] rounded-md"
      >
        {children}
      </Select>
    </FormControl>
  );
};

const CustomTextField = ({ inputProps }) => {
  const {
    type,
    name,
    id,
    label,
    value,
    onChange,
    setFocused,
    multiline,
    minRows,
    autoFocus,
  } = inputProps;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <TextField
      autoFocus={autoFocus}
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
      className="md:w-[20rem]"
    />
  );
};

export default Education;

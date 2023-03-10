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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { patchData } from "../../../utils/fetchData";
import { GlobalTypes } from "../../../store/types";
import { Context } from "../../../store/store";
import { ThreeDots } from "react-loader-spinner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Edit = ({ handleCloseDialog, data, setData }) => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [subscription, setSubscription] = useState(data);
  const [errorMessage, setErrorMessage] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await patchData(
      `admin/subscription/${data._id}`,
      subscription,
      auth?.token
    );
    if (res.err)
      return (
        <>
          {setErrorMessage([res.err])}
          {setLoading(false)}
        </>
      );
    setData(res.content);
    setLoading(false);
    handleCloseDialog();
    dispatch({
      type: GlobalTypes.NOTIFY,
      payload: { notify: true, msg: "Updated successfully" },
    });
  };

  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  return (
    <Grid className="w-full h-full flex flex-col p-5">
      <Grid className="w-full flex flex-col items-center justify-center">
        <Typography className="pb-2 text-lg md:text-2xl text-black dark:text-slate-200">
          Update
        </Typography>
        <Typography className="p-0 text-sm text-zinc-700 dark:text-green-300 mb-3">
          Let your content beautify your design.
        </Typography>
      </Grid>
      {errorMessage.length !== 0 && (
        <Grid className="w-full p-4 my-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
          {errorMessage.map((error, i) => (
            <Grid key={i} className="flex items-start gap-2">
              <ErrorIcon />
              <Typography className="p-0 text-sm">{error}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Form
        handleCloseDialog={handleCloseDialog}
        data={subscription}
        setData={setSubscription}
        setFocused={setFocused}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Grid>
  );
};

const Form = ({
  handleCloseDialog,
  data,
  setData,
  setFocused,
  handleSubmit,
  loading,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleChange = (event, index) => {
    let facilities = data.facilities;
    let newData = [...facilities];
    newData[index][event.target.name] = event.target.value;
    setData({ ...data, facilities: newData });
  };

  const addMore = () => {
    let facilities = data.facilities;
    let object = {
      facility: "",
    };
    setData({ ...data, facilities: [...facilities, object] });
  };

  const deleteField = (index) => {
    let facilities = data.facilities;
    let updatedData = [...facilities];
    updatedData.splice(index, 1);
    setData({ ...data, facilities: updatedData });
  };

  return (
    <Grid className="">
      <form>
        <Grid className="flex flex-col gap-5">
          <TextField
            multiline
            onChange={(event) =>
              setData({ ...data, title: event.target.value })
            }
            name="title"
            value={data.title}
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
            placeholder="Title"
            label="Title"
            className="rounded-md"
          />
          {data?.facilities?.map((item, index) => (
            <Grid key={index} className="flex flex-col w-full gap-2">
              {data?.facilities.length !== 1 && (
                <Grid className="w-full flex justify-end">
                  <Tooltip title="Delete">
                    <IconButton
                      disabled={data?.facilities.length === 1}
                      onClick={() => deleteField(index)}
                      className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1 text-black dark:text-white"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}

              <TextField
                multiline
                onChange={(event) => handleChange(event, index)}
                name="facility"
                value={item.facility}
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
                placeholder="Description"
                label="Description"
                className="rounded-md"
              />
            </Grid>
          ))}
          <Button
            onClick={addMore}
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            className="w-[12rem] text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 focus:outline-none normal-case"
          >
            Add another section
          </Button>
          <Grid className="w-full grid grid-cols-2 gap-3">
            <TextField
              multiline
              onChange={(event) =>
                setData({ ...data, price: event.target.value })
              }
              name="price"
              value={data.price}
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
              placeholder="Price"
              label="Price"
              className="rounded-md"
            />
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color:
                    currentTheme === "dark"
                      ? "rgb(214 211 209)"
                      : "rgb(21 128 61)",
                  "&.Mui-focused": {
                    color:
                      currentTheme === "dark"
                        ? "rgb(214 211 209)"
                        : "rgb(21 128 61)",
                  },
                }}
              >
                per
              </InputLabel>
              <Select
                autoFocus
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="domain"
                value={data.per}
                onChange={(event) =>
                  setData({ ...data, per: event.target.value })
                }
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
                      currentTheme === "dark"
                        ? "rgb(214 211 209)"
                        : "rgb(21 128 61)",
                    borderColor:
                      currentTheme === "dark" ? "rgb(120 113 108)" : "",
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
                    borderColor:
                      currentTheme === "dark" ? "rgb(168 162 158)" : "",
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
                label="per"
                className="rounded-md"
              >
                
                <MenuItem value="month">month</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="year">year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color:
                    currentTheme === "dark"
                      ? "rgb(214 211 209)"
                      : "rgb(21 128 61)",
                  "&.Mui-focused": {
                    color:
                      currentTheme === "dark"
                        ? "rgb(214 211 209)"
                        : "rgb(21 128 61)",
                  },
                }}
              >
                Currency
              </InputLabel>
              <Select
                autoFocus
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="domain"
                value={data.currency}
                onChange={(event) =>
                  setData({ ...data, currency: event.target.value })
                }
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
                      currentTheme === "dark"
                        ? "rgb(214 211 209)"
                        : "rgb(21 128 61)",
                    borderColor:
                      currentTheme === "dark" ? "rgb(120 113 108)" : "",
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
                    borderColor:
                      currentTheme === "dark" ? "rgb(168 162 158)" : "",
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
                label="Currency"
                className="rounded-md"
              >
                <MenuItem value="bdt">BDT</MenuItem>
                <MenuItem value="usd">USD</MenuItem>
              </Select>
            </FormControl>
          <Grid className="w-full flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  handleCloseDialog();
                  setData([{ username: "", domain: "" }]);
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
export default Edit;

import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "next-themes";
import { GlobalTypes } from "../../store/types";
import { getData, patchData } from "../../utils/fetchData";
import { Context, StoreProps } from "../../store/store";
import { ThreeDots } from "react-loader-spinner";

const ContactInfo = () => {

  const [data, setData] = useState<{ _id: string; description: string }[]>([]);

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      if (!isCanceled) {
        const res = await getData("admin/contactInfo");
        setData(res.content);
      }
    };
    fetchData();
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <Grid className="w-full p-5 min-h-[35vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-lg md:text-xl uppercase">
            Contact Info
          </Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
      <Grid className="grid grid-cols-1 sm:grid-2 md:grid-cols-4 gap-3">
        {data?.map((item, i) => (
          <Grid
            key={i}
            className="w-full h-[10rem] relative bg-green-900 dark:bg-zinc-700 text-slate-200"
          >
            <Content item={item} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const Content = ({
  item,
  i,
}: {
  item: { _id: string; description: string };
  i: number;
}) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<{ _id: string; description: string }>(item);


  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Grid className="w-full h-full relative flex items-start justify-center p-3">
      {auth?.user?.role === "admin" && (
        <>
         <Tooltip title="Edit">
            <IconButton
              onClick={handleOpenDialog}
              className="absolute right-0 top-0"
            >
              <EditIcon className="text-white" />
            </IconButton>
          </Tooltip>
          <Dialog
            sx={{
              "& .MuiDialog-paper": {
                backgroundColor:
                  currentTheme === "dark"
                    ? "rgb(63 63 70)"
                    : "rgb(203 213 225)",

                width: "25rem",
                minHeight: "12rem",
              },
            }}
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogContent
              setData={setData}
              item={data}
              handleClose={handleCloseDialog}
            />
          </Dialog>
        </>
      )}
      <Grid className="w-full flex flex-col items-center justify-start gap-3">
        <Grid className="flex flex-col items-center">
          {items.find((header) => header.id === i)?.icon}
          <Typography className="p-0">
            {items.find((header) => header.id === i)?.title}{" "}
          </Typography>
        </Grid>
        <Typography className="p-0">{data.description} </Typography>
      </Grid>
    </Grid>
  );
};

const DialogContent = ({
  setData,
  handleClose,
  item,
}: {
  setData: Function;
  handleClose: () => void;
  item: { _id: string; description: string };
}) => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth } = state;
  const initState = { description: item.description };
  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await patchData(
      `admin/contactInfo/${item._id}`,
      userData,
      auth?.token
    );
    if (res.err) return setErrorMessage([res.err]);
    setData((prevData: { _id: string; description: string }) => ({
      ...prevData,
      description: res.content.description,
    }));

    setLoading(false);
    handleClose();
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
          Update Contact Info
        </Typography>
        <Typography className="p-0 text-sm text-zinc-700 dark:text-green-300">
          Let your content beautify your design.
        </Typography>
      </Grid>
      {errorMessage.length !== 0 && (
        <Grid className="w-full p-4 my-4 bg-stone-400 dark:bg-zinc-500 flex flex-col gap-3">
          {errorMessage.map((error, i) => (
            <Grid key={i} className="flex items-center gap-2">
              <ErrorIcon />
              <Typography className="p-0 text-sm">{error}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Form
        handleClose={handleClose}
        data={userData}
        setData={setUserData}
        setFocused={setFocused}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Grid>
  );
};

const Form = ({
  handleClose,
  data,
  setData,
  setFocused,
  handleSubmit,
  loading,
}: {
  handleClose: () => void;
  data: { description: string };
  setData: Function;
  setFocused: Function;
  handleSubmit: () => void;
  loading: boolean;
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <form className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <Grid className="w-full flex items-center justify-center"></Grid>
        <TextField
          type="text"
          multiline
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description}
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
                  currentTheme === "dark"
                    ? "rgb(214 211 209)"
                    : "rgb(21 128 61)",
              },
            },
          }}
          label="Content"
          className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
        />

        <Grid className="w-full md:w-[20rem] flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                if (handleClose !== undefined) handleClose();
                setData("");
              }}
              className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={!data.description}
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
                <Typography>Update</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const items = [
  {
    id: 0,
    title: "Location",
    icon: <LocationOnIcon />,
  },
  {
    id: 1,
    title: "Mailing Address",
    icon: <ContactMailIcon />,
  },
  {
    id: 2,
    title: "Phone",
    icon: <CallIcon />,
  },
  {
    id: 3,
    title: "Email",
    icon: <EmailIcon />,
  },
];
export default ContactInfo;

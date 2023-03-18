import React, { useEffect, useState, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import Container from "@mui/material/Container";
import { getData, patchData } from "../../../../utils/fetchData";
import { useTheme } from "next-themes";
import { Context, StoreProps } from "../../../../store/store";
import { GlobalTypes } from "../../../../store/types";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import { CloudUpload } from "@mui/icons-material";
import Image from "next/image";
import TextEditor from "../../../TextEditor";
import { imageUpload } from "../../../../utils/imageUpload";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';

interface UserData {
  data: {
    _id: string;
    title: string;
    shortDescription: string;
    time: Date;
    photo: any;
    place: string;
    redirectionLink: string;
    detailedPage: string;
  };
  setUpdatedData: Function;
  handleCloseDialog: Function;
}

export default function Form({
  data,
  setUpdatedData,
  handleCloseDialog,
}: UserData) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();
  const page = router.query.page || 1;
  const search = router.query.search || "all";
  const past = router.pathname.includes('/past');
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { auth, loading } = state;

  const [userData, setUserData] = useState(data);
  
  const { title, shortDescription, time, photo, place, redirectionLink, detailedPage } = userData;
  
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(time));

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleDateChange: DateTimePickerProps<Dayjs>['onChange'] = (newDate) => {
    setSelectedDate(newDate || dayjs());
  };
 
  useEffect(() => {
    if (focused) {
      setErrorMessage([]);
    }
  }, [focused]);

  const showMessage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let media;
    dispatch({ type: GlobalTypes.LOADING, payload: { loading: true } });

    if (typeof photo === "object") media = await imageUpload([photo]);
    const res = await patchData(
      `admin/event/${data._id}`,
      { ...userData, photo: media ? media[0] : photo, time: selectedDate },
      auth?.token
    );

    const newData = await getData(
      `admin/event?search=${search}&page=${page}&limit=12&past=${past}`
    );
    setUpdatedData(newData.data);
    dispatch({
      type: GlobalTypes.EVENT_PAGE,
      payload: {
        totalPage: newData.pageCount,
        currentPage: newData.currentPage,
      },
    });
    dispatch({ type: GlobalTypes.LOADING, payload: false });

    if (res.err) return errorMessage.push(res.err) && showMessage();
    handleCloseDialog();
    dispatch({
      type: GlobalTypes.NOTIFY,
      payload: { notify: true, msg: "Updated successfully" },
    });
  };

  const photoInput = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoURL] = useState(photo);

  const handleChoosePhoto = () => {
    photoInput.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      if (newPhoto) {
        if (newPhoto.size > 10485760) {
          setErrorMessage((prevError) => [
            ...prevError,
            "Image size too large. Maximum size is 10 MB",
          ]);
          showMessage();
        } else {
          setUserData({ ...userData, photo: newPhoto });
          setPhotoURL(newPhotoURL);
          setErrorMessage([]);
        }
      }
    }
  };

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
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "title",
                  id: "title",
                  label: "Title",
                  value: title,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  multiline: true,
                  minRows: 3,
                  type: "text",
                  name: "shortDescription",
                  id: "shortDescription",
                  label: "Short Description",
                  value: shortDescription,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  orientation="landscape"
                  desktopModeMediaQuery="@media (max-width: 768px)"
                  sx={{
                    width: "100%",
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
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "place",
                  id: "place",
                  label: "Place",
                  value: place,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "redirectionLink",
                  id: "redirectionLink",
                  label: "Redirection link",
                  value: redirectionLink,
                  onChange: handleChange,
                  setFocused: setFocused,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                onClick={handleChoosePhoto}
                className="relative cursor-pointer w-full h-[15rem] flex justify-center items-center border border-slate-400 dark:border-stone-500"
              >
                <input
                  ref={photoInput}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                />
                {photoURL !== null && <Image src={photoURL} alt="" fill />}
                {photoURL === null && (
                  <Grid className="text-black dark:text-white flex flex-col gap-1 justify-center items-center">
                    <CloudUpload className="w-[3rem] h-[3rem]" />
                    <Typography className="p-0">Upload photo</Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <label className="text-black dark:text-white mb-2">
                Detailed page
              </label>
              <TextEditor detailedPage={detailedPage} setData={setUserData} />
            </Grid>
          </Grid>
          <Button
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
        </Box>
      </Box>
    </Container>
  );
}

interface Props {
  inputProps: {
    type: string;
    name: string;
    id: string;
    label: string;
    value?: string;
    multiline?: boolean;
    minRows?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setFocused: Function;
  };
}

const InputField = ({ inputProps }: Props) => {
  const {
    type,
    name,
    id,
    label,
    value,
    multiline,
    minRows,
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
    />
  );
};

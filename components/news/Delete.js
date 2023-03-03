import {
  Grid,
  Button,
  Dialog,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import { ThreeDots } from "react-loader-spinner";
import { deleteData, getData } from "../../utils/fetchData";
import { useTheme } from "next-themes";
import { Context } from "../../store/store";
import { GlobalTypes } from "../../store/types";
import { useRouter } from "next/router";

const Delete = ({ item, setData }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Grid className="text-white">
      <Tooltip title="Delete">
        <IconButton onClick={handleOpenDialog} className="">
          <DeleteIcon className="text-white" />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor:
              currentTheme === "dark" ? "rgb(63 63 70)" : "rgb(203 213 225)",

            width: "25rem",
          },
        }}
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <UpdateDialog
          item={item}
          setData={setData}
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </Grid>
  );
};

const UpdateDialog = ({ item, setData, handleClose }) => {
  const router = useRouter();
  const page = router.query.page || 1;
  const search = router.query.search || "all";
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await deleteData(`admin/news/${item._id}`, auth.token);
    const newData = await getData(`admin/news?search=${search}&page=${page}&limit=12`);
    setData(newData.data)
    dispatch({
      type: GlobalTypes.NEWS_PAGE,
      payload: { totalPage: newData.pageCount, currentPage: newData.currentPage },
    });
    setLoading(false);
    if (res.err) return setErrorMessage([res.err]);
    dispatch({
      type: GlobalTypes.NOTIFY,
      payload: { notify: true, msg: "Deleted successfully" },
    });
    if (handleClose !== undefined) handleClose();
  };

  return (
    <Grid className="w-full h-full flex items-center justify-center p-5">
      <Grid className="w-full flex flex-col gap-5 items-center justify-between">
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
        <Typography className="p-0 text-md text-zinc-700 dark:text-green-300">
          Are you sure you want to delete this item?
        </Typography>
        <Grid className="w-full h-full flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                if (handleClose !== undefined) handleClose();
              }}
              className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
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
                <Typography>Delete</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Delete;

import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Dialog,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SchoolIcon from "@mui/icons-material/School";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Context, StoreProps } from "../../../store/store";
import { useTheme } from "next-themes";
import Edit from "./Edit";
import Link from "next/link";
import { getData } from "../../../utils/fetchData";

interface SubscriptionProps {
  _id: string;
  title: string;
  facilities: { facility: string }[];
  price: string;
  per?: string;
  currency: string;
}

const Subscription = () => {
  const [data, setData] = useState<SubscriptionProps[]>([]);

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      if (!isCanceled) {
        const res = await getData("admin/subscription");
        setData(res.content);
      }
    };
    fetchData();
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <Grid className="w-full p-5 min-h-[50vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-lg md:text-xl uppercase">
            Subscription
          </Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
      <Grid className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {data?.map((item, i) => (
          <Grid
            key={i}
            className="w-full px-5 bg-green-900 dark:bg-zinc-700 text-slate-200"
          >
            <Contents item={item} i={i} setData={setData} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
interface Props {
  item: SubscriptionProps;
  i: number;
  setData: Function;
}
const Contents = ({ item, i, setData }: Props) => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState(false);
  const price =
    item.currency === "bdt" ? `${item.price} BDT` : `$${item.price} USD`;
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Grid className="w-full h-full p-5 flex flex-col items-center justify-between">
      <Grid className="flex flex-col">
        <Grid className="w-full relative flex items-center justify-center gap-2">
          <Avatar className="w-[30px] h-[30px] text-slate-700">
            {icons.find((icon) => icon.id === i)?.icon}
          </Avatar>
          <Typography className="p-0"> {item.title} </Typography>
          {auth?.user?.role === "admin" && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  onClick={handleOpenDialog}
                  className="absolute right-0"
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
                <Edit
                  data={item}
                  setData={setData}
                  handleCloseDialog={handleCloseDialog}
                />
              </Dialog>
            </>
          )}
        </Grid>
        <hr className="w-full my-5" />
        <Grid className="w-full flex flex-col items-center justify-center gap-3">
          {item.facilities.map((facility, i) => (
            <Grid key={i} className="flex items-start gap-3">
              <Avatar className="w-[15px] h-[15px] mt-[4px] text-slate-700 relative">
                <DoneIcon className="absolute w-full h-full" />
              </Avatar>
              <Typography className="p-0"> {facility.facility} </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid>
        <Grid className="w-full flex items-start justify-center py-5">
          <Typography className="p-0 text-2xl">{price}</Typography>
          <Typography className="p-0 text-xs">/{item.per}</Typography>
        </Grid>
        <Grid className="w-full flex justify-center">
          <Link className="no-underline" href={`${auth?.token? "/renew-membership" : "/login"}`}>
            <Button className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">
              Choose
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

const icons = [
  {
    id: 0,
    icon: <SchoolIcon />,
  },
  {
    id: 1,
    icon: <MilitaryTechIcon />,
  },
  {
    id: 2,
    icon: <WorkspacePremiumIcon />,
  },
];
export default Subscription;

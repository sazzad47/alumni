import React from "react";
import { Avatar, Grid, Typography, Button } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SchoolIcon from "@mui/icons-material/School";
import DoneIcon from '@mui/icons-material/Done';

const Subscription = () => {
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
      <Grid className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <Grid key={i} className="w-full bg-green-900 dark:bg-zinc-700 text-slate-200">
           <Contents item={item}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
interface Props {
  item: {
    id: number;
    title: string;
    icon: React.ReactNode;
    facilities: string[];
  }
}
const Contents = ({item}: Props)=> {
  return (
    <Grid className="w-full p-5 flex flex-col items-center justify-start">
      <Grid className="flex items-center gap-2">
        <Avatar className="w-[30px] h-[30px] text-slate-700"> {item.icon} </Avatar>
        <Typography className="p-0"> {item.title} </Typography>
      </Grid>
      <hr className="w-full my-5"/>
      <Grid className="w-full flex flex-col gap-3">
        {item.facilities.map((facility, i)=> (
             <Grid key={i} className="flex items-center gap-3">
             <Avatar className="w-[15px] h-[15px] text-slate-700 relative">
               <DoneIcon className="absolute w-full h-full"/>
             </Avatar>
             <Typography className="p-0"> {facility} </Typography>
           </Grid>
        ))}
      </Grid>
      <Grid className="w-full flex items-start justify-center py-5">
            <Typography className="p-0 text-2xl">$500</Typography>
            <Typography className="p-0 text-xs">
              /year
            </Typography>
      </Grid>
       <Grid className="w-full flex justify-center">
        <Button className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600">Choose</Button>
       </Grid>
    </Grid>
  )
}

const items = [
  {
    id: 1,
    title: "Full members",
    icon: <MilitaryTechIcon />,
    facilities: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
  {
    id: 2,
    title: "Student members",
    icon: <SchoolIcon />,
    facilities: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
  {
    id: 3,
    title: "Honorary members",
    icon: <WorkspacePremiumIcon />,
    facilities: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
];
export default Subscription;

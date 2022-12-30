import React from 'react'
import {Grid, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const ContactInfo = () => {
  return (
    <Grid className="w-full p-5 min-h-[50vh] bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
      <Grid className="w-full flex items-center justify-center py-3">
        <Grid className="flex items-center">
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
          <Typography className="px-1 text-2xl uppercase">Contact Info</Typography>
          <hr className="w-[5rem] h-[2px] text-slate-900 dark:text-slate-200" />
        </Grid>
      </Grid>
      <Grid className="grid grid-cols-4 gap-3">
        {items.map((item, i) => (
          <Grid key={i} className="w-full h-[10rem] relative bg-green-900 dark:bg-zinc-700 text-slate-200">
              <Content item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
interface Props {
    item: {
        id: number,
        title: string,
        icon: React.ReactNode,
        info: string
    }   
}
const Content = ({item}: Props)=> {
    return (
      <Grid className='w-full h-full flex items-start justify-center p-3'>
        <Grid className='w-full flex flex-col items-center justify-start gap-3'>
          <Grid className='flex flex-col items-center'>

         {item.icon}
         <Typography>{item.title} </Typography>
          </Grid>
         <Typography>{item.info} </Typography>
        </Grid>
      </Grid>
    )
}
const items = [
    {
     id: 1,
     title: "Location",
     icon: <LocationOnIcon/> ,
     info: "201 W Washington Ave 2nd Floor Madison, WI 53703"
    },
    {
     id: 2,
     title: "Mailing Address",
     icon: <ContactMailIcon/> ,
     info: "P.O. Box 7984 Madison, WI 53707"
    },
    {
     id: 3,
     title: "Phone",
     icon: <CallIcon/> ,
     info: "02222200000"
    },
    {
     id: 4,
     title: "Email",
     icon: <EmailIcon/> ,
     info: "test@gmail.com"
    },
]
export default ContactInfo
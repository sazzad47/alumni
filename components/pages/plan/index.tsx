import { Grid } from '@mui/material'
import dynamic from 'next/dynamic';
import React, { useContext, useState } from 'react'
import { Props } from '../../../pages/cookies'
import { Context, StoreProps } from '../../../store/store';
import parse from "html-react-parser";


const Update = dynamic(() => import("./update"), { ssr: false });

const Cookies: React.FC<Props> = ({data}) => {
  const [updatedData, setUpdatedData] = useState(data);
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;


  return (
    <Grid className="w-full flex flex-col gap-5">
      <Grid className="block ml-auto">
        {auth?.user?.role === "admin" && <Update data={updatedData} setUpdatedData={setUpdatedData} />}
      </Grid>
      <Grid className="w-full max-w-full text-black dark:text-white">
        {parse(updatedData?.detailedPage)}
      </Grid>
    </Grid>
  )
}

export default Cookies
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from "next/link";

export default function ResetSuccess() {
 
  return (
    <Container component="main" className="bg-slate-300 dark:bg-zinc-700 w-full md:w-[30rem] p-5 flex items-center justify-center">
      <Box
        className=""
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src="/logo.png" />
        <Grid className="flex items-center gap-2">
            <CheckCircleOutlineIcon/>
        <Typography component="h1" variant="h5">
          Password changed successfully!
        </Typography>
        </Grid>
       
          <Grid className="w-full p-5 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col">
           <Typography className="p-0">
           Your password has been changed successfully. You can now login with your new password. Thank you.
           </Typography>
          </Grid>
       
        <Box
          sx={{ mt: 3 }}
          className="w-full"
        >
         <Link href="/login">
          <Button
            className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            <Typography>Login</Typography>
          </Button>
         </Link>
         
        </Box>
      </Box>
    </Container>
  );
}

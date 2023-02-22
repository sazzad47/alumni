import { useRouter } from "next/router";
import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";

const Message = ({payment}: {payment: string | string[]}) => {
    
    const router = useRouter();
    return (
      <Container component="main" className="flex items-center justify-center">
        <Box
          className="bg-slate-300 dark:bg-zinc-700 w-[30rem] max-w-full p-5"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src="/logo.png" />
          <Grid className="flex items-center gap-2">
            {payment === "successful"? <CheckCircleOutlineIcon /> : <ErrorIcon />}
            <Typography component="h1" variant="h5">
              {`${payment === "successful"? "Payment successful!": "Payment failed!"}`}
            </Typography>
          </Grid>
  
          <Grid className="w-full p-5 mt-4 bg-stone-400 dark:bg-zinc-500 flex flex-col">
            <Typography className="p-0">
            {`${payment === "successful"? "We received your payment. Your membership is now pending approval by admin panel. You will be notified by email within 24 hours if your membership is approved. Thank you.": "We didn't receive your payment. Please try again with valid information. "}`}
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }} className="w-full">
            <Button
              className="normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => router.push('/')}
            >
              <Typography>Home</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };

  export default Message
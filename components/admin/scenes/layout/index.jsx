import React, { useMemo, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../theme";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api";

const Layout = ({ children }) => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{
          
            backgroundColor: theme.palette.background.default,
         
        }} display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
          />
          <Grid className="mt-[4rem] max-h-[88vh] overflow-y-auto">

          {children}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

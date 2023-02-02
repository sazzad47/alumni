import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { Button, Grid } from "@mui/material";

const DataGridCustomToolbar = ({setGetData}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%" mb='1rem' >
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <Grid className="hidden md:block">
        <Button onClick={()=> setGetData(prevState=> !prevState)} startIcon={<RefreshIcon/>}>Refresh</Button>
        </Grid>
      </FlexBetween>
      <Grid className="block md:hidden mb-2">
        <Button onClick={()=> setGetData(prevState=> !prevState)} startIcon={<RefreshIcon/>}>Refresh</Button>
        </Grid>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;

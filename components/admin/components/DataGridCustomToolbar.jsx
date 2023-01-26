import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { Button } from "@mui/material";

const DataGridCustomToolbar = ({setGetData}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%" mb='1rem' >
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <Button onClick={()=> setGetData(prevState=> !prevState)} startIcon={<RefreshIcon/>}>Refresh</Button>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;

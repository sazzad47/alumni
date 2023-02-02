import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUploadsQuery } from "../../state/api";
import Header from "../../components/Header";
import Manage from "./Manage";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { Context } from "../../../../store/store";
import { GlobalTypes } from "../../../../store/types";
import Upload from './Upload';


const Uploads = () => {
  const theme = useTheme();
  const { state, dispatch } = useContext(Context);
  const { loading } = state;
  const [getData, setGetData] = useState(false);
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const { refetch, data, isFetching } = useGetUploadsQuery();

  useEffect(() => {
    refetch();
    setGetData(false);
    dispatch({ type: GlobalTypes.LOADING, payload: false });
  }, [getData]);

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          date.getDate() +
          " " +
          date.toLocaleString("default", { month: "long" }) +
          " " +
          date.getFullYear()
        );
      },
    },
    {
      field: "userId",
      headerName: "User ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Username",
      sortable: false,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Name",
      sortable: false,
      flex: 1,
    },
    {
      field: "ssc_batch",
      headerName: "Batch",
      sortable: false,
      flex: 1,
    },
    {
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <Manage params={params} setGetData={setGetData} />;
      },
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Grid className="w-full flex justify-between">

      <Header
        title="Uploads"
        subtitle="Entire list of uploaded members"
      />
      <Upload setGetData={setGetData} />
      </Grid>
      <Box
        height="80vh"
        sx={{
          mt: "1rem",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isFetching || loading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.uploads) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { setGetData },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                email: false,
              },
            },
          }}
          
        />
      </Box>
    </Box>
  );
};

export default Uploads;

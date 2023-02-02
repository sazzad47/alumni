import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {Context} from '../../../../store/store'
import { GlobalTypes } from "../../../../store/types";
import { deleteData, patchData } from "../../../../utils/fetchData";



 export default function Manage ({params, setGetData}) {
 const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const viewProfile = async (params) => {
    let mongoID = params.row._id;
    router.push(`/members/profiles?id=${mongoID}`)
  };
  const cancelMembership = async (params) => {
    dispatch({ type: GlobalTypes.LOADING, payload: true });
    let userId = params.row.userId;
    
    await patchData(`members/approved/${userId}`, { subscription: 'none' });
    setGetData(prevState => !prevState );
   
  };

  const handleDelete = () => {
    let userId = params.row.userId;
    
    deleteData(`members/pendings/${userId}`);
    setGetData(true);
  };
    
    return (
        <>
      <strong>
        <Button
          onClick={handleClick}
          aria-controls={open ? "manage-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Manage
        </Button>
      </strong>
      <Menu
        anchorEl={anchorEl}
        id="manage-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: "0px 0px 25px 25px rgba(0,0,0,0.2)",
            backgroundColor: "",
            color: "",
            overflow: "visible",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={()=> viewProfile(params)} className="">
          View profile
        </MenuItem>
        <MenuItem onClick={()=> cancelMembership(params)} className="">
          Cancel membership
        </MenuItem>
      </Menu>
        </>
    );
  };

 
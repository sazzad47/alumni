import { IconButton, Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Context, StoreProps } from '../store/store';
import { GlobalTypes } from '../store/types';

const Toast = () => {
  const { state, dispatch } = useContext(Context) as StoreProps;
  const { notify, msg } = {...state.notify};

  const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({type: GlobalTypes.NOTIFY, payload: {notify: false, msg: ""}});
  };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseToast}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
  return (
    <Snackbar
        open={notify}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={msg}
        action={action}
      />
  )
}

export default Toast
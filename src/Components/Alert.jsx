import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react'
import { CryptoState } from '../CryptoContext'

const AlertM = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Alert() {
    const {alert, setAlert} = CryptoState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({open: false});
      };
  return (
     <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <AlertM onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </AlertM>
      </Snackbar>
  )
}

export default Alert
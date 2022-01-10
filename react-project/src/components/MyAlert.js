import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
function MyAlert(props) {
    const {show,type,content}=props.alert;
    return (
    <Stack  width={"100%"} mb={4}>
        <Collapse in={show}>
        <Alert 
        sx={{ justifyContent:"center",borderRadius:"16px",marginLeft:"25%", marginRight:"25%" }} 
        severity={type}
        action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.closeAlert()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
            {content}</Alert>
            </Collapse>
    </Stack>
    )
}

export default MyAlert

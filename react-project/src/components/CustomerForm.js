import React from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import MyAlert from './MyAlert';
function CustomerForm(props) {
    return (
        <div style={{ width: "50%", textAlign: "center" }}>
            <h2>Customer Register Form</h2>
            {
                props.alert && props.alert.at===1 && <MyAlert alert={props.alert} width={"50%"} closeAlert={props.closeAlert}/>
            }

            <Box sx={{ display: 'block', width: "50%", marginLeft: "25%" }}>
                <TextField label="Full Name" variant="outlined" type="text"
                    name="customerName"
                    sx={{ width: '100%' }}
                    onChange={props.changeNewCustomerName}
                />

                <TextField label="Phone Number" variant="outlined" type="text"
                    name="phoneNumber"
                    sx={{ width: '100%', marginTop: "12px" }}
                    onChange={props.changeNewCustomerPhone}
                />

                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ width: '50%', marginTop: "12px" }}
                    onClick={() => {
                        props.addNewCustomer(props.newCustomer)
                    }}>
                    apply</Button>
            </Box>

        </div>
    )
}

export default CustomerForm

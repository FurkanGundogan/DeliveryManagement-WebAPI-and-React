import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CustomerEditModal(props) {

  
    const {modalIsOpen,editCustomer}=props.edit;
    const [editedUser, setEditedUserState] = useState(editCustomer)
    return (
        <Modal
            open={modalIsOpen}
           onClose={()=>props.cancelUpdateCustomer()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Customer
            </Typography>   
            <TextField label="Full Name" variant="outlined" type="text"
                    name="customerName"
                    value={editedUser.customerName}
                    onChange={(e)=>setEditedUserState({...editedUser,customerName:e.target.value})}
                    sx={{ width: '100%', marginTop: "12px" }}
                    
                />

                <TextField label="Phone Number" variant="outlined" type="text"
                    name="phoneNumber"
                    value={editedUser.phoneNumber}
                    onChange={(e)=>setEditedUserState({...editedUser,phoneNumber:e.target.value})}
                    sx={{ width: '100%', marginTop: "12px" }}
                    
                />
                <div style={{display:"flex"}}> 
                <Button
                    variant="outlined"
                    endIcon={<SaveAsIcon />}
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={()=>{
                            props.updateCustomer(editedUser.customerId,editedUser)
                    }}
                    >
                    SAVE</Button>
                    <div style={{width:"50%"}}></div>
                    <Button
                    variant="outlined"
                    color="error"
                    onClick={()=>{
                        
                        props.cancelUpdateCustomer()
                    }}
                    endIcon={<CancelIcon />}
                    sx={{ width: '25%', marginTop: "12px" }}
                    >
                    cancel</Button>
                </div>
            </Box>
        </Modal>
    );
}

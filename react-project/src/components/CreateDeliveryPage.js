import React, { useState,useEffect,useContext } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DeliveryContext } from './DeliveryContext';
import axios from 'axios'
const CreateDeliveryPage = (props) => {
    const { deliveryAlert,setAlert } = useContext(DeliveryContext)
    const initialState = {
        delivery: {
            arriveDate:"2000-01-01T01:00:00",
            customerId:0,
            address:"",
            statusId:1,
          },
        alert:{
            show:false,
            content:""
        },
        customerList:[]
    }

    const handleChange = (evt) => {
        
        let {name,value}=evt.target
        setState({...state,delivery:{...state.delivery,[name]: value}})
        
    }

    const [state, setState] = useState(initialState);
    

    useEffect(async () => {
        
        try {
            const res = await axios.get(`https://localhost:44357/api/Customers`)
            setState({...state,customerList:res.data})
            
        }
        catch (e) {
            console.log("error")
        }

      },[]);

    return (
        <div>
            <h2>New Delivery Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            <Box sx={{ display: 'block', width: "30%", marginLeft: "35%" }}>
                <TextField label="Address" variant="outlined" type="text"
                    name="address"
                    multiline
                    rows={3}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{marginTop:"12px"}}>
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.delivery.customerId}
                        label="Customer"
                        onChange={(e)=>{
                            setState({...state,delivery:{...state.delivery,customerId:e.target.value}})
                        }}
                        sx={{textAlign:"left"}}
                    >
                        {
                        state.customerList &&
                        state.customerList.map(item =>(
                            <MenuItem  key={item.customerId} value={item.customerId}>{item.customerName}</MenuItem>
                        ))
                        }

                        
                       
                    </Select>
                </FormControl>
                <div style={{width:"100%",marginTop:"14px",textAlign:"left"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                            value={state.delivery.arriveDate}
                            label="Arrive Date"
                            
                            inputFormat="dd/MM/yyyy"
                            onChange={(newValue)=>{
                                newValue.setHours(newValue.getHours()+3)
                                setState({...state,delivery:{...state.delivery,arriveDate:newValue.toISOString()}})
                            }}
                            renderInput={(params) => <TextField {...params} sx={{width:"100%"}} />}
                            />
                </LocalizationProvider>
                </div>
                <div style={{display:"flex"}}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        if(state.delivery.address!=="" && state.delivery.customerId!==""){
                            
                            try {

                                axios("https://localhost:44357/api/Deliveries", {
                                    method: "POST",
                                    header: { "Context-type": "application/json" },
                                    data: state.delivery
                                })
                                    .then(response => {
                                        window.location = '/';
                                    })
                            } catch (error) {
                                console.log("Add Delivery Error:", error)
                            }
                        }else{

                        }
                        
                    }}>
                    apply</Button>
                    <div style={{width:"50%"}}></div>
                    <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    color="error"
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        window.location = '/DeliveryPage/';

                    }}>
                    Cancel</Button>
                    </div>
            </Box>
        </div>
    )
}

export default CreateDeliveryPage

import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import { useParams } from 'react-router-dom'
const CreateDeliveryPage = () => {
    const { id } = useParams()
    const initialState = {
        delivery: {
            arriveDate: "2000-01-01T01:00:00",
            customerId: 0,
            address: "",
            statusId: 1,
        },
        alert: {
            show: false,
            content: ""
        },
        customerList: [],
        statusList: [],

    }

    const handleChange = (evt) => {

        let { name, value } = evt.target
        setState({ ...state, delivery: { ...state.delivery, [name]: value } })

    }

    const [state, setState] = useState(initialState);


    useEffect(async () => {

        try {
            const resDeliveries = await axios.get(`https://localhost:44357/api/Deliveries/` + id)

            const resCustomers = await axios.get(`https://localhost:44357/api/Customers`)

            const resStatus = await axios.get(`https://localhost:44357/api/Status`)
            setState({ ...state, statusList: resStatus.data, customerList: resCustomers.data, delivery: resDeliveries.data })


        }
        catch (e) {
            console.log("error")
        }

    }, []);

    return (
        <div>
            <h2>Edit Delivery Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            <Box sx={{ display: 'block', width: "30%", marginLeft: "35%" }}>
                <TextField label="Address" variant="outlined" type="text"
                    name="address"
                    multiline
                    rows={3}
                    sx={{ width: '100%' }}
                    value={state.delivery.address}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{ marginTop: "12px" }}>
                    <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.delivery.customerId}
                        label="Customer"
                        onChange={(e) => {
                            setState({ ...state, delivery: { ...state.delivery, customerId: e.target.value } })
                        }}
                        sx={{ textAlign: "left" }}
                    >
                        {
                            state.customerList &&
                            state.customerList.map(item => (
                                item.deliveryId === id ?
                                    <MenuItem selected key={item.customerId} value={item.customerId}>{item.customerName}</MenuItem>
                                    :
                                    <MenuItem key={item.customerId} value={item.customerId}>{item.customerName}</MenuItem>
                            ))
                        }



                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: "12px" }}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.delivery.statusId}
                        label="Customer"
                        onChange={(e) => {
                            setState({ ...state, delivery: { ...state.delivery, statusId: e.target.value } })
                        }}
                        sx={{ textAlign: "left" }}
                    >
                        {
                            state.statusList &&
                            state.statusList.map(item => (
                                item.deliveryId === id ?
                                    <MenuItem selected key={item.statusId} value={item.statusId}>{item.message}</MenuItem>
                                    :
                                    <MenuItem key={item.statusId} value={item.statusId}>{item.message}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
                <div style={{ width: "100%", marginTop: "14px", textAlign: "left" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={state.delivery.arriveDate}
                            label="Arrive Date"

                            inputFormat="dd/MM/yyyy"
                            onChange={(newValue) => {
                                newValue.setHours(newValue.getHours() + 3)
                                setState({ ...state, delivery: { ...state.delivery, arriveDate: newValue.toISOString() } })
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{display:"flex"}}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        console.log(state)
                        axios("https://localhost:44357/api/Deliveries/" + id, {
                            method: "PUT",
                            header: { "Context-type": "application/json" },
                            data: state.delivery
                        })
                            .then(response => {
                                window.location = '/DeliveryDetailsPage/'+id;
                                console.log(response.status)
                            })

                    }}>
                    apply</Button>
                    <div style={{width:"50%"}}></div>
                    <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    color="error"
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        window.location = '/DeliveryDetailsPage/'+id;

                    }}>
                    Cancel</Button>
                    </div>

            </Box>
        </div>
    )
}

export default CreateDeliveryPage

import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { useContext,useEffect  } from 'react';
import { DeliveryContext } from './DeliveryContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StatusQueryComp from './StatusQueryComp';

function DeliveryPage() {
    const { deliveries,getDeliveries,setDetails } = useContext(DeliveryContext)
    const [query, setQuery] = useState(0)
    
    useEffect(async () => {
        
        try {
            const res = await axios.get(`https://localhost:44357/api/Deliveries`)
            getDeliveries(res.data)
            
        }
        catch (e) {
            console.log("error")
        }
        // bos array, didmount'da çalismasini sagladi
        // yoksa loop'a giriyordu
      },[]);
    return (
        <div>
            <h2>Delivery List Page</h2>
            
            <Link to={"/CreateDeliveryPage"}>                            
                    <Button
                    variant="outlined"
                    color="info"
                    startIcon={<AddCircleOutlineIcon />}>
                    New Delivery</Button>
                </Link>
           
            <div style={{ display: "block", width: "100%"}}>
                {
                
                    deliveries.length!==0 &&
                    (
                        <div style={{ width: "60%",marginLeft:"20%" }}>
                            <StatusQueryComp setQuery={setQuery}/>
                            <TableContainer component={Paper} >
                            
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: "16px" }}>Delivery ID</TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">Customer ID</TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">Customer Name</TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">Number of Products</TableCell>
                                        <TableCell sx={{ fontSize: "16px" }} align="right">Status</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        deliveries.map(item =>
                                        (
                                            <TableRow
                                                key={item.deliveryId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,
                                                display:(query===0 | item.status.statusId===query)?"table-row":"none"
                                            }}
                                            >
                                                <TableCell component="th" scope="row">{item.deliveryId}</TableCell>
                                                <TableCell align="right">{item.customerId}</TableCell>
                                                <TableCell align="right">{item.customer.customerName}</TableCell>
                                                <TableCell align="right">{item.deliveryItems.length}</TableCell>
                                                <TableCell align="right">{item.status.message}</TableCell>
                                                <TableCell align="right">
                                                <Link to={`/DeliveryDetailsPage/${item.deliveryId}`}>
                                                
                                                    <Button
                                                    variant="outlined"
                                                    color="info"
                                                    startIcon={<InfoIcon />}
                                                    onClick={() => {
                                                        setDetails({deliveryId:item.deliveryId})
                                                    }}>
                                                    MORE</Button>
                                                </Link>
                                                </TableCell>

                                            </TableRow>
                                        )
                                        )
                                            
                                    }
                                </TableBody>
                            </Table>

                        </TableContainer>
                        </div>
                        
                    )
                }
            </div>
        </div >

    )
}


export default DeliveryPage;
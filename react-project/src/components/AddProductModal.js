import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { DeliveryContext } from './DeliveryContext';
import { useContext } from 'react';
import axios from 'axios';
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

export default function AddProductModal(props) {

    const [products, setProducts] = useState(props.info)
    const { deliveryDetails, setDetails } = useContext(DeliveryContext)
    const [selectedItem, setselectedItem] = useState({})
    return (
        <Modal
            open={(products !== "")}
            onClose={() => {
                props.setInfo("")
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Product
                </Typography>
                <FormControl fullWidth sx={{ marginTop: "12px" }}>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedItem}
                        label="Product"
                        onChange={(e) => {
                            setselectedItem(e.target.value)
                        }}
                        sx={{ textAlign: "left" }}
                    >
                        {
                            products &&
                            products.map(item => (
                                <MenuItem key={item.productId} value={item}>{item.name}</MenuItem>
                            ))
                        }



                    </Select>
                </FormControl>

                <div style={{ display: "flex" }}>
                    <Button
                        variant="outlined"
                        endIcon={<SaveAsIcon />}
                        sx={{ width: '25%', marginTop: "12px" }}
                        onClick={() => {
                            axios("https://localhost:44357/api/DeliveryItems", {
                                method: "POST",
                                header: { "Context-type": "application/json" },
                                data: {
                                    deliveryId: props.deliveryId,
                                    productId: selectedItem.productId,
                                }
                            })
                                .then(response => {
                                    // gönderilen data ve dönen data ile 
                                    // doğru bir şekilde state'i güncelledim

                                    setDetails({
                                        ...deliveryDetails, deliveryItems: [...deliveryDetails.deliveryItems, {
                                            deliveryId: props.deliveryId,
                                            deliveryItemId: response.data.deliveryItemId,
                                            product: {
                                                productId: selectedItem.productId,
                                                price: selectedItem.price,
                                                name: selectedItem.name,
                                                deliveryItems: []
                                            },
                                            productId: selectedItem.productId
                                        }]
                                    })
                                    props.setInfo("")
                                    props.setTotalPrice(props.totalPrice+selectedItem.price)
                                })


                        }}
                    >
                        SAVE</Button>
                    <div style={{ width: "50%" }}></div>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {

                            console.log("back")
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

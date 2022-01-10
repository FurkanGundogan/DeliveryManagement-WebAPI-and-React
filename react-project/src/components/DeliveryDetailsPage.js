import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useContext, useEffect,useState } from 'react';
import { DeliveryContext } from './DeliveryContext';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
export default function DeliveryDetailsPage() {
    const { id } = useParams()
    const { deliveryDetails, setDetails } = useContext(DeliveryContext)
    const [date, setdate] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [addProductState, setaddProductState] = useState("")
    useEffect(async () => {

        try {
            const res = await axios.get(`https://localhost:44357/api/Deliveries/` + id)
            setDetails(res.data)
            
            var d = new Date(res.data.arriveDate);
            setdate(d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear())

            let total=0
            console.log(res.data)
            res.data.deliveryItems.map(i=>{
                total=total+i.product.price
                console.log(total)
                setTotalPrice(total)
            })
        }
        catch (e) {
            console.log("error")
        }
      
    }, []);
    return (
        <div>
             {
                 // addProductState ürünler listesi
                 // addProduct butonuna tıklayınca liste doluyor ve açılıyor
                 // setInfo'daki fonksiyon ise modelden çağrılıyor ve dizi boşaltılıyor
                 // bu sayede kapanması da sağlanıyor
                    addProductState!=="" &&
                    <AddProductModal 
                    info={addProductState}
                    setInfo={setaddProductState} 
                    deliveryId={id}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}

                    />
                }
            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"monospace"}}>
                Delivery Report
            </Typography>
            <Card sx={{ maxWidth: "50%", textAlign: "left", marginLeft: "25%" }}>
                {
                    deliveryDetails !== undefined && deliveryDetails.customer !== undefined && (
                        <React.Fragment>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Customer
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {deliveryDetails.customer.customerName}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Status
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {deliveryDetails.status.message}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Arrive Date
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {date}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Products
                                </Typography>
                                {
                                    <TableContainer component={Paper} >
                                        <Table aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "16px" }}>Product Title</TableCell>
                                                    <TableCell sx={{ fontSize: "16px" }} align="right">Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {

                                                    deliveryDetails.deliveryItems.map(item =>
                                                    (
                                                        <TableRow
                                                            key={item.deliveryItemId}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">{item.product.name}</TableCell>
                                                            <TableCell align="right">{item.product.price}</TableCell>
                                                            <TableCell align="right">
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    startIcon={<DeleteIcon />}
                                                                    onClick={async()=>{
                                                                        const res = await axios.delete(`https://localhost:44357/api/DeliveryItems/`+item.deliveryItemId)
                                                                        if(res.status===204){
                                                                            setDetails({
                                                                                ...deliveryDetails,
                                                                                deliveryItems:deliveryDetails.deliveryItems.filter(e => e.deliveryItemId !== item.deliveryItemId)
                                                                            })
                                                                            setTotalPrice(totalPrice-item.product.price)
                                                                        }
                                                                    }}>
                                                                    Remove Item</Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                    )
                                                        
                                                }
                                                <TableRow
                                                    key={99}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" sx={{fontWeight:"bold"}} > 
                                                    Total Price
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" sx={{fontWeight:"bold"}} align="right"> 
                                                    {totalPrice}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    </TableContainer>

                                }
                                <Typography gutterBottom variant="h6" component="div" mt={2}>
                                    Address
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {deliveryDetails.address}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                size="small"
                                onClick={async ()=>{
                                    const res = await axios.get(`https://localhost:44357/api/Products`)
                                    
                                    if(res.status===200){
                                    setaddProductState(res.data)
                                     }
                                }}
                                >Add Product</Button>
                                <Link to={`/EditDeliveryPage/${id}`}>
                                    <Button size="small">Edit </Button>
                                </Link>
                                <Button color="error" size="small" onClick={async()=>{
                                    try {
                                        const res = await axios.delete(`https://localhost:44357/api/Deliveries/` + id)
                                        if(res.status===204)
                                            window.location = '/';
                                    }
                                    catch (e) {
                                        console.log("error")
                                        }
                                }}>Remove This Delivery</Button>
                            </CardActions>
                        </React.Fragment>
                    )
                }
            </Card>
        </div>
    );
}
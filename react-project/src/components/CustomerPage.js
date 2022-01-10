import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux'
import {
    getCustomers, changeNewCustomerName, changeNewCustomerPhone,
    addNewCustomer, deleteCustomer,getCustomer,updateCustomer,
    cancelUpdateCustomer,closeAlert
} from '../reducers/CustomerActions'
import CustomerForm from './CustomerForm';
import CustomerEditModal from './CustomerEditModal';
import MyAlert from './MyAlert';



class CustomerPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        this.props.getCustomers()

    }
    componentDidUpdate() {
        
    }

    render() {

        return (
            <div>
                <h2>Customer Page</h2>
                {
                    this.props.edit &&
                    this.props.edit.modalIsOpen &&
                    <CustomerEditModal 
                    edit={this.props.edit} 
                    cancelUpdateCustomer={this.props.cancelUpdateCustomer}
                    updateCustomer={this.props.updateCustomer}/>
                }
                <div style={{ display: "flex", width: "100%" }}>
                    {
                        this.props.localCustomerList && (
                            <div style={{ width: "50%" }}>
                                {
                                    this.props.alert && 
                                    this.props.alert.at===0 && 
                                    <MyAlert alert={this.props.alert} width={"75%"} closeAlert={this.props.closeAlert}/>
                                }
                                <TableContainer component={Paper} >
                                
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: "16px" }}>Customer Full Name</TableCell>
                                            <TableCell sx={{ fontSize: "16px" }} align="right">Phone Number</TableCell>
                                            <TableCell sx={{ fontSize: "16px" }} align="right">Total Delivery</TableCell>
 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            this.props.localCustomerList.map(item =>
                                            (
                                                <TableRow
                                                    key={item.customerId}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{item.customerName}</TableCell>
                                                    <TableCell align="right">{item.phoneNumber}</TableCell>
                                                    <TableCell align="right">{item.deliveries.length}</TableCell>
                                                    <TableCell align="right"><Button
                                                        variant="outlined"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => {
                                                            this.props.getCustomer(item.customerId)
                                                        }}>
                                                        Edit</Button>
                                                    </TableCell>
                                                    <TableCell align="right"><Button
                                                        variant="outlined"
                                                        color="error"
                                                        startIcon={<DeleteIcon />}
                                                        sx={{justifyContent:"end"}}
                                                        onClick={() => {
                                                            this.props.deleteCustomer(item.customerId,item.deliveries.length)
                                                        }}>
                                                        </Button>
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
                   <CustomerForm
                   alert={this.props.alert}
                   newCustomer={this.props.newCustomer}
                   changeNewCustomerName={this.props.changeNewCustomerName}
                   changeNewCustomerPhone={this.props.changeNewCustomerPhone}
                   addNewCustomer={this.props.addNewCustomer}
                   closeAlert={this.props.closeAlert}
                   />
                </div>
            </div >

        )
    }
}

const mapStateToProps = (state) => {

    return {
        localCustomerList: state.customers,
        newCustomer: state.newCustomer,
        alert: state.alert,
        edit:state.edit,
    }
}
const myDispatchFuncs = {
    getCustomers,
    changeNewCustomerName,
    changeNewCustomerPhone,
    addNewCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer,
    cancelUpdateCustomer,
    closeAlert
}

export default connect(mapStateToProps, myDispatchFuncs)(CustomerPage);
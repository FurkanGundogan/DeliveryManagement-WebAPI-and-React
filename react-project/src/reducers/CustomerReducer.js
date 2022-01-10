const initialState = {
    customers: [],
    newCustomer: {
        customerName: "",
        phoneNumber: ""
    },
    alert: {
        show: false,
        type: "",
        at:0,
        content: ""
    },
    edit: {
        modalIsOpen: false,
        editCustomer: {
            customerName: "",
            phoneNumber: ""
        }
    }
};


const CustomerReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'LIST':
            return {

                ...state,
                customers: action.payload

            }
        case "ChangeNewCustomerName":
            return {
                ...state,
                newCustomer: { ...state.newCustomer, customerName: action.payload }
            }
        case "ChangeNewCustomerPhone":
            return {
                ...state,
                newCustomer: { ...state.newCustomer, phoneNumber: action.payload }
            }
        case 'ADD':
            return {
                ...state,
                customers: [
                    ...state.customers, action.payload
                ],
                alert: {
                    show: true,
                    type: "success",
                    at: 1,
                    content: "Registeration Successfull"
                }
            }
        case 'ADDERROR':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 1,
                    type: "error",
                    content: "Please Fill Form Properly"
                }
            }
        case 'DELETE':
            return {
                ...state,
                customers: state.customers.filter(item => item.customerId !== action.payload),
                alert: {
                    show: true,
                    at: 0,
                    type: "success",
                    content: "Delete Successfull"
                }
            }
        case 'DELETEERROR':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 0,
                    type: "error",
                    content: "This Customer Has Deliveries"
                }
            }
        case 'GETCUSTOMER':
            return {
                ...state,
                edit: {
                    modalIsOpen: true,
                    editCustomer: action.payload
                }
            }
        case 'UPDATECUSTOMER':
            return {
                ...state,
                customers:state.customers.map(item => (item.customerId === action.payload.customerId?action.payload:item)),
                edit: {
                    ...state.edit,
                    modalIsOpen: false,
                },
                alert: {
                    show: true,
                    at: 0,
                    type: "success",
                    content: "Customer Updated"
                },

            }
        case 'CANCELUPDATECUSTOMER':
            return {
                ...state,
                edit: {
                    modalIsOpen: false,
                },

            }
        case 'NOUPDATECUSTOMER':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 0,
                    type: "info",
                    content: "No Change"
                },
                edit: {
                    modalIsOpen: false,
                },

            }
        case 'CLOSEALERT':
            return {
                ...state,
                alert: {
                    ...state.alert,
                    show: false,
                },

            }
        default: return state
    }

    return state;
}

export default CustomerReducer;
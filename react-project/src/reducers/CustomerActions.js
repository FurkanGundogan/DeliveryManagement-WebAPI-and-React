import axios from 'axios'

export const getCustomers = () => async dispatch => {

    try {
        const res = await axios.get(`https://localhost:44357/api/Customers`)
        dispatch({
            type: "LIST",
            payload: res.data
        })
    }
    catch (e) {
        console.log("error")
    }

}

export const changeNewCustomerName = (e) => async dispatch => {

    dispatch({
        type: "ChangeNewCustomerName",
        payload: e.target.value
    })

}

export const changeNewCustomerPhone = (e) => async dispatch => {

    dispatch({
        type: "ChangeNewCustomerPhone",
        payload: e.target.value
    })

}


export const addNewCustomer = (newCustomer) => async dispatch => {

    if (newCustomer !== undefined && newCustomer.customerName !== "" && newCustomer.phoneNumber !== "") {
        try {
            axios("https://localhost:44357/api/Customers", {
                method: "POST",
                header: { "Context-type": "application/json" },
                data: newCustomer
            })
                .then(response => {

                    dispatch({
                        type: "ADD",
                        payload: response.data
                    })
                })
        } catch (error) {
            console.log("Add Error:", error)
        }


    } else {


        dispatch({
            type: "ADDERROR",
        })
    }


}

export const deleteCustomer = (id, length) => async dispatch => {
    if (length ===0) {
        if (id) {
            axios("https://localhost:44357/api/Customers/" + id, {
                method: "DELETE",
                header: { "Context-type": "application/json" },
            })
                .then(response => {
                    
                    dispatch({
                        type: "DELETE",
                        payload: id
                    })
                })
        }
    }else{
        dispatch({
            type: "DELETEERROR",
        })
    }
}

export const getCustomer = (id) => async dispatch => {

    try {
        const res = await axios.get(`https://localhost:44357/api/Customers/` + id)
        dispatch({
            type: "GETCUSTOMER",
            payload: res.data
        })
    }
    catch (e) {
        console.log("error")
    }

}

export const updateCustomer = (id, customer) => async dispatch => {

    try {
        axios("https://localhost:44357/api/Customers/" + id, {
            method: "PUT",
            header: { "Context-type": "application/json" },
            data: customer
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: "UPDATECUSTOMER",
                        payload: customer
                    })
                } else {
                    dispatch({
                        type: "NOUPDATECUSTOMER",
                    })
                }

            })
    } catch (error) {
        console.log("Update Error:", error)
    }

}


export const cancelUpdateCustomer = () => async dispatch => {
    dispatch({
        type: "CANCELUPDATECUSTOMER"
    })
}

export const closeAlert = () => async dispatch => {
    dispatch({
        type: "CLOSEALERT"
    })
}
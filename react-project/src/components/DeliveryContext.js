import React, { createContext } from 'react'
import { useState } from 'react'
export const DeliveryContext = createContext()

export const DeliveryContextProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([])
  const [deliveryDetails, setDeliveryDetails] = useState()

  const getDeliveries = (deliveries) =>{
    setDeliveries(deliveries)
  }

  const setDetails = (delivery) =>{
    setDeliveryDetails(delivery)
  }

 

  const value = {
    deliveries,
    getDeliveries,
    deliveryDetails,
    setDetails,

  }

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
}

import React, { useState } from 'react'
import axios from 'axios'
const CreateProductPage = () => {

    const initialState = {
        product: {
            name: "",
            price: "",
          },
        alert:{
            show:false,
            content:""
        }
    }

    const handleChange = (evt) => {
        let {name,value}=evt.target
        setState({...state,product:{...state.product,[name]: value}})
        console.log(state)
    }

    const [state, setState] = useState(initialState);

    return (
        <div>
            <h2>New Product Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            <p>
                <label>Product Title
                    <input type="text"
                        name="name"
                        onChange={handleChange}
                    />
                </label>
                <label>Price
                    <input type="number"
                        name="price"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={() => {
                    if(state.product.name==="" | state.product.price===null){
                        setState({...state,alert:{show:true,content: "İlgili alanları doldurunuz."}})
                        
                    }else{
                        if(state.product.price<=0){
                            setState({...state,alert:{show:true,content: "Ücret Sıfırdan Büyük olmalı"}})
                        }else{

                        
                        axios("https://localhost:44357/api/Products", {
                            method: "POST",
                            header: { "Context-type": "application/json" },
                            data: state.product
                        })
                            .then(response => {
                                response.data && setState({...state,alert:{show:true,content: "Kayıt Başarılı"}})
                            })
                        }
                    }
                    
                }}>Add</button>
            </p>
        </div>
    )
}

export default CreateProductPage

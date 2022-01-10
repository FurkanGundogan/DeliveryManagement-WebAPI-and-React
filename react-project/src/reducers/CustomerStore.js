import { createStore,applyMiddleware } from "redux";
import CustomerReducer from "./CustomerReducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
const initalState = {

}
const middleware = [thunk]
const store = createStore(CustomerReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
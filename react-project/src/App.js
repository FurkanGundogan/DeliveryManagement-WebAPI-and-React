import './App.css';
import { Provider } from 'react-redux';
import store from './reducers/CustomerStore';
import CreateProductPage from './components/CreateProductPage';
import CustomerPage from './components/CustomerPage';
import DeliveryPage from './components/DeliveryPage';
import DeliveryDetailsPage from './components/DeliveryDetailsPage';
import EditDeliveryPage from './components/EditDeliveryPage';
import { DeliveryContextProvider } from './components/DeliveryContext';
import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
import CreateDeliveryPage from './components/CreateDeliveryPage';
import Navbar from './components/Navbar';

// customer=>redux
function App() {
  return (

    <Provider store={store}>
      <DeliveryContextProvider>


        <BrowserRouter>
          <Navbar />
          <div className="App" style={{ marginTop: "100px" }}>
          <Routes>
            <Route exact path="/" element={<DeliveryPage />} />
            <Route exact path="/CustomerPage" element={<CustomerPage />} />
            <Route exact path="/DeliveryPage" element={<DeliveryPage />} />
            <Route exact path="/DeliveryDetailsPage/:id" element={<DeliveryDetailsPage />} />
            <Route exact path="/CreateDeliveryPage" element={<CreateDeliveryPage />} />
            <Route exact path="/EditDeliveryPage/:id" element={<EditDeliveryPage />} />
          </Routes>
        </div>
      </BrowserRouter>

    </DeliveryContextProvider>
    </Provider >
    
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Add this import
import { store, persistor } from './redux/store'; // Import the persistor
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Box } from '@mui/material';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import SearchResults from './components/header/SearchResults';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import PaymentSuccess from './components/cart/PaymentSuccess';
import PaymentFailed from './components/cart/PaymentFailed';
import PrivateRoutes from './components/login/PrivateRoutes';
import DashBoardApp from './dashboard/DashBoardApp';



function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position={"bottom-center"}
            autoClose={2000}
          />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Header />
            <Box marginTop="54px">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/detail/:id" element={<DetailView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<PrivateRoutes Component={PaymentSuccess} />} />
                <Route path="/failed" element={<PrivateRoutes Component={PaymentFailed} />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/dashboard/*" element={<PrivateRoutes Component={DashBoardApp} />} />
              </Routes>
            </Box>
          </motion.div>
        </PersistGate>
      </Provider>
    </BrowserRouter >
  );
}

export default App;

import './App.css';
import ProductDetail from './components/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import ProductCategories from './components/ProductCategories';
import Login from './components/Login';
import AllProducts from './components/AllProducts';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Register from './components/Register';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditAccount from './components/EditAcount';
import OrderDetail from './components/OrderDetail';
import EditPassword from './components/EditPassword';
import GoToTopBtn from './components/GoToTopBtn';
import CartResponsive from './components/CartResponsive';

import DBreset from './components/DBreset';
import NoMatch from './components/NoMatch';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <DBreset />
      <GoToTopBtn />
      <CartResponsive />
      <Navbar />
      <div className="content-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:categorySlug" element={<ProductCategories />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<EditAccount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/resetpassword/:id" element={<EditPassword />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

import React from 'react'
import { Route, Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Collection from './pages/Collection'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import  Product from './pages/Product'
import Footer from './components/Footer'
import CreateProduct from './pages/CreateProduct'
import ScrollToTop from './components/ScrollToTop'
import PlaceOrder from './pages/PlaceOrder'
import Contact from './pages/Contact'
import About from './pages/About'


const App = () => {
  return (
    <div className='font-["Neue_Montreal"] p-2 '>
      <Navbar />
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderssss" element={<Order />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path ='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App
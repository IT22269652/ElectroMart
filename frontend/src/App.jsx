// src/App.jsx
import "regenerator-runtime/runtime";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import Navbar from "./components/Navbar";
import Feedback from "./pages/Feedback";
import Footer from "./components/Footer";
import Feedbackdetails from "./pages/Feedbackdetails";
import Updatefeedback from "./pages/Updatefeedback";
import Header from "./components/Header";
import AdminLogin from "./pages/ProductHandling/AdminLogin";
import AdminDashboard from "./pages/ProductHandling/AdminDashboard";
import ProductForm from "./pages/ProductHandling/ProductForm";
import Admin from "./pages/ProductHandling/Admin";
import Privacy from "./pages/Privacy";
import ListItems from "./pages/ProductHandling/ListItems";
import Cart from "./pages/Cart";
import DeliveryManagement from "./pages/DeliveryManagement";
import PaymentManagement from "./pages/PaymentMangement";
import Payment from "./pages/Payment";
import Delivery from "./pages/Delivery";
import Order from "./pages/Order";
import EditProfile from "./pages/EditProfile";
import DynamicProductDetails from "./pages/ProductHandling/DynamicProductDetails";

const App = () => {
  return (
    <AuthProvider>
      <div className="mx-4 sm:mx-[10%] flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/feedbackdetails" element={<Feedbackdetails />} />
            <Route path="/updatefeedback" element={<Updatefeedback />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Header />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-items" element={<ProductForm />} />
            <Route path="/admin/list-items" element={<ListItems />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/payment-management" element={<PaymentManagement />} />
            <Route path="/product/:productId" element={<DynamicProductDetails />} />
            <Route
              path="/delivery-management"
              element={<DeliveryManagement />}
            />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;

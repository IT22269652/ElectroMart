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
import Privacy from "./pages/Privacy";

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
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/feedbackdetails" element={<Feedbackdetails />} />
            <Route path="/updatefeedback" element={<Updatefeedback />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;

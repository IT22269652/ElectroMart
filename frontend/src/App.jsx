import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import Navbar from "./components/Navbar";
import Feedback from "./pages/Feedback";
import Footer from "./components/Footer"; // ✅ Import Footer

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%] flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {" "}
        {/* Ensures footer stays at the bottom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;

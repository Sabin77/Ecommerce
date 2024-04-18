import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import SingleDetails from "./Components/SingleDetails";
import Cart from "./Components/Cart";
import StoreItems from "./Components/StoreItems";
import Category from "./Components/Category";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import { Outlet, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import ProfileDetails from "./Components/ProfileDetails";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/register"
          element={
            <Register onRegister={handleRegister} isRegistered={isRegistered} />
          }
        />
        <>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Body />} exact />
            <Route path="/products/:id" element={<SingleDetails />} />
            <Route path="/carts" element={<Cart />} />
          </Route>

          <Route
            path="/category/jewelery"
            element={
              <Category
                key={"jewelery"}
                category="category"
                categoryType="jewelery"
              />
            }
          />
          <Route
            path="/category/electronics"
            element={
              <Category
                key={"electronics"}
                category="category"
                categoryType="electronics"
              />
            }
          />
          <Route
            path="/category/men's clothing"
            element={
              <Category
                key={"MensClothing"}
                category="category"
                categoryType="men's clothing"
              />
            }
          />
          <Route
            path="/category/women's clothing"
            element={
              <Category
                key={"WomensClothing"}
                category="category"
                categoryType="women's clothing"
              />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/profile" element={<ProfileDetails />} />
        </>
      </Routes>
      <Footer />
    </Router>
  );
}

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default App;

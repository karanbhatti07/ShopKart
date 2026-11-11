import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Wishlist from "./Pages/Wishlist";
import MyOrders from "./Pages/MyOrders.jsx";
import OrderDetails from "./Pages/OrderDetails.jsx";
import CheckOut from "./Pages/CheckOut.jsx";
import AdminOrderDetails from "./Pages/AdminOrderDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoutes.jsx";
import NotFound from "./Pages/NotFound.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import MenCategoryDetails from "./components/MenCategoryDetails.jsx";
import Kids from "./Pages/Kids.jsx";
import Beauty from "./Pages/Beauty.jsx";
import WomenCategoryDetails from "./components/WomenCategoryDetails.jsx";
import KidsCategoryDetails from "./Pages/KidsCategoryDetails.jsx";
import Footwear from "./Pages/Footwear.jsx";
import FootwearCategoryDetails from "./Pages/FootwearCategoryDetails.jsx"
import  Accessories  from "./Pages/Accessories.jsx";
import AccessoriesCategoryDetaxils from "./Pages/AccessoriesCategoryDetails.jsx"
import Chatbot from "./components/Chatbot.jsx";
// import Footer from "./components/Footer.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/accessories" element={<Accessories/>} />
        <Route path="/beauty" element={<Beauty />} />



        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/Men/:category" element={<MenCategoryDetails />} />
        <Route path="/Women/:category" element={<WomenCategoryDetails />} />
        <Route path="/Kids/:category" element={<KidsCategoryDetails />} />
        <Route path="/Footwear/:category" element={<FootwearCategoryDetails />} />
        <Route path="/Accessories/:category" element={<AccessoriesCategoryDetaxils />} />




        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/orders/admin/:id"
          element={
            <AdminRoute>
              <AdminOrderDetails />{" "}
            </AdminRoute>
          }
        />



      </Routes>
          <Chatbot/>
    </>
  );
}

export default App;

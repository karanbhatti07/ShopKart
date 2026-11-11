import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import API from "../services/Api";
import { isAction } from "@reduxjs/toolkit";

const Navbar = () => {
  // const [wishlistCount, setWishlistCount] = useState("0");
  const [orderCount, setOrderCount] = useState("0");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [search, setSearch] = useState("");
  const quantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const wishlistquantity = wishlistItems.length;

  useEffect(() => {
    if (user !== null) {
      API.get("/orders/getorders").then((response) => {
        setOrderCount(response.data.orders.length);
      });
    } else {
      setOrderCount("0");
    }
  }, [user]);

  useEffect(() => {
    API.get("/auth/profile")
      .then((response) => {
        setUser(response.data.userId);
      })
      .catch((error) => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if(search === ""){
      return
    }
    const timer = setTimeout(() => {
      navigate(`/products?search=${search}`);
    },400);
    return()=>{
      clearTimeout(timer)
    }
  },[search]);


  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 w-full flex justify-end px-10 py-1">
        <div className="w-44 flex gap-5 items-center justify-end">
          <span className="text-white font-semibold hover:text-yellow-300 cursor-pointer transition">
            Help
          </span>

          {user ? (
            <span
              className="text-white font-semibold hover:text-yellow-300 cursor-pointer transition"
              onClick={logout}
            >
              LogOut
            </span>
          ) : (
            <>
              <span className="text-white font-semibold hover:text-yellow-300 cursor-pointer transition">
                <NavLink to="/register">Signup</NavLink>
              </span>
              <span className="text-white font-semibold hover:text-yellow-300 cursor-pointer transition">
                <NavLink to="/login">Login</NavLink>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm h-16 flex justify-between items-center sticky top-0 z-50 border-b border-gray-200">
        {/* Logo */}
        <div className="w-60 h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
            <NavLink to="/">SHOPKART</NavLink>
          </h1>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex gap-10 text-lg h-full text-gray-600">
            <li className="hover:border-b-2 hover:text-gray-900 transition-all duration-200 border-gray-900 h-16 flex items-center font-medium">
              <NavLink to="/men" className={({isActive})=>{
              return isActive  ? "text-purple-600 font-semibold"
              : "text-gray-600 hover:text-purple-600"
              }}>Men</NavLink>
            </li>

            <li className="hover:border-b-2 hover:text-gray-900 transition-all duration-200 border-gray-900 h-16 flex items-center font-medium">
              <NavLink to="/women"className={({isActive})=>{
              return isActive  ? "text-purple-600 font-semibold"
              : "text-gray-600 hover:text-purple-600"
              }}>Women</NavLink>
            </li>

            {/* <li className="hover:border-b-2 hover:text-gray-900 transition-all duration-200 border-gray-900 h-16 flex items-center font-medium">
              <NavLink to="/products" className={({isActive})=>{
              return isActive  ? "text-purple-600 font-semibold"
              : "text-gray-600 hover:text-purple-600"
              }}>Products</NavLink>
            </li> */}
          </ul>
        </div>

        {/* Search */}
        <div className="w-200 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-200 outline-none bg-gray-100 rounded-full px-5 w-[90%] h-11 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm"
            value={search}
            onChange={(e) => {
             setSearch(e.target.value)
            }}
          ></input>
        </div>

        {/* Wishlist */}
        <div className="w-30 h-full flex items-center justify-center">
          <h1 className="text-base text-gray-600 hover:text-blue-600  transition-colors duration-200 font-medium">
            <NavLink to="/wishlist" className="flex items-center gap-2 h-16">
              <FaRegHeart className="fill-red-500 text-red-600" />
              Wishlist
              <span className="bg-gray-300 rounded-full px-2">
                {" "}
                {wishlistquantity}
              </span>
            </NavLink>
          </h1>
        </div>

        {/* Cart */}
        <div className="w-30 h-full flex items-center justify-center">
          <h1 className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
            <NavLink to="/cart" className="flex items-center gap-2 h-16">
              <FaShoppingCart />
              Cart
              <span className="bg-gray-300 rounded-full px-2"> {quantity}</span>
            </NavLink>
          </h1>
        </div>

        {/* Orders */}
        <div className="w-30 h-full flex items-center justify-center">
          <h1 className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
            <NavLink to="/orders" className="flex items-center h-16">
              Orders
              <span className="bg-gray-300 rounded-full px-2">
                {" "}
                {orderCount}
              </span>
            </NavLink>
          </h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

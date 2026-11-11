import React, { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import {
  increasequantity,
  decreasequantity,
  removeItem,
  setCart,
} from "../redux/cartSlice";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductDetails from "./ProductDetails";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [cartdata, setCartdata] = useState({});

  const navigate = useNavigate()

    
  // const [checkItems, setCheckItems] = useState([]);
  // const totalAmount = cartItems
  //   .filter((item) => checkItems.includes(item.product._id))
  //   .reduce((total, item) => {
  //     return total + item.price * item.quantity;
  //   }, 0);

    const updateCart = async(item)=>{
        console.log("Sending:", {
    productId: item.product._id,
    quantity: item.quantity + 1
  });
      await API.put("/cart/updateCart",{
        productId : item.product._id,
        quantity  : item.quantity + 1
      })
    }


  useEffect(() => {
    API.get("/cart/get")
      .then((Response) => {
         console.log("CART RESPONSE:", Response.data);
         console.log("CART ITEMS:", Response.data.cart.items);

          Response.data.cart.items.forEach((item, index) => {
      console.log(`ITEM ${index}:`, item);
    });
        setCartdata(Response.data.cart);
        dispatch(setCart(Response.data.cart.items));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border rounded-2xl shadow-lg p-8 text-center max-w-md">
            🛒 Your cart is empty Looks like you haven't added anything to your
            cart yet.
          </p>
        </div>
      </>
    );
  }

  const removeFromCart = async (productId) => {
    try {
      console.log("REMOVE ID:", productId);

      const response = await API.delete(`/cart/delete/${productId}`);

      console.log("API response:", response.data);

      dispatch(removeItem(productId));
      toast.success("Item removed from Cart")

      console.log("Redux removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🛒 Your Shopping Cart
        </h1>

        {cartItems.map((item) => {
            if (!item.product) return null;
          return (
            <div
              key={item.product._id}
              className="bg-white p-5 mb-5 rounded-xl flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
               {/* <div>
                <input
                    type="checkbox"
                    checked={checkItems.includes(item.product._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckItems([
                          ...checkItems,
                          item.product._id,
                        ]);
                      } else {
                        setCheckItems(
                          checkItems.filter(
                            (id) => id !== item.product._id
                          )
                        );
                      }
                    }}
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />
              </div>  */}
              {/* Image */}
              <div className="w-36 h-36 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                 onClick={() => navigate(`/products/${item.product._id}`)}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.product.name}
                </h2>

                <p className="text-lg font-semibold text-gray-900">
                  Price: ₹{item.price}
                </p>

                <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>

                {/* Quantity */}
                <div className="flex items-center w-fit mb-3 mt-3 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <button
                    className="px-5 py-2 cursor-pointer bg-white text-gray-700 font-bold text-xl hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {
                      dispatch(decreasequantity(item.product._id));
                    }}
                  >
                    -
                  </button>

                  <span className="px-5 font-semibold text-gray-800">
                    {item.quantity}
                  </span>

                  <button
                    className="px-5 py-2 cursor-pointer bg-white text-gray-700 font-bold text-xl hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {
                      dispatch(increasequantity(item.product._id))
                      updateCart(item)
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-600 text-white font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors duration-200"
                    onClick={() => {
                      removeFromCart(item.product._id);
                    }}
                  >
                    Remove
                  </button>

                  <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                    <NavLink to="/checkout">Place Order</NavLink>
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <span className="text-sm font-medium text-gray-500">
                    Item Total
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;

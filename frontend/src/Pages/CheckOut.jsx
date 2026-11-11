import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { setCart } from "../redux/cartSlice";

const checkoutSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters"),

  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});

const Checkout = () => {
  const [checkItems, setCheckItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // const [shippingAddress, setShippingAddress] = useState({
  //   fullname: "",
  //   phone: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  // });

  const [loading, setLoading] = useState(false);

  // Shipping form change
  // const handleChange = (e) => {
  //   setShippingAddress({
  //     ...shippingAddress,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Selected products ka total
  const totalAmount = cartItems
    .filter((item) => checkItems.includes(item.product._id))
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

  // Place Order
  // const placeOrder = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Product select check
  //     if (checkItems.length === 0) {
  //       return toast.error("Please select at least one product");
  //     }

  //     // Payment method check
  //     if (paymentMethod === "") {
  //       return toast.error("Please select payment method");
  //     }

  //     setLoading(true);

  //     // Order data
  //     const orderData = {
  //       items: cartItems
  //         .filter((item) => checkItems.includes(item.product._id))
  //         .map((item) => ({
  //           product: item.product._id,
  //           name: item.product.name,
  //           quantity: item.quantity,
  //           price: item.price,
  //           image: item.product.image,
  //         })),

  //       shippingAddress,
  //       paymentMethod,
  //     };

  //     // =========================
  //     // CASH ON DELIVERY
  //     // =========================
  //     if (paymentMethod === "COD") {
  //       const response = await API.post("/orders/create", orderData);

  //       console.log(response.data);

  //       dispatch(setCart([]));

  //       toast.success("Order placed successfully!");

  //       navigate("/orders");
  //     }

  //     // =========================
  //     // RAZORPAY
  //     // =========================
  //     if (paymentMethod === "Razorpay") {
  //       // Backend se Razorpay order create
  //       const response = await API.post("/payment/create-order", {
  //         amount: totalAmount,
  //       });

  //       console.log("Razorpay Order:", response.data);

  //       // Razorpay checkout options
  //       const options = {
  //         // IMPORTANT:
  //         // Yahan apna Razorpay TEST KEY ID lagao
  //         key: "rzp_test_Tg9gYE3f6Gteaq",

  //         amount: response.data.order.amount,

  //         currency: response.data.order.currency,

  //         name: "ShopKart",

  //         description: "ShopKart Order",

  //         order_id: response.data.order.id,

  //         // Payment successful hone par
  //         handler: function (paymentResponse) {
  //           console.log("Payment Success:", paymentResponse);
  //         },

  //         // Customer details
  //         prefill: {
  //           name: shippingAddress.fullname,
  //           contact: shippingAddress.phone,
  //         },

  //         // Checkout theme
  //         theme: {
  //           color: "#6366f1",
  //         },
  //       };

  //       // Razorpay popup
  //       const razorpay = new window.Razorpay(options);

  //       razorpay.open();
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     toast.error("Order could not be placed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const placeOrder = async (formData) => {
    try {
      // Product select check
      if (checkItems.length === 0) {
        return toast.error("Please select at least one product");
      }

      // Payment method check
      if (paymentMethod === "") {
        return toast.error("Please select payment method");
      }

      setLoading(true);

      // Order data
      const orderData = {
        items: cartItems
          .filter((item) => checkItems.includes(item.product._id))
          .map((item) => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
            image: item.product.image,
          })),

        shippingAddress: formData,
        paymentMethod,
      };

      // =========================
      // CASH ON DELIVERY
      // =========================
      if (paymentMethod === "COD") {
        const response = await API.post("/orders/create", orderData);

        console.log(response.data);

        dispatch(setCart([]));

        toast.success("Order placed successfully!");

        navigate("/orders");
      }

      // =========================
      // RAZORPAY
      // =========================
      if (paymentMethod === "Razorpay") {
        const response = await API.post("/payment/create-order", {
          items: orderData.items,
        });

        console.log("Razorpay Order:", response.data);

        const options = {
          key: "rzp_test_Tg9gYE3f6Gteaq",

          amount: response.data.order.amount,

          currency: response.data.order.currency,

          name: "ShopKart",

          description: "ShopKart Order",

          order_id: response.data.order.id,

          handler: async function (paymentResponse) {
            try {
              const verifyResponse = await API.post("/payment/verify", {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,

                orderData: {
                  items: orderData.items,
                  totalAmount: totalAmount,
                  shippingAddress: formData,
                },
              });

              console.log("Verification Response:", verifyResponse.data);

              if (verifyResponse.data.success) {
                dispatch(setCart([]));

                toast.success("Payment successful! Order placed.");

                navigate("/orders");
              }
            } catch (error) {
              console.log("Payment verification error:", error);
              toast.error("Payment verification failed");
            }
          },

          prefill: {
            name: formData.fullname,
            contact: formData.phone,
          },

          theme: {
            color: "#6366f1",
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
      }
    } catch (error) {
      console.log(error);

      toast.error("Order could not be placed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
            <h1 className="text-3xl font-bold text-gray-700 mb-3">
              Your Cart is Empty 🛒
            </h1>

            <button
              onClick={() => navigate("/products")}
              className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  // =========================
  // CHECKOUT UI
  // =========================
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Checkout 🛍️
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* =========================
              SHIPPING FORM
          ========================= */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Shipping Details
            </h2>

            <form onSubmit={handleSubmit(placeOrder)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    {...register("fullname")}
                    // value={shippingAddress.fullname}
                    // onChange={handleChange}
                    placeholder="Enter your full name"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    {...register("phone")}
                    // name="phone"
                    // value={shippingAddress.phone}
                    // onChange={handleChange}
                    placeholder="Enter phone number"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Address
                  </label>

                  <textarea
                    {...register("address")}
                    // name="address"
                    // value={shippingAddress.address}
                    // onChange={handleChange}
                    placeholder="House no, street, area..."
                    rows="3"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    {...register("city")}
                    // name="city"
                    // value={shippingAddress.city}
                    // onChange={handleChange}
                    placeholder="Enter city"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    {...register("state")}
                    // name="state"
                    // value={shippingAddress.state}
                    // onChange={handleChange}
                    placeholder="Enter state"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Pincode
                  </label>

                  <input
                    type="text"
                    {...register("pincode")}
                    // name="pincode"
                    // value={shippingAddress.pincode}
                    // onChange={handleChange}
                    placeholder="Enter pincode"
                    // required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                {/* =========================
                    PAYMENT METHODS
                ========================= */}
                <div className="md:col-span-2 flex flex-col gap-4 mt-4">
                  {/* Razorpay */}
                  <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
                    <input
                      type="radio"
                      name="method"
                      value="Razorpay"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-blue-600"
                    />

                    <span className="text-gray-800 font-medium">Razorpay</span>
                  </label>

                  {/* COD */}
                  <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
                    <input
                      type="radio"
                      name="method"
                      value="COD"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-blue-600"
                    />

                    <span className="text-gray-800 font-medium">
                      Cash On Delivery
                    </span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-7 bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-3 border-b border-gray-100 pb-4"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={checkItems.includes(item.product._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckItems([...checkItems, item.product._id]);
                      } else {
                        setCheckItems(
                          checkItems.filter((id) => id !== item.product._id),
                        );
                      }
                    }}
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-50 rounded-lg p-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                 onClick={() => navigate(`/products/${item.product._id}`)}

                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="font-semibold text-green-600">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
              <span className="text-lg font-semibold text-gray-700">Total</span>

              <span className="text-2xl font-bold text-green-600">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

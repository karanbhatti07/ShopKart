import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

const OrderDetails = () => {
  const [orderdetail, setOrderdetail] = useState(null);
  const { id } = useParams();
  console.log(id);

  const orderDetails = async () => {
    try {
      const response = await API.get(`/orders/${id}`);
      setOrderdetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderDetails();
  }, [id]);

  console.log(orderdetail);

  return (
    <>
      {orderdetail && (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          {/* Main Heading */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-gray-900">ORDER DETAILS</h1>

            <p className="text-gray-500 mt-2">
              View your order information and delivery details
            </p>
          </div>

          {/* Order Information */}
          <div className="px-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>

                  <h2 className="text-lg font-semibold text-gray-900 break-all">
                    {orderdetail.singleOrder._id}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Placed On</p>

                  <h2 className="text-lg font-semibold text-gray-900">
                    {new Date(
                      orderdetail.singleOrder.createdAt,
                    ).toLocaleDateString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ORDER STATUS
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-600">
                  Current Status
                </p>

                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
                  {orderdetail.singleOrder.orderStatus}
                </span>
                <p className="text-lg font-medium text-gray-600">
                  Payment Method
                </p>

                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
                  {orderdetail.singleOrder.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ORDER ITEMS
            </h2>

            <div className="space-y-4">
              {orderdetail.singleOrder.items.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Image */}
                      <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 w-full">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {item.name}
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                          <p className="text-gray-600">
                            Quantity:
                            <span className="font-semibold text-gray-900 ml-2">
                              {item.quantity}
                            </span>
                          </p>

                          <p className="text-gray-600">
                            Price:
                            <span className="font-bold text-gray-900 ml-2">
                              ₹{item.price}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Total Price:
                            <span className="font-bold text-gray-900 ml-2">
                              ₹{item.price * item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              DELIVERY ADDRESS
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.fullname}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.phone}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Address</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.address}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">City</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.city}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">State</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.state}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Pincode</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {orderdetail.singleOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="px-6 pb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              PRICE DETAILS
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-600">
                  Total Amount
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  ₹{orderdetail.singleOrder.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;

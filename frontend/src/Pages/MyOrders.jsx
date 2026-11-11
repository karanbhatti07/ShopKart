import React, { useEffect, useState } from "react";
import API from "../services/Api";
import OrderCard from "../components/OrderCard";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getorders = async () => {
      try {
        const response = await API.get("/orders/getorders");
        console.log(response.data);

        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getorders();
  }, []);
  console.log(orders);

  const cancelOrder = async (orderId) => {
    try {
      const response = await API.put(`/orders/cancel/${orderId}`);
      console.log(response.data);
      setOrders((oldOrders) => {
        return oldOrders.map((order) => {
          return order._id === orderId
            ? { ...order, orderStatus: "Cancelled" }
            : order;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />

      {orders.length !== 0 ? (
        orders.map((order) => {
          return (
            <OrderCard
              key={order._id}
              order={order}
              cancelOrder={cancelOrder}
            />
          );
        })
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border rounded-2xl shadow-lg p-8 text-center max-w-md font-bold">
            📦 No orders yet ! Your orders will appear here. Start shopping and
            place your first order!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

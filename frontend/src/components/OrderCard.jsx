import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, XCircle, Package, CalendarDays, Check } from "lucide-react";
const OrderCard = ({ order, cancelOrder }) => {
  const navigate = useNavigate();
  const trackingSteps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];
  const currentStep = trackingSteps.indexOf(order.orderStatus);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-6">
      {/* ================= HEADER ================= */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Order Info */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
              Order ID
            </p>
            <p className="text-base font-bold text-gray-900 mt-1">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
          {/* Status */}
          <div
            className={`inline-flex items-center w-fit px-3.5 py-1.5 rounded-full text-sm font-semibold ${order.orderStatus === "Pending" ? "bg-yellow-50 text-yellow-700" : order.orderStatus === "Confirmed" ? "bg-cyan-50 text-cyan-700" : order.orderStatus === "Processing" ? "bg-blue-50 text-blue-700" : order.orderStatus === "Shipped" ? "bg-purple-50 text-purple-700" : order.orderStatus === "Out for Delivery" ? "bg-orange-50 text-orange-700" : order.orderStatus === "Delivered" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${order.orderStatus === "Pending" ? "bg-yellow-500" : order.orderStatus === "Confirmed" ? "bg-cyan-500" : order.orderStatus === "Processing" ? "bg-blue-500" : order.orderStatus === "Shipped" ? "bg-purple-500" : order.orderStatus === "Out for Delivery" ? "bg-orange-500" : order.orderStatus === "Delivered" ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            {order.orderStatus}
          </div>
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={16} />
            <span>
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      {/* ================= TRACKING ================= */}
      <div className="px-5 sm:px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Delivery Status
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Track your order progress
            </p>
          </div>
          {order.orderStatus !== "Cancelled" && (
            <span className="text-xs font-semibold text-gray-500">
              {currentStep + 1}/{trackingSteps.length}
            </span>
          )}
        </div>
        {order.orderStatus === "Cancelled" ? (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle size={22} className="text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-red-700">Order Cancelled</p>
              <p className="text-sm text-red-500 mt-0.5">
                This order will not be delivered.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[700px] flex items-start">
              {trackingSteps.map((step, index) => {
                const completed = index <= currentStep;
                const lineCompleted = index < currentStep;
                return (
                  <div key={step} className="flex-1 relative text-center">
                    {/* Connecting Line */}
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute top-5 left-1/2 w-full h-0.5 ${lineCompleted ? "bg-green-500" : "bg-gray-200"}`}
                      ></div>
                    )}
                    {/* Circle */}
                    <div className="relative z-10 flex justify-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${completed ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        {completed ? (
                          <Check size={17} strokeWidth={3} />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                    </div>
                    {/* Step Name */}
                    <p
                      className={`mt-3 text-xs font-semibold leading-4 ${completed ? "text-gray-800" : "text-gray-400"}`}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* ================= ORDER ITEMS ================= */}
      <div className="px-5 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Package size={19} className="text-gray-700" />
          <h2 className="text-base font-bold text-gray-900"> Order Items </h2>
          <span className="text-xs text-gray-400">({order.items.length})</span>
        </div>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
            >
              {/* Product */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>
              {/* Price */}
              <div className="text-right">
                <p className="font-bold text-gray-900"> ₹{item.price} </p>
                <p className="text-xs text-gray-400 mt-1"> per item </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ================= FOOTER ================= */}
      <div className="px-5 sm:px-6 py-5 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Total */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Total Amount
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ₹{order.totalAmount}
            </p>
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* View Details */}
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              <Eye size={17} /> View Details
            </button>
            {/* Cancel */}
            {(order.orderStatus === "Pending" ||
              order.orderStatus === "Confirmed") && (
              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors cursor-pointer"
                onClick={() => cancelOrder(order._id)}
              >
                <XCircle size={17} /> Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;

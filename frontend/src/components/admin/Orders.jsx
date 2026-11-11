import React from "react";

const Orders = ({
  filteredOrders,
  filterStatus,
  setFilterStatus,
  updateStatus,
  navigate,
}) => {
  return (
    <div>
    
              <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      All Orders
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                      Manage and update customer orders.
                    </p>
                  </div>

                  <select
                    className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full border-collapse min-w-275">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Order ID
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Customer
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Products
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Total
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Payment
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Status
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Date
                        </th>

                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="p-4 text-sm font-medium text-gray-900">
                            {order._id}
                          </td>

                          <td className="p-4 text-sm text-gray-600">
                            {order.user}
                          </td>

                          <td className="p-4">
                            {order.items.map((item) => (
                              <div
                                key={item._id}
                                className="mb-2 bg-gray-50 rounded-lg p-2"
                              >
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </p>

                                <p className="text-xs font-semibold text-gray-700">
                                  ₹{item.price}
                                </p>
                              </div>
                            ))}
                          </td>

                          <td className="p-4 font-bold text-gray-900">
                            ₹{order.totalAmount}
                          </td>

                          <td className="p-4">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.orderStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : order.orderStatus === "Processing"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.orderStatus === "Shipped"
                                      ? "bg-purple-100 text-purple-700"
                                      : order.orderStatus === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>

                          <td className="p-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
                                onClick={() =>
                                  navigate(`/orders/admin/${order._id}`)
                                }
                              >
                                View
                              </button>

                              <select
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition"
                                value={order.orderStatus}
                                onChange={(e) =>
                                  updateStatus(order._id, e.target.value)
                                }
                              >
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            

    </div>
  );
};

export default Orders;
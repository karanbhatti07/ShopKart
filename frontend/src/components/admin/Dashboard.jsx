import React from "react";




  const Dashboard = ({
  products,
  orders,
  users,
  activeproducts,
  Inactiveproducts,
  pendingOrders,
  processingOrders,
  shippedOrders,
  deliveredOrders,
  cancelledOrders,
  setActiveSection,
  setFilterStatus,
  setProductStatus,
}) => {
   

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
          <p className="text-sm font-medium text-blue-600">Total Products</p>

          <p className="text-3xl font-bold  text-blue-900 mt-2">
            {products.length}
          </p>
        </div>

        <div
          className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-gray-200 shadow-sm"
          onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("All");
                }}
        >
          <p className="text-sm font-medium text-blue-600">Total Orders</p>

          <p className="text-3xl font-bold text-blue-900 mt-2">
            {orders.length}
          </p>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-blue-600">Total Users</p>

          <p className="text-3xl font-bold text-blue-900 mt-2">
            {users.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("Pending");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">Pending Orders</p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {pendingOrders.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("Processing");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">
            {" "}
            Processing Orders{" "}
          </p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {processingOrders.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("Shipped");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">Shipped Orders</p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {shippedOrders.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
         onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("Delivered");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">
            Delivered Orders
          </p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {deliveredOrders.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
                  setActiveSection("All Orders");
                  setFilterStatus("Cancelled");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">
            Cancelled Orders
          </p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {cancelledOrders.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
            setActiveSection("Products");
            setProductStatus("Active");
          }}
        >
          <p className="text-sm font-medium text-yellow-600">Active Products</p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {activeproducts.length}
          </p>
        </div>
        <div
          className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
          onClick={() => {
                  setActiveSection("Products");
                  setProductStatus("Inactive");
                }}
        >
          <p className="text-sm font-medium text-yellow-600">
            InActive Products
          </p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">
            {Inactiveproducts.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

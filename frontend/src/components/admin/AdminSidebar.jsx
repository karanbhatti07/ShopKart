import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeSection, setActiveSection, logout }) => {
  const navigate = useNavigate();
  return (
    <aside className="w-64 min-h-screen bg-gray-950 text-white p-6 sticky top-0">
      {/* Logo */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-wide">ShopKart</h2>

        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {/* Dashboard */}
        <button
          className={`block w-full text-left px-4 py-3 rounded-xl transition ${
            activeSection === "Dashboard"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
          onClick={() => {
            navigate("/admin");x
            setActiveSection("Dashboard");
          }}
        >
          Dashboard
        </button>

        {/* Products */}
        <button
          className={`block w-full text-left px-4 py-3 rounded-xl transition ${
            activeSection === "Products"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
         onClick={() => {
  navigate("/admin/products");
  setActiveSection("Products");
}}
        >
          Products
        </button>

        {/* Orders */}
        <button
          className={`block w-full text-left px-4 py-3 rounded-xl transition ${
            activeSection === "All Orders"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
          onClick={() => setActiveSection("All Orders")}
        >
          Orders
        </button>

        {/* Add Product */}
        <button
          className={`block w-full text-left px-4 py-3 rounded-xl transition ${
            activeSection === "Add Product"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
          onClick={() => setActiveSection("Add Product")}
        >
          Add Product
        </button>

        {/* Users */}
        <button
          className={`block w-full text-left px-4 py-3 rounded-xl transition ${
            activeSection === "Users"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
          onClick={() => setActiveSection("Users")}
        >
          Users
        </button>

        {/* Logout */}
        <button
          className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

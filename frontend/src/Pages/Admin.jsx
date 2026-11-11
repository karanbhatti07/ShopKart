import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
// import Products from "./Products";
import toast from "react-hot-toast";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [segment, setSegment] = useState("Select Segment");
  const [categoryFilter, setCategoryFilter] = useState("All");
  // const [audience, setAudience] = useState("Select Audience");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState("");
  const [activeSection, setActiveSecton] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [users, setUsers] = useState([]);
  const [productStatus, setProductStatus] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getproducts = async () => {
      try {
        const response = await API.get("/products/getproduct");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getproducts();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await API.get("/auth/allUsers");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  // ADD Product function

  const addProduct = async (e) => {
    e.preventDefault();
    console.log("SEGMENT:", segment);
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      segment === "Select Segment" ||
      // audience === "Select Audience" ||
      !stock ||
      !brand ||
      !image
    ) {
      alert("All fields are required !");
      return;
    } else {
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("segment", segment);
        // formData.append("audience", audience);
        formData.append("stock", stock);
        formData.append("brand", brand);
        formData.append("image", image);

        console.log("FORM DATA READY");
        console.log("NAME:", name);
        console.log("CATEGORY:", category);
        console.log("SEGMENT:", segment);
        console.log("IMAGE:", image);

        const response = await API.post("/products/createproduct", formData);

        console.log("SUCCESS:", response.data);
        alert("Product Created Successfully !");
        setProducts((prev) => [...prev, response.data.productdetails]);

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSegment("Select Segment");
        // setAudience("Select Audience");
        setStock("");
        setBrand("");
        setImage("");
      } catch (error) {
        console.log("CATCH RUNNING");
        console.log("FULL ERROR:", error);
        console.log("RESPONSE:", error.response);
        console.log("BACKEND ERROR:", error.response?.data);

        alert("Product add nahi hua");
      }
    }
  };

  // Delete product function
  const deleteProduct = async (id) => {
    try {
      const response = await API.delete(`/products/deleteproduct/${id}`);

      console.log(response.data);

      setProducts(products.filter((product) => product._id != id));

      toast.success("Product Deleted Successfully!");
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // UPDATE Product function
  const updateProduct = async (id) => {
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock ||
      !brand
    ) {
      alert("All fields are required !");
      return;
    } else {
      try {
        const response = await API.put(`/products/updateproduct/${id}`, {
          name: name,
          description: description,
          price: price,
          category: category,
          segment: segment,
          // audience: audience,
          stock: stock,
          brand: brand,
        });

        alert("Product Updated Successfully !");

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSegment("Select Segment");
        // setAudience("-- Select audience --");
        setStock("");
        setBrand("");
      } catch (error) {
        console.log(error);
        alert("error");
      }
    }
  };

  // Logout
  const logout = async () => {
    try {
      const response = await API.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // For Admin to Access ALL Orders

  const getAllOrders = async () => {
    try {
      const response = await API.get("/orders/admin/all");
      console.log("FRONTEND ORDERS:", response.data.AllOrders);

      setOrders(response.data.AllOrders);
      console.log(response.data.AllOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // For Admin to update Status

  const updateStatus = async (id, status) => {
    try {
      console.log("Order ID:", id);
      console.log("New Status:", status);

      const response = await API.put(`/orders/admin/status/${id}`, {
        orderStatus: status,
      });

      console.log("Backend Response:", response.data);

      setOrders((prev) =>
        prev.map((order) => {
          if (order._id === id) {
            return {
              ...order,
              orderStatus: status,
            };
          }

          return order;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  //  Filter orders acording to status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === filterStatus);

  // Pending Orders
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending",
  );
  // Processing Orders
  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing",
  );

  // Shipped Orders
  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped",
  );

  //  Delivered Orders
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered",
  );

  //  Cancelled Orders
  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "Cancelled",
  );

  //  Active and Inactive toggle
  const statusToggle = async (productId) => {
    // console.log("Clicked:", productId);
    try {
      const response = await API.put("/products/toggleStatus", {
        productId: productId,
      });
      setProducts(
        products.map((item) => {
          const match = item._id === response.data.product._id;
          if (match) {
            return response.data.product;
          } else {
            return item;
          }
        }),
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const statusMatch =
      productStatus === "All" ||
      (productStatus === "Active" && product.isActive === true) ||
      (productStatus === "Inactive" && product.isActive === false);

    const categoryMatch =
      categoryFilter === "All" || product.category === categoryFilter;
    const searchMatch =
      product.name.toLowerCase().includes(searchItem) ||
      product.brand.toLowerCase().includes(searchItem) ||
      product.category.toLowerCase().includes(searchItem);

    return statusMatch && categoryMatch && searchMatch;
  });
  const activeproducts = products.filter(
    (product) => product.isActive === true,
  );

  const Inactiveproducts = products.filter(
    (product) => product.isActive === false,
  );

  // // Active Products
  // const activeproducts = products.filter(
  //   (product) => product.isActive === true,
  // );
  // // InActive Products
  // const Inactiveproducts = products.filter(
  //   (product) => product.isActive === false,
  // );
  // const categoryFilter = products.filter((product)=>(
  //   product.category === category || category === "All"
  // ))

  const categories = {
    Men: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Jackets",
      "Shoes",
      "Hoodies",
      "Shorts",
      "Ethnic Wear",
      "Accessories",
    ],

    Women: [
      "Tops",
      "Shirts",
      "Dresses",
      "Jeans",
      "Trousers",
      "Kurtis",
      "Skirts",
      "Jackets",
      "Ethnic Wear",
      "Sarees",
      "Shoes",
      "Handbags",
      "Accessories",
    ],

    Kids: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Dresses",
      "Ethnic Wear",
      "Shoes",
      "Toys",
      "School Accessories",
    ],

    Electronics: [
      "Mobiles",
      "Laptops",
      "Tablets",
      "Headphones",
      "Smartwatches",
      "Cameras",
      "Speakers",
      "Computer Accessories",
      "Mobile Accessories",
      "Chargers & Cables",
    ],
    Footwear: [
      "Sneakers",
      "Running Shoes",
      "Sports Shoes",
      "Casual Shoes",
      "Formal Shoes",
      "Loafers",
      "Boots",
      "Sandals",
      "Slippers",
      "Flip Flops",
      "Heels",
      "Flats",
      "Wedges",
      "Mules",
    ],
    Beauty: [
      "Makeup",
      "Skincare",
      "Haircare",
      "Fragrances",
      "Bath & Body",
      "Lip Care",
      "Face Care",
      "Eye Makeup",
      "Nail Care",
      "Hair Styling",
      "Beauty Tools",
      "Personal Care",
    ],
    Accessories: [
      "Watches",
      "Sunglasses",
      "Belts",
      "Wallets",
      "Caps",
      "Hats",
      "Bags",
      "Jewellery",
      "Bracelets",
      "Necklaces",
      "Rings",
      "Earrings",
      "Scarves",
      "Gloves",
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-gray-950 text-white p-6 sticky top-0">
            <div className="mb-10">
              <h1 className="text-2xl font-bold tracking-wide">ShopKart</h1>

              <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
            </div>

            <nav className="space-y-2">
              <button
                className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                  activeSection === "Dashboard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSecton("Dashboard")}
              >
                Dashboard
              </button>

              <button
                className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                  activeSection === "Products"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSecton("Products")}
              >
                Products
              </button>

              <button
                className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                  activeSection === "All Orders"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSecton("All Orders")}
              >
                All Orders
              </button>

              <button
                className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                  activeSection === " Add Product"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSecton(" Add Product")}
              >
                Add Product
              </button>

              <button
                className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                  activeSection === "Users"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSecton("Users")}
              >
                Users
              </button>

              <button
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition"
                onClick={logout}
              >
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your ShopKart store from here.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                <p className="text-sm font-medium text-blue-600">
                  Total Products
                </p>

                <p className="text-3xl font-bold  text-blue-900 mt-2">
                  {products.length}
                </p>
              </div>

              <div
                className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-gray-200 shadow-sm"
                onClick={() => {
                  setActiveSecton("All Orders");
                  setFilterStatus("All");
                }}
              >
                <p className="text-sm font-medium text-blue-600">
                  Total Orders
                </p>

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
                  setActiveSecton("All Orders");
                  setFilterStatus("Pending");
                }}
              >
                <p className="text-sm font-medium text-yellow-600">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">
                  {pendingOrders.length}
                </p>
              </div>
              <div
                className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
                onClick={() => {
                  setActiveSecton("All Orders");
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
                  setActiveSecton("All Orders");
                  setFilterStatus("Shipped");
                }}
              >
                <p className="text-sm font-medium text-yellow-600">
                  Shipped Orders
                </p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">
                  {shippedOrders.length}
                </p>
              </div>
              <div
                className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
                onClick={() => {
                  setActiveSecton("All Orders");
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
                  setActiveSecton("All Orders");
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
                  setActiveSecton("Products");
                  setProductStatus("Active");
                }}
              >
                <p className="text-sm font-medium text-yellow-600">
                  Active Products
                </p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">
                  {activeproducts.length}
                </p>
              </div>
              <div
                className="bg-linear-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 shadow-sm"
                onClick={() => {
                  setActiveSecton("Products");
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

            {/* Add Product */}
            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add Product
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new product to your store.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  if (edit === "") {
                    addProduct(e);
                  } else {
                    updateProduct(edit);
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  <select
                    className="w-full border  border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {categories[segment]?.map((option) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className="w-full border  border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    value={segment}
                    onChange={(e) => {
                      setSegment(e.target.value);
                      setCategory("");
                    }}
                  >
                    <option>Select Segment</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                    <option>Electronics</option>
                    <option>Footwear</option>
                    <option>Beauty</option>
                    <option>Accessories</option>
                  </select>
                  {/* <select
                    className="w-full border  border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  >
                    <option>Select audience</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select> */}

                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border border-gray-300 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer outline-none bg-gray-50 file:mr-4 file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg hover:border-blue-400 transition"
                  />
                </div>

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 p-3.5 rounded-xl outline-none w-full mt-5 h-32 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl mt-5  shadow-sm active:scale-95 duration-200 transition-all"
                >
                  {edit === "" ? "Add Product" : "Update Product"}
                </button>
              </form>

              {/* Product Management */}
              {activeSection === "Products" && (
                <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Manage Products
                  </h2>
                  <div className="py-4 flex gap-10">
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search Products"
                        className="px-4 py-3 lg:w-full border-none outline-none bg-gray-100 rounded-xl"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                      ></input>
                      {searchItem !== "" && (
                        <X
                          className="absolute right-3 top-1/2 -translate-y-1/2 "
                          onClick={() => setSearchItem("")}
                        />
                      )}
                    </div>

                    <select
                      className="px-2 py-2 rounded-xl w-44 border-gray-300 border outline-none"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">🛍️ All Categories</option>
                      <option value="Clothing">👕 Clothing</option>
                      <option value="Electronics">📱 Electronics</option>
                      <option value="Footwear">👟 Footwear</option>
                      <option value="Accessories">👜 Accessories</option>
                      <option value="Beauty">💄 Beauty</option>
                      <option value="Home & Kitchen">🏠 Home & Kitchen</option>
                      <option value="Sports">⚽ Sports</option>
                      <option value="Grocery">🛒 Grocery</option>
                    </select>
                    <div className="bg-red-500 p-2 rounded-xl w-28 flex justify-center items-center active:scale-95 transition-all duration-200">
                      <button
                        className="text-white text-2xl"
                        onClick={() => {
                          setSearchItem("");
                          setCategoryFilter("All");
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full border-collapse min-w-250">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Name
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Category
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Segment
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Price
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Stock
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Status
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Status Action
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Brand
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Description
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Image
                          </th>

                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredProducts.length <= 0
                          ? "No products found"
                          : filteredProducts.map((product) => (
                              <tr
                                key={product._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                              >
                                <td className="p-4 font-medium text-gray-900 max-w-56">
                                  {product.name}
                                </td>

                                <td className="p-4 text-gray-600">
                                  {product.category}
                                </td>

                                <td className="p-4 text-gray-600">
                                  {product.segment}
                                </td>

                                <td className="p-4 font-semibold text-gray-900">
                                  ₹{product.price}
                                </td>

                                <td className="p-4">
                                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {product.stock}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span
                                    className={`px-6 py-2 text- font-medium 
                              ${
                                product.isActive === true
                                  ? "bg-green-500 text-white rounded-lg"
                                  : "bg-red-500 text-white rounded-lg"
                              } 
                                `}
                                  >
                                    {product.isActive ? "Active" : "Inactive"}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <button
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                      product.isActive
                                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                    }`}
                                    onClick={() => statusToggle(product._id)}
                                  >
                                    {product.isActive
                                      ? "Deactivate"
                                      : "Activate"}
                                  </button>
                                </td>

                                <td className="p-4 text-gray-600">
                                  {product.brand}
                                </td>

                                <td className="p-4 text-gray-600 max-w-72">
                                  <p className="line-clamp-2">
                                    {product.description}
                                  </p>
                                </td>

                                <td className="p-4">
                                  <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </td>

                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button
                                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium  active:scale-90 transition-all duration-100"
                                      onClick={() => {
                                        setEdit(product._id);
                                        setName(product.name);
                                        setDescription(product.description);
                                        setPrice(product.price);
                                        setSegment(product.segment);
                                        setAudience(product.audience);
                                        setCategory(product.category);
                                        setStock(product.stock);
                                        setBrand(product.brand);
                                        setImage(product.image);
                                        setActiveSecton("Add Product");
                                      }}
                                    >
                                      Edit
                                    </button>

                                    <button
                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                      onClick={() => {
                                        const result = confirm(
                                          "Are you sure you want to delete?",
                                        );
                                        if (result) {
                                          deleteProduct(product._id);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* All Orders */}
              {activeSection === "All Orders" && (
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
                      <option>Confirmed</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
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
                                  <option>Confirmed</option>
                                  <option>Processing</option>
                                  <option>Shipped</option>
                                  <option>Out for Delivery</option>
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
              )}
              {/* All Users */}
              {activeSection === "Users" && (
                <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h1 className="text-4xl">All Users</h1>
                  </div>
                  <div>
                    <table className="w-full border-collapse min-w-275">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Name
                          </th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Email
                          </th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Role
                          </th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">
                            Registration Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          return (
                            <tr
                              key={user._id}
                              className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                              <td className="p-4 text-sm text-gray-600">
                                {user.name}
                              </td>
                              <td className="p-4 text-sm text-gray-600">
                                {user.email}
                              </td>
                              <td className="p-4 text-sm text-gray-600">
                                {user.role}
                              </td>
                              <td className="p-4 text-sm text-gray-600">
                                {new Date(user.createdAt).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Admin;

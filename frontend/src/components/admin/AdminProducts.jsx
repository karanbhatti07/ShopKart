import React from "react";
import { X } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const AdminProducts = () => {
  const {
    filteredProducts,
    searchItem,
    setSearchItem,
    categoryFilter,
    setCategoryFilter,
    statusToggle,
    setEdit,
    setName,
    setDescription,
    setPrice,
    setCategory,
    setStock,
    setBrand,
    setImage,
    setActiveSection,
    deleteProduct,
  } = useOutletContext();

  return (
    <div>
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Manage Products
        </h2>

        {/* Search + Filter */}
        <div className="py-4 flex gap-10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Products"
              className="px-4 py-3 lg:w-full border-none outline-none bg-gray-100 rounded-xl"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />

            {searchItem !== "" && (
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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

        {/* Products Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse min-w-[1100px]">
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center py-12 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
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
                        className={`px-6 py-2 font-medium ${
                          product.isActive === true
                            ? "bg-green-500 text-white rounded-lg"
                            : "bg-red-500 text-white rounded-lg"
                        }`}
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
                        {product.isActive ? "Deactivate" : "Activate"}
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
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-90 transition-all duration-100"
                          onClick={() => {
                            setEdit(product._id);
                            setName(product.name);
                            setDescription(product.description);
                            setPrice(product.price);
                            setCategory(product.category);
                            setStock(product.stock);
                            setBrand(product.brand);
                            setImage(product.image);

                            setActiveSection("Add Product");
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
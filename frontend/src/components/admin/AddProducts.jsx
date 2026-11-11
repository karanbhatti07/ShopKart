import React from "react";

const AddProduct = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  category,
  setCategory,
  segment,
  setSegment,
  stock,
  setStock,
  brand,
  setBrand,
  image,
  setImage,
  categories,
  edit,
  addProduct,
  updateProduct,
}) => {
  return (
    <div>
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
                    onChange={(e) => setSegment(e.target.value)}
                  >
                    <option>Select segment</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                    <option>Electronics</option>
                  </select>

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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl mt-5 transition shadow-sm"
                >
                  {edit === "" ? "Add Product" : "Update Product"}
                </button>
              </form>
              </div>
    </div>
  );
};

export default AddProduct;
import React from "react";
import API from "../services/Api";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortPrice, setSortPrice] = useState("default");
  const [priceRange, setPriceRange] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [pagination, setPagination] = useState();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    API.get("/products/getproduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(products);

  const categories = [...new Set(products.map((product) => product.category))];
  console.log(categories);
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (priceRange === "All" ||
        (priceRange === "under1000" && product.price < 1000) ||
        (priceRange === "1000to5000" &&
          product.price >= 1000 &&
          product.price <= 5000) ||
        (priceRange === "above5000" && product.price > 5000)) &&
      (ratingFilter === "All" ||
        (ratingFilter === "4" && product.rating >= 4) ||
        (ratingFilter === "3" && product.rating >= 3) ||
        (ratingFilter === "2" && product.rating >= 2)) &&
      (product.isActive === true) &&
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())),
  );
  const sortedProducts = [...filteredProducts];
  if (sortPrice === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortPrice === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const setDefault = () => {
    (setSelectedCategory("All"),
      setSortPrice("default"),
      setPriceRange("All"),
      setRatingFilter("All"));
  };
  // Products Active/Inactive Filter
  // const productStatusFilter = products.filter((product)=>(
  //   product.isActive === true
  // ))
  return (
    <>
      <Navbar />
      <div className="p-5">
        <select
          className="bg-gray-100 p-2 rounded-xl ml-5 shadow outline-none"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* ################################################################*/}
        <select
          className="bg-gray-100 p-2 rounded-xl ml-5 shadow outline-none"
          value={sortPrice}
          onChange={(e) => {
            setSortPrice(e.target.value);
          }}
        >
          <option value="default">Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        {/* ################################################################*/}

        <select
          className="bg-gray-100 p-2 rounded-xl ml-5 shadow outline-none"
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
          }}
        >
          <option value="All">All Prices</option>
          <option value="under1000">Under ₹1000</option>
          <option value="1000to5000">₹1000 - ₹5000</option>
          <option value="above5000">Above ₹5000</option>
        </select>

        {/* ############################################################ */}
        <select
          className="bg-gray-100 p-2 rounded-xl ml-5 shadow outline-none"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="4">4★ & Above</option>
          <option value="3">3★ & Above</option>
          <option value="2">2★ & Above</option>
        </select>
        <button
          className="ml-5 bg-red-500 p-2 rounded-xl text-white cursor-pointer hover:scale-110 duration-300 transition-all"
          onClick={setDefault}
        >
          Click for defalut
        </button>
      </div>
      {sortedProducts.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border border-purple-200 w-[90%] max-w-md mx-auto my-12 p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-3">🔍</div>

          <p className="text-xl font-bold text-gray-700">
            Oops! No products found 😕
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Try another search or adjust your filters.
          </p>
        </div>
      )}
    </>
  );
};

export default Products;

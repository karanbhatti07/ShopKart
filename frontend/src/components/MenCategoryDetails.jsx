import React from "react";
import Navbar from "../components/Navbar";
import API from "../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const MenCategoryDetails = () => {
  const [products, setProducts] = useState([]);

  const { category } = useParams();
  useEffect(() => {
    API.get("/products/getproduct")
      .then((response) => {
        console.log("ALL PRODUCTS:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const filteredProducts = products.filter((product) => {
    return (
      product.segment === "Men" &&
      product.category.toLowerCase() === category.toLowerCase() &&
      product.isActive === true
    );
  });

  

  if (filteredProducts.length === 0) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border rounded-2xl shadow-lg p-8 text-center max-w-md">
            No Items found
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      {/* <div className="bg-gray-100 p-10">
        <div className=" bg-gray-200 w-30 rounded-2xl px-4 py-2 text-xl outline-none">
          <select>
            <option>Price</option>
          </select>
        </div>
      </div> */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5">
        {filteredProducts.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default MenCategoryDetails;

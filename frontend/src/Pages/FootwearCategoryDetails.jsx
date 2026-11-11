import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar'
import API from "../services/Api";

const FootwearCategoryDetails = () => {
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
      product.segment === "Footwear" &&
        product.category.toLowerCase() === category.toLowerCase()
      && product.isActive === true

         );
  });
  console.log(filteredProducts);

  if(filteredProducts.length === 0){
    return(
    <>
    <Navbar/>
    <div className="border-gray-400 p-10 text-2xl bg-amber-500 w-66 mx-auto mt-[15%] flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-300 to-purple-200">
      <p>No products yet</p>
    </div>
    </>
    )
  }
  return (
   <>
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5">
        {filteredProducts.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  )
};

export default FootwearCategoryDetails;
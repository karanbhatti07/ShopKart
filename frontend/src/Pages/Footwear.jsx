import React from "react";
import Navbar from "../components/Navbar";
import API from "../services/Api";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { footwearCategories } from "../../data/menCategories";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer"


const Footwear = () => {
   const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products/getproduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  // const menProducts = products.filter((product) => {
  //   return product.segment === "Men";
  // });

  return (
    <>
      <Navbar />
      <section className="px-4 pt-6 sm:px-6 lg:px-10 bg-gray-50">
        <div className="relative w-full min-h-115 overflow-hidden rounded-2xl bg-green-300 shadow-lg md:min-h-130">
          <img
            src="/footwear_banner.jpg"
            alt="men's collection"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/65 to-transparent"></div>

          <div className="relative z-10 flex min-h-115 items-center md:min-h-130">
            <div className="w-full px-6 py-12 sm:px-10 md:w-[55%] lg:w-[48%] lg:px-14">
              <span className="inline-block rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-semibold tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                NEW FOOTWEAR'S COLLECTION
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#212758] sm:text-5xl lg:text-6xl">
                Elevate Your
                <span className="block">Everyday Style</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
                Discover modern fits, timeless essentials and effortless fashion
                designed to make every look feel special.
              </p>

              <button
                // onClick={() => navigate("/products?segment=Men")}
                className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-[#212758] px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#171b42] hover:shadow-xl active:scale-95"
              >
                SHOP NOW
                <ArrowRight
                  size={19}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
              Explore Collection
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Shop By Category
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Find your perfect style from our Footwear's collection.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 hidden h-px bg-gray-200 sm:block"></div>

          {/* Category Cards */}
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {footwearCategories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
                onClick={() => navigate(`/footwear/${category.name}`)}
              />
            ))}
          </div>
        </div>
      </section>
      <div><Footer/></div>
    </>
  );
};

export default Footwear;

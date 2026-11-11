import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { womenCategories } from "../../data/menCategories";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import { ArrowRight } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer"


const Women = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products/getproduct")
      .then((Response) => {
        setProducts(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 pt-6">
        <div className="relative w-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-xl bg-[#f8e9e8]">

          {/* Background Image */}
          <img
            src="/women_section_banner.jpg"
            alt="Women's Collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/65 to-transparent"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center min-h-115 md:min-h-130">
            <div className="w-full md:w-[55%] lg:w-[48%] px-6 sm:px-10 lg:px-14 py-12">

              <span className="inline-block bg-white/80 backdrop-blur-sm border border-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider text-gray-700 shadow-sm">
                NEW WOMEN'S COLLECTION
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[#212758]">
                Elevate Your
                <span className="block">Everyday Style</span>
              </h1>

              <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-gray-600">
                Discover modern fits, timeless essentials and effortless
                fashion designed to make every look feel special.
              </p>

              <button
                className="mt-7 inline-flex items-center gap-3 bg-[#212758] hover:bg-[#171b42] text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
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

      {/* ================= CATEGORY SECTION ================= */}
      <section className="mt-10 bg-gray-50 py-12 sm:py-16">

        {/* Section Heading */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">

            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-pink-500 uppercase">
                Explore Collection
              </p>

              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                Shop By Category
              </h2>

              <p className="mt-2 text-gray-500 text-sm sm:text-base">
                Find your perfect style from our women's collection.
              </p>
            </div>

            <div className="hidden sm:block h-px flex-1 bg-gray-200 ml-8 mb-3"></div>

          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {womenCategories.map((category) => {
              return (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  image={category.image}
                  onClick={() => navigate(`/women/${category.name}`)}
                />
              );
            })}
          </div>

        </div>
      </section>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Women;


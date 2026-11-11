// import React from "react";
// import Navbar from "../components/Navbar";
// import Login from "./Login";
// import { FaArrowRight } from "react-icons/fa";
// import Register from "./Register";
// import CategoryCard from "../components/CategoryCard";
// import categories from "../../data/categories";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Navbar />

//       {/* Shop By Category */}
//       <section className="bg-gray-50 py-12 sm:py-16">
//         <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

//           {/* Section Heading */}
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
//               Explore Our Collection
//             </p>

//             <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
//               Shop By Category
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
//               Explore our wide range of products and find something perfect
//               for you.
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="mt-6 h-px bg-gray-200"></div>

//           {/* Category Cards */}
//           <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
//             {categories.map((category) => (
//               <CategoryCard
//                 key={category.name}
//                 name={category.name}
//                 image={category.image}
//                 onClick={() => navigate(category.path)}
//               />
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;







// import React from "react";
// import Navbar from "../components/Navbar";
// import Login from "./Login";
// import { FaArrowRight } from "react-icons/fa";
// import Register from "./Register";
// import CategoryCard from "../components/CategoryCard";
// import categories from "../../data/categories";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Navbar />

//       {/* Shop By Category */}
//       <section className="bg-white py-16 sm:py-20 lg:py-24">
//         <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

//           {/* Section Heading */}
//           <div className="text-center">
//             <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500 sm:text-sm">
//               Explore Our Collection
//             </p>

//             <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//               Shop By Category
//             </h1>

//             <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
//               Discover styles you'll love. Explore our carefully selected
//               categories and find the perfect products for every occasion.
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="mx-auto mt-8 flex items-center justify-center gap-3">
//             <div className="h-px w-12 bg-gray-200"></div>
//             <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
//             <div className="h-px w-12 bg-gray-200"></div>
//           </div>

//           {/* Category Cards */}
//           <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
//             {categories.map((category) => (
//               <div
//                 key={category.name}
//                 className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <CategoryCard
//                   name={category.name}
//                   image={category.image}
//                   onClick={() => navigate(category.path)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Bottom CTA */}
//           <div className="mt-12 flex justify-center">
//             <button
//               onClick={() => navigate("/products")}
//               className="group flex items-center gap-3 rounded-full border border-gray-900 bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
//             >
//               Explore All Products
//               <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
//             </button>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;







import React from "react";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import categories from "../../data/categories";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Shop By Category */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-600 sm:text-sm">
              Explore Our Collection
            </p>

            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Shop By Category
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover the latest styles and everyday essentials
              curated just for you.
            </p>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-7 h-px w-16 bg-gray-900"></div>

          {/* Category Cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer overflow-hidden"
                // onClick={() => navigate(category.path)}
              >
                <div className="overflow-hidden ">
                  <CategoryCard
                    name={category.name}
                    image={category.image}
                    onClick={() => navigate(category.path)}
                  />
                </div>

                {/* Category Name */}
                <div className="flex items-center justify-between border-b border-gray-200 px-1 py-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-200 group-hover:text-pink-600 sm:text-base">
                    {category.name}
                  </h2>

                  <ArrowRight
                    size={17}
                    className="text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-pink-600"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Products */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 border border-gray-900 bg-gray-900 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              Explore All Products
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>
      </section>
      <Chatbot />

      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Home;


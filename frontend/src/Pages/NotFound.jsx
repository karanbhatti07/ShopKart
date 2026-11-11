import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="relative text-center max-w-2xl">

        <p className="text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
          Error 404
        </p>

        <h1 className="mt-2 text-[120px] md:text-[180px] leading-none font-black tracking-tight text-gray-900">
          4<span className="text-purple-600">0</span>4
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
          Looks like you're lost.
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to shopping.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

          <NavLink
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg"
          >
            <Home size={18} />
            Back to Home
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        <p className="mt-10 text-sm text-gray-400">
          ShopKart
        </p>

      </div>
    </div>
  );
};

export default NotFound;


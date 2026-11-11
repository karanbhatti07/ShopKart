import React from "react";

const CategoryCard = ({ product }) => {
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden bg-gray-100">
      <div className="h-54">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover p-2 rounded-2xl"
        />
      </div>

      <p className="text-center text-2xl font-bold p-5">
        {product.name}
      </p>
    </div>
  );
};

export default CategoryCard;
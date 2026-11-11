// import React from "react";
// import { NavLink } from "react-router-dom";
// import API from "../services/Api";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import { Heart } from "lucide-react";
// import { useState, useEffect } from "react";
// import { addToWishlist, removeItem } from "../redux/wishlistSlice";

// const ProductCard = ({ product }) => {
//    console.log("CARD PRODUCT:", product);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   useEffect(() => {
//     API.get("/wishlist/")
//       .then((response) => {
//         const items = response.data.wishlistItem.items;

//         const found = items.some(
//           (item) => item.product && item.product._id === product._id,
//         );

//         if (found) {
//           setIsWishlisted(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [product._id]);
//   const dispatch = useDispatch();

//   const handleaddToCart = async () => {
//     const response = await API.post("/cart/add", {
//       productId: product._id,
//     });

//     console.log(response.data);
//     alert("Product added to cart");
//   };

//   const handleWishlist = async () => {
//     if (isWishlisted === false) {
//       const response = await API.post("/wishlist/", {
//         productId: product._id,
//       });
//       dispatch(addToWishlist(product));
//       setIsWishlisted(true);

//       console.log(response.data);
//     }
//     if (isWishlisted === true) {
//       const response = await API.delete("/wishlist/", {
//         data: {
//           productId: product._id,
//         },
//       });
//         dispatch(removeItem(product._id));
//       setIsWishlisted(false);
//       console.log(response.data);
//     }
//   };
//   return (
//     <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 relative">
//       <button onClick={handleWishlist}>
//         <Heart
//           size={24}
//           className={`${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"} hover:scale-125 cursor-pointer transition duration-200`}
//         />
//       </button>
//       <div className="bg-gray-50 rounded-lg p-3">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       <div className="truncate">
//         <h2 className="text-xl font-semibold mt-4 text-gray-900">
//           {product.name}
//         </h2>
//       </div>

//       <p className="text-gray-600 font-medium mt-2">{product.brand}</p>

//       <p className="text-gray-500 text-sm">{product.category}</p>
    

//       <p className="text-xl font-bold mt-3 text-gray-900 flex justify-between">
//         ₹{product.price}
//       </p>

//       <p className="text-sm text-gray-500 mt-1">
//         Stock:{" "}
//         <span className="text-green-600 font-medium">
//           {product.stock > 0 ? product.stock : "Out of Stock"}
//         </span>
//       </p>

//       <div className="flex justify-between items-center gap-3 mt-4">
//         <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium  hover:bg-gray-800 transition-colors duration-200">
//           <NavLink to={`/products/${product._id}`}>View Details</NavLink>
//         </button>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg 
//           font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer  disabled:bg-gray-400 
//   disabled:cursor-not-allowed  "
//           onClick={() => {
//             dispatch(addToCart(product));
//             handleaddToCart();
//           }}
//           disabled={product.stock === 0}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;





import React from "react";
import { NavLink } from "react-router-dom";
import API from "../services/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState, useEffect, } from "react";
import { addToWishlist, removeItem } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  console.log("CARD PRODUCT:", product);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
  API.get("/auth/profile")
    .then((response) => {
      setUser(response.data.userId);
    })
    .catch(() => {
      setUser(null);
    });
}, []);
  useEffect(() => {
    API.get("/wishlist/")
      .then((response) => {
        const items = response.data.wishlistItem.items;

        const found = items.some(
          (item) => item.product && item.product._id === product._id
        );

        if (found) {
          setIsWishlisted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product._id]);

  const dispatch = useDispatch();

  const handleaddToCart = async () => {
    const response = await API.post("/cart/add", {
      productId: product._id,
    });

    console.log(response.data);
    toast.success("Product added to cart");
  };

  const handleWishlist = async () => {
    if (isWishlisted === false) {
      const response = await API.post("/wishlist/", {
        productId: product._id,
      });

      dispatch(addToWishlist(product));
      setIsWishlisted(true);

      
      console.log(response.data);
    }

    if (isWishlisted === true) {
      const response = await API.delete("/wishlist/", {
        data: {
          productId: product._id,
        },
      });

      dispatch(removeItem(product._id));
      setIsWishlisted(false);

      console.log(response.data);
    }
  };

  const loginCheck = async ()=>{
    if(!user ){
     navigate("/login");
    }

  }

  return (
    <div className="group w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* Image Section */}
      <div className="relative bg-gray-50 p-4">

        {/* Wishlist */}
        <button

          onClick={()=>{
            loginCheck()
            handleWishlist()
          }
          }
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200"
        >
          <Heart
            size={21}
            className={
              isWishlisted
                ? "text-red-500 fill-red-500"
                : "text-gray-600"
            }
          />
        </button>

        {/* Product Image */}
        <NavLink to={`/products/${product._id}`}>
          <div className="h-56 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </NavLink>

        {/* Stock Badge */}
        <div className="absolute bottom-6 left-6">
          {product.stock > 0 ? (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Category */}
        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
          {product.category}
        </p>

        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2 min-h-14 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h2>

        {/* Brand */}
        <p className="text-sm text-gray-500 mt-1">
          {product.brand}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <Star
            size={16}
            className="text-yellow-400 fill-yellow-400"
          />

          <span className="text-sm font-medium text-gray-700">
            {product.rating || "No rating"}
          </span>

          {product.numReviews > 0 && (
            <span className="text-xs text-gray-400">
              ({product.numReviews})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          {/* View Details */}
          <NavLink
            to={`/products/${product._id}`}
            className="flex-1"
          >
            <button className="w-full border border-gray-300 text-gray-800 px-3 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200">
              View Details
            </button>
          </NavLink>

          {/* Add Cart */}
          <button
            className="flex-1 bg-gray-900 text-white px-3 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => {
              loginCheck()
              dispatch(addToCart(product));
              handleaddToCart();
            }}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={18} />
            Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;

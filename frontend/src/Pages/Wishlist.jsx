// // // import Product from "../../../backend/models/Product_model";
// // import Navbar from "../components/Navbar";
// // import API from "../services/Api";
// // import React, { useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { setCart } from "../redux/cartSlice";
// // import { useSelector } from "react-redux";
// // // import { setWishlist } from "../redux/cartSlice";

// // const Wishlist = () => {
// //   const [wishlist, setWishlist] = useState({});
// //   const dispatch = useDispatch();
// //   const [wishlistdata, setWishlistdata] = useState({});

// //   const wishlistItems = useSelector((state) => state.wishlist.items);

// //   useEffect(() => {
// //     API.get("/wishlist/")
// //       .then((Response) => {
// //         console.log(Response.data);
// //         setWishlistdata(Response.data.wishlistItem);
// //         dispatch(setCart(Response.data.wishlist.items));
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   }, [dispatch]);

// //   return (
// //     <>
// //       <Navbar />
// //       <div className=" p-10 gap-6  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 relative">
// //         {wishlist?.items?.map((item) => {
// //           if (item.product === null) {
// //             return null;
// //           }

// //           return (
// //             <div
// //               key={item.product._id}
// //               className="p-4 w-full h-full shadow truncate"
// //             >
// //               <img
// //                 src={item.product.image}
// //                 className="object-contain w-full h-48"
// //               />
// //               <h1>{item.product.name}</h1>
// //               <div>
// //                 <h1>{item.product.category}</h1>
// //               </div>
// //               <div>
// //                 <h1>{item.product.brand}</h1>
// //               </div>
// //               <div>
// //                 <h1>{item.product.price}</h1>
// //               </div>
// //               <div>
// //                 <h1>{item.product.stock}</h1>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </>
// //   );
// // };

// // export default Wishlist;.

// import Navbar from "../components/Navbar";
// import API from "../services/Api";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setwishlist } from "../redux/wishlistSlice";

// const Wishlist = () => {
//   const dispatch = useDispatch();
  

//   const wishlistItems = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     API.get("/wishlist/")
//       .then((response) => {
//         console.log(response.data);

//         dispatch(setwishlist(response.data.wishlistItem.items));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [dispatch]);

//   if (wishlistItems.length === 0) {
//     return (
//       <>
//         <Navbar />

//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <p className="bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 border border-pink-200 rounded-2xl shadow-lg p-8 text-center max-w-md hover:shadow-xl transition-all">
//              Your wishlist is empty Save your favorite products here.
//           </p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="p-10 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 relative">
//         {wishlistItems.map((item) => {
//           if (item.product === null) {
//             return null;
//           }

//           return (
//             <div
//               key={item.product._id}
//               className=" w-full h-full shadow truncate hover:-translate-y-2 transition-all duration-400"
//             >
//               <div className="bg-gray-100 p-2 w-full hover:scale-105 transition-all duration-300">
//               <img
//                 src={item.product.image}
//                 className="object-contain w-full h-48"
//               />
//               </div>

//               <h1>{item.product.name}</h1>
//               <h1>{item.product.category}</h1>
//               <h1>{item.product.brand}</h1>
//               <h1>{item.product.price}</h1>
//               <h1>{item.product.stock}</h1>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Wishlist;








import Navbar from "../components/Navbar";
import API from "../services/Api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setwishlist, removeItem } from "../redux/wishlistSlice";
import { Heart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    API.get("/wishlist/")
      .then((response) => {
        console.log(response.data);

        dispatch(setwishlist(response.data.wishlistItem.items));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  // Remove product from wishlist
  const handleRemoveWishlist = async (productId) => {
    try {
      const response = await API.delete("/wishlist/", {
        data: {
          productId: productId,
        },
      });

      console.log(response.data);

      // Redux se remove
      dispatch(removeItem(productId));

      toast.success("Removed from wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from wishlist");
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[80vh] items-center justify-center bg-white px-5">
          <div className="max-w-md text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Heart
                size={34}
                strokeWidth={1.5}
                className="text-gray-500"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Wishlist is Empty
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Save your favorite products here and come back
              whenever you're ready to shop.
            </p>

            <button
              onClick={() => (window.location.href = "/products")}
              className="mt-7 inline-flex items-center gap-2 bg-gray-900 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-gray-700"
            >
              <ShoppingBag size={18} />
              START SHOPPING
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="mx-auto max-w-7xl border-b border-gray-200 pb-7">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 sm:text-sm">
            Your Collection
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            <Heart
              size={28}
              strokeWidth={1.5}
              className="hidden text-gray-900 sm:block"
            />
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">

          {wishlistItems.map((item) => {
            if (item.product === null) {
              return null;
            }

            return (
              <div
                key={item.product._id}
                className="group relative"
              >

                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-64 w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 sm:h-72"
                  />

                  {/* Wishlist Heart */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveWishlist(item.product._id)
                    }
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      size={19}
                      strokeWidth={2}
                      className="fill-red-500 text-red-500 transition-colors duration-200"
                    />
                  </button>

                  {/* Stock Badge */}
                  {item.product.stock === 0 && (
                    <span className="absolute bottom-3 left-3 bg-gray-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="pt-4">

                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    {item.product.brand}
                  </p>

                  <h2 className="mt-1 truncate text-sm font-semibold text-gray-900 sm:text-base">
                    {item.product.name}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.product.category}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-base font-bold text-gray-900">
                      ₹{item.product.price}
                    </p>

                    {item.product.stock > 0 ? (
                      <span className="text-[11px] font-medium text-green-600">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-red-500">
                        Out of Stock
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Wishlist;


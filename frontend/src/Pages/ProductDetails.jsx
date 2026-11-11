// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../services/Api";
// import Navbar from "../components/Navbar";
// import { ShoppingCart } from "lucide-react";
// import { Star } from "lucide-react";

// import Products from "./Products";
// const ProductDetails = (props) => {
//   const { id } = useParams();

//   const [product1, setProduct1] = useState(null);
//   const [reviews, setReview] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [activeTab, setActiveTab] = useState("description");

//   useEffect(() => {
//     console.log("Product ID:", id);
//     API.get(`/products/getSingleProduct/${id}`)
//       .then((response) => {
//         setProduct1(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   useEffect(() => {
//     API.get(`/review/getReview/${id}`)
//       .then((response) => {
//         setReview(response.data.review);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const submitReview = async (id) => {
//     try {
//       const response = await API.post("/review/createReview", {
//         product: id,
//         rating: rating,
//         comment: comment,
//       });
//       console.log(response.data);
//       const productResponse = await API.get(`/products/getSingleProduct/${id}`);

//       setProduct1(productResponse.data);

//       await getReviews(id);
//       setRating(0);
//       setComment("");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getReviews = async (id) => {
//     try {
//       const response = await API.get(`/review/getReview/${id}`);
//       setReview(response.data.review);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getReviews(id);
//   }, [id]);

//   if (!product1) {
//     return <p>Loading...</p>;
//   }
//   console.log(product1);
//   return (
//     <>
//       <Navbar />
//       <div>
//         <div className=" flex">
//           <div className="w-[50%] px-20 py-10  ">
//             <div className="bg-gray-100 h-125 flex items-center justify-center">
//               <img
//                 src={product1.image}
//                 className="h-full w-full object-contain"
//               />
//             </div>
//           </div>
//           <div className="px-10 py-10 flex-1">
//             <h1 className=" text-2xl font-bold mb-10">{product1.brand22}</h1>

//             <h1 className=" text-2xl font-bold mb-10">{product1.name}</h1>
//             <p className=" text-2xl mb-10">₹{product1.price}</p>
//             <p className="text-gray-400">{product1.rating}</p>
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={
//                     product1.rating >= star
//                       ? "fill-yellow-400 text-yellow-400"
//                       : "text-gray-300"
//                   }
//                 />
//               ))}
//             </div>

//             <p className="text-gray-400">{product1.description}</p>
//             {/* {reviews.map((review) => {
//               return (
//                 <div key={review._id}>
//                   <p>{review.rating}</p>
//                 </div>
//               );
//             })} */}
//             <button className="w-full mt-20 bg-black text-white p-5 font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gray-900 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3">
//               <ShoppingCart size={20} />
//               ADD TO CART
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="py-4 px-6">
//         <div className="border border-gray-100 rounded-2xl p-2">
//           {/* Tabs */}
//           <div className="flex border-b border-gray-200 rounded-sm m-2 gap-10 p-3">
//             <button
//               className={`text-xl ${
//                 activeTab === "description"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600"
//               }`}
//               onClick={() => setActiveTab("description")}
//             >
//               Description
//             </button>

//             <button
//               className={`text-xl ${
//                 activeTab === "specifications"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600"
//               }`}
//               onClick={() => setActiveTab("specifications")}
//             >
//               Specifications
//             </button>

//             <button
//               className={`text-xl ${
//                 activeTab === "reviews"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600"
//               }`}
//               onClick={() => setActiveTab("reviews")}
//             >
//               Reviews
//             </button>
//           </div>

//           {/* Content */}
//           <div className="bg-gray-100 rounded-2xl p-4 m-2">
//             {/* Description */}
//             {activeTab === "description" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-3">Product Description</h2>

//                 <p className="text-gray-600">{product1.description}</p>
//               </div>
//             )}

//             {/* Specifications */}
//             {activeTab === "specifications" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Specifications</h2>

//                 <p>Brand: {product1.brand}</p>
//                 <p>Category: {product1.category}</p>
//                 <p>Stock: {product1.stock}</p>
//                 <p>Price: ₹{product1.price}</p>
//               </div>
//             )}

//             {/* Reviews */}
//             {activeTab === "reviews" && (
//               <div className="flex gap-6">
//                 {/* Customer Reviews */}
//                 <div className="w-[70%] rounded-lg p-5">
//                   <h2 className="font-bold text-2xl">Customer Reviews</h2>

//                   <p className="text-gray-600 text-sm mb-5">
//                     Real experiences from our customers
//                   </p>
//                   <div className="flex">
//                     <p className="text-6xl font-bold">
//                       {Number(product1.rating).toFixed(1)}
//                     </p>
//                     <p className="text-[15px] text-gray-500 flex items-center ml-20 ">
//                       ({product1.numReviews} reviews)
//                     </p>
//                   </div>
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={
//                           product1.rating >= star
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                   </div>

//                   {/* Reviews */}
//                   <div className="mt-6">
//                     {reviews.map((review) => (
//                       <div key={review._id} className="border-b py-4">
//                         <p className="font-semibold">{review.user.name}</p>

//                         <p>⭐{review.rating}</p>

//                         <p className="text-gray-600 mt-1">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Write Review */}
//                 <div className="flex-1 rounded-lg p-5 bg-blue-50">
//                   <h2 className="font-bold text-xl">Write a Review</h2>

//                   <p className="text-gray-600 text-sm mb-5">
//                     Share your experience with others
//                   </p>

//                   <div className="mb-5">
//                     <p className="font-bold mb-2">Rating</p>
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => {
//                         return (
//                           <Star
//                             key={star}
//                             onClick={() => setRating(star)}
//                             className={
//                               rating >= star
//                                 ? "fill-yellow-300"
//                                 : "fill-gray-500"
//                             }
//                           />
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <p className="font-bold mb-2">Comment</p>

//                     <textarea
//                       className="border w-full rounded-lg p-3"
//                       placeholder="Write your review..."
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     />
//                   </div>

//                   <button
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg mt-5"
//                     onClick={() => {
//                       submitReview(id);
//                       getReviews(id);
//                     }}
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { ShoppingCart, Star, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product1, setProduct1] = useState(null);
  const [reviews, setReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useDispatch();

  const handleaddToCart = async () => {
    const response = await API.post("/cart/add", {
      productId: product1._id,
    });

    console.log(response.data);
    toast.success("Product added to cart");
    setIsInCart(true);
  };

  useEffect(() => {
    API.get(`/products/getSingleProduct/${id}`)
      .then((response) => {
        setProduct1(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const getReviews = async (id) => {
    try {
      const response = await API.get(`/review/getReview/${id}`);
      setReview(response.data.review);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews(id);
  }, [id]);

  const submitReview = async (id) => {
    try {
      const response = await API.post("/review/createReview", {
        product: id,
        rating: rating,
        comment: comment,
      });

      console.log(response.data);

      const productResponse = await API.get(`/products/getSingleProduct/${id}`);

      setProduct1(productResponse.data);

      await getReviews(id);

      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!product1) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ================= PRODUCT SECTION ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* ================= IMAGE ================= */}
            <div>
              <div className="group flex h-112.5 items-center justify-center overflow-hidden bg-gray-50 sm:h-137.5">
                <img
                  src={product1.image}
                  alt={product1.name}
                  className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Small info */}
              <div className="mt-5 grid grid-cols-3 border border-gray-200">
                <div className="border-r border-gray-200 p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Brand
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {product1.brand}
                  </p>
                </div>

                <div className="border-r border-gray-200 p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {product1.category}
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Availability
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      product1.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product1.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= PRODUCT INFO ================= */}
            <div className="flex flex-col justify-center">
              {/* Brand */}
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">
                {product1.brand}
              </p>

              {/* Product Name */}
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product1.name}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        product1.rating >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  {Number(product1.rating).toFixed(1)} ({product1.numReviews}{" "}
                  reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-7">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{product1.price}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-gray-200"></div>

              {/* Description */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Product Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {product1.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">
                {product1.stock > 0 ? (
                  <>
                    <Check size={17} className="text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      In Stock
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium text-red-600">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Add To Cart */}
              <button
                disabled={product1.stock === 0}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-pink-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={() => {
                  if (isInCart) {
                    navigate("/cart");
                  } else {
                    dispatch(addToCart(product1));
                    handleaddToCart();
                  }
                }}
              >
                <ShoppingCart size={20} />

                {product1.stock === 0
                  ? "Out of Stock"
                  : isInCart
                    ? "Go to Cart"
                    : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="overflow-hidden border border-gray-200 bg-white">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`whitespace-nowrap px-6 py-5 text-sm font-semibold uppercase tracking-wider transition ${
                  activeTab === "description"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-gray-800"
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("specifications")}
                className={`whitespace-nowrap px-6 py-5 text-sm font-semibold uppercase tracking-wider transition ${
                  activeTab === "specifications"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-gray-800"
                }`}
              >
                Specifications
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`whitespace-nowrap px-6 py-5 text-sm font-semibold uppercase tracking-wider transition ${
                  activeTab === "reviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-gray-800"
                }`}
              >
                Reviews ({product1.numReviews})
              </button>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* DESCRIPTION */}
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Product Description
                  </h2>

                  <p className="mt-4 text-sm leading-8 text-gray-600">
                    {product1.description}
                  </p>
                </div>
              )}

              {/* SPECIFICATIONS */}
              {activeTab === "specifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Specifications
                  </h2>

                  <div className="mt-6 max-w-2xl divide-y divide-gray-200 border-y border-gray-200">
                    <div className="flex justify-between py-4">
                      <span className="text-sm text-gray-500">Brand</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {product1.brand}
                      </span>
                    </div>

                    <div className="flex justify-between py-4">
                      <span className="text-sm text-gray-500">Category</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {product1.category}
                      </span>
                    </div>

                    <div className="flex justify-between py-4">
                      <span className="text-sm text-gray-500">Stock</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {product1.stock}
                      </span>
                    </div>

                    <div className="flex justify-between py-4">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{product1.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* REVIEWS */}
              {activeTab === "reviews" && (
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
                  {/* CUSTOMER REVIEWS */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Customer Reviews
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Real experiences from our customers
                    </p>

                    {/* Rating Summary */}
                    <div className="mt-8 flex items-center gap-6 border-b border-gray-200 pb-8">
                      <div>
                        <p className="text-5xl font-bold text-gray-900">
                          {Number(product1.rating).toFixed(1)}
                        </p>

                        <div className="mt-2 flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={18}
                              className={
                                product1.rating >= star
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500">
                        Based on {product1.numReviews} reviews
                      </p>
                    </div>

                    {/* Reviews List */}
                    <div className="mt-6">
                      {reviews.length === 0 ? (
                        <p className="py-8 text-sm text-gray-500">
                          No reviews yet. Be the first to review this product.
                        </p>
                      ) : (
                        reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border-b border-gray-200 py-6"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-900">
                                {review.user.name}
                              </p>

                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={15}
                                    className={
                                      review.rating >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                              {review.comment}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* WRITE REVIEW */}
                  <div className="h-fit border border-gray-200 bg-gray-50 p-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Write a Review
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Share your experience with others
                    </p>

                    {/* Rating */}
                    <div className="mt-7">
                      <p className="mb-3 text-sm font-semibold text-gray-900">
                        Your Rating
                      </p>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={24}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer transition ${
                              rating >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mt-6">
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Your Comment
                      </label>

                      <textarea
                        rows="5"
                        className="w-full resize-none border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-black"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={() => submitReview(id)}
                      className="mt-5 w-full bg-black py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-pink-600"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

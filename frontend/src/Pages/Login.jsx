// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { use, useState } from "react";
// import API from "../services/Api";
// import Navbar from "../components/Navbar";
// import { NavLink, useNavigate } from "react-router-dom";
// import { ShoppingCart } from "lucide-react";
// import { Hand } from "lucide-react";
// import { ArrowRight } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { Mail } from "lucide-react";
// import { LockKeyhole } from "lucide-react";
// import { Eye, EyeOff } from "lucide-react";

// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Enter a valid email address"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(1, "Password must be at least 1 characters"),
//   rememberMe: z.boolean().optional(),
// });

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const login = async (data) => {
//     console.log("Login data", data);

//     try {
//       const response = await API.post("/auth/login", {
//         email: data.email,
//         password: data.password,
//         rememberMe: data.rememberMe,
//       });
//       //  console.log(response.data)
//       //   alert("Login successful")
//       console.log(response.data);

//       const role = response.data.user.role;

//       if (role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       alert("invalid email or password !");
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <form onSubmit={handleSubmit(login)}>
//         <div className="w-225 mx-auto flex mt-2">
//           <div className="w-[50%] bg-[#E8F0FE]">
//             <h1 className=" flex items-center justify-center text-4xl mt-2">
//               <ShoppingCart size={34} color="blue" />
//               <span className="ml-3 font-bold">
//                 Shop<span className="text-blue-500 font-bold">Kart</span>
//               </span>
//             </h1>
//             <p className="text-center py-2">Shop More . Save More . Be Happy</p>
//             <div className="w-100 p-2 ml-5 h-105 overflow-hidden ">
//               <img
//                 src="/carttrolly.jpg"
//                 alt="carttrolly_img"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <p className="text-2xl px-20 text-[#182238] font-bold">
//               Your Next Favourite Product Awaits
//             </p>
//             <p className="py-2 px-20 text-blue-500">
//               Login to continue your shopping journey and get the best deals,
//               exclusive offers and much more
//             </p>
//           </div>
//           <div className="bg-white">
//             <h1 className="font-bold text-4xl px-16 py-5">
//               Welcome Back
//               <span>👋</span>
//             </h1>
//             <p className="px-16 text-blue-700 text-xl mb-10">
//               Login to your account to continue shhoping
//             </p>
//             <div className="px-15 relative">
//               <label className="text-2xl">Email Address</label>
//               <Mail
//                 className="absolute left-16 top-16 -translate-y-1/2 text-black"
//                 size={20}
//               />
//               <input
//                 type="email"
//                 {...register("email")}
//                 placeholder="Enter email"
//                 className="border border-gray-200 bg-white h-12 w-full rounded-xl px-8 mt-2 mb-4 "
//               ></input>
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//               <div className="relative">
//                 <label className="text-2xl">Password</label>

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password")}
//                   placeholder="Enter password"
//                   className="h-12 w-full rounded-xl px-8 mt-2 border border-gray-200 bg-white"
//                 ></input>
//                 {showPassword ? (
//                   <EyeOff
//                     className="absolute bottom-3 left-80"
//                     size={20}
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 ) : (
//                   <Eye
//                     className="absolute bottom-3 left-80"
//                     size={20}
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 )}

//                 <LockKeyhole
//                   className="absolute left-2 bottom-1 -translate-y-1/2 text-black"
//                   size={20}
//                 />
             
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <div className=" text-sm px-16 flex justify-between">
//               <div className="flex items-center gap-2 mt-3">
//                 <input type="checkbox" {...register("rememberMe")} />

//                 <label>Remember me</label>
//               </div>
//               <button className="text-blue-700 font-semibold"> <NavLink to="/forgotpassword">Forgot Password </NavLink></button>
//             </div>
//             <div className="justify-between flex px-16 mt-10">
//               <button
//                 className="w-full flex justify-center items-center gap-3 text-2xl bg-blue-600 text-white p-2 cursor-pointer hover:scale-110 transition-all duration-200 rounded-xl mx-auto"
//                 type="submit"
//               >
//                 Login <ArrowRight size={24} />
//               </button>
//             </div>
//             <div className="justify-between flex px-16 mt-10">
//               <button
//                 className="w-full flex justify-center items-center gap-3 text-md outline outline-gray-300 p-2 cursor-pointer hover:scale-110 transition-all duration-200 rounded-xl mx-auto"
//                 type="submit"
//               >
//                 <FcGoogle size={24} />
//                 Continue with Google
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;





import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data) => {
    console.log("Login data", data);

    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      console.log(response.data);

      const role = response.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("invalid email or password !");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6">
        <form
          onSubmit={handleSubmit(login)}
          className="mx-auto flex max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg"
        >

          {/* Left Section */}
          <div className="hidden w-1/2 bg-[#E8F0FE] p-8 md:block">

            {/* Logo */}
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart
                size={28}
                className="text-blue-600"
              />

              <h1 className="text-2xl font-bold text-gray-900">
                Shop
                <span className="text-blue-600">Kart</span>
              </h1>
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              Shop More · Save More · Be Happy
            </p>

            {/* Image */}
            <div className="mt-7 h-64 overflow-hidden rounded-xl">
              <img
                src="/carttrolly.jpg"
                alt="carttrolly_img"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <h2 className="mt-7 text-2xl font-bold leading-tight text-[#182238]">
              Your Next Favourite
              <span className="block">Product Awaits</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-600">
              Login to continue your shopping journey and get the best
              deals, exclusive offers and much more.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full p-7 sm:p-9 md:w-1/2">

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back <span>👋</span>
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login to your account to continue shopping.
              </p>
            </div>

            {/* Email */}
            <div className="mt-7">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative mt-2">

                <LockKeyhole
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">

              <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 accent-blue-600"
                />

                Remember me
              </label>

              <NavLink
                to="/forgotpassword"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </NavLink>
            </div>

            {/* Login Button */}
            <button
              className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
              type="submit"
            >
              Login
              <ArrowRight size={18} />
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Create Account
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;


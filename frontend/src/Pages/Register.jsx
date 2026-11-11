// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useState } from "react";
// import API from "../services/Api";
// import Navbar from "../components/Navbar";

// import { ShoppingCart, User, Mail, LockKeyhole } from "lucide-react";
// import { ArrowRight } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { Eye, EyeOff } from "lucide-react";

// const registerSchema = z
//   .object({
//     username: z.string().min(1, "Name is required"),

//     email: z.string().min(1, "Email is required").email("Enter a valid Email"),

//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(6, "Password must be at least 6 characters"),

//     confirmPassword: z.string().min(1, "Confirm password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showconfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const handleRegister = async (data) => {
//     try {
//       const response = await API.post("/auth/register", {
//         name: data.username,
//         password: data.password,
//         email: data.email,
//         role: "user",
//       });

//       console.log(response.data);

//       alert("Registration successful");

//       reset();
//     } catch (error) {
//       console.log(error);
//       console.log("STATUS:", error.response?.status);
//       console.log("DATA:", error.response?.data);

//       alert("Registration failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <form onSubmit={handleSubmit(handleRegister)}>
//         <div className="w-225 mx-auto flex mt-2">
//           {/* LEFT SIDE */}
//           <div className="w-[50%] bg-[#E8F0FE]">
//             <h1 className="flex items-center justify-center text-4xl mt-2">
//               <ShoppingCart size={34} color="blue" />

//               <span className="ml-3 font-bold">
//                 Shop<span className="text-blue-500 font-bold">Kart</span>
//               </span>
//             </h1>

//             <p className="text-center py-2">Shop More . Save More . Be Happy</p>

//             <div className="w-100 p-2 ml-5 h-105 overflow-hidden">
//               <img
//                 src="/signup-page-img.png"
//                 alt="signup-page-img"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <p className="text-2xl px-20 text-[#182238] font-bold">
//               Join ShopKart Today
//             </p>

//             <p className="py-2 px-20 text-blue-500">
//               Create your account and get access to amazing deals, faster
//               checkouts and a personalized shopping experience
//             </p>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex-1">
//             <h1 className="font-bold text-4xl px-16 py-5">Create Account</h1>

//             <p className="px-16 text-blue-700 text-xl mb-10">
//               Fill in your details to get started
//             </p>

//             <div className="px-15">
//               {/* NAME */}
//               <div className="relative">
//                 <label className="text-xl">Full Name</label>

//                 <input
//                   type="text"
//                   {...register("username")}
//                   placeholder="Enter your full name"
//                   className="h-12 w-full rounded-xl px-8 mt-2 border border-gray-200 bg-white"
//                 />

//                 <User className="absolute top-12 left-2" size={24} />
//               </div>

//               {errors.username && (
//                 <p className="text-red-500 text-sm">
//                   {errors.username.message}
//                 </p>
//               )}

//               {/* EMAIL */}
//               <div className="relative">
//                 <label className="text-xl">Email Address</label>

//                 <input
//                   type="email"
//                   {...register("email")}
//                   placeholder="Enter your email"
//                   className="h-12 w-full rounded-xl px-8 mt-2 border border-gray-200 bg-white"
//                 />

//                 <Mail
//                   className="absolute left-2 bottom-1 -translate-y-1/2 text-black"
//                   size={20}
//                 />
//               </div>

//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}

//               {/* PASSWORD */}
//               <div className="relative">
//                 <label className="text-xl">Password</label>

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password")}
//                   placeholder="Create a password"
//                   className="h-12 w-full rounded-xl px-8 mt-2 border border-gray-200 bg-white"
//                 />

//                 {showPassword ? (
//                   <EyeOff
//                     className="absolute bottom-3 left-75"
//                     size={20}
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 ) : (
//                   <Eye
//                     className="absolute bottom-3 left-75"
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

//               {/* CONFIRM PASSWORD */}
//               <div className="relative">
//                 <label className="text-xl">Confirm Password</label>

//                 <input
//                   type={showconfirmPassword ? "text" : "password"}
//                   {...register("confirmPassword")}
//                   placeholder="Confirm your password"
//                   className="h-12 w-full rounded-xl px-8 mt-2 border border-gray-200 bg-white"
//                 />
//                   {showconfirmPassword ? (
//                   <EyeOff
//                     className="absolute bottom-3 left-75"
//                     size={20}
//                     onClick={() => setShowConfirmPassword(!showconfirmPassword)}
//                   />
//                 ) : (
//                   <Eye
//                     className="absolute bottom-3 left-75"
//                     size={20}
//                     onClick={() => setShowConfirmPassword(!showconfirmPassword)}
//                   />
//                 )}

//                 <LockKeyhole
//                   className="absolute left-2 bottom-1 -translate-y-1/2 text-black"
//                   size={20}
//                 />

               
//               </div>

//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* REGISTER BUTTON */}
//             <div className="flex px-16 mt-2 justify-between">
//               <button
//                 className="flex justify-center items-center gap-3 text-2xl rounded-2xl cursor-pointer hover:scale-110 transition-all duration-300 bg-blue-600 text-white w-full h-10 p-7"
//                 type="submit"
//               >
//                 Register
//                 <ArrowRight size={24} />
//               </button>
//             </div>

//             {/* GOOGLE BUTTON */}
//             <div className="justify-between flex px-16 mt-10">
//               <button
//                 className="w-full flex justify-center items-center gap-3 text-md outline outline-gray-300 p-2 cursor-pointer hover:scale-110 transition-all duration-200 rounded-xl mx-auto"
//                 type="button"
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

// export default Register;












import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

import {
  ShoppingCart,
  User,
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

const registerSchema = z
  .object({
    username: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid Email"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    try {
      const response = await API.post("/auth/register", {
        name: data.username,
        password: data.password,
        email: data.email,
        role: "user",
      });

      console.log(response.data);

      alert("Registration successful");

      reset();
    } catch (error) {
      console.log(error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      alert("Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6">

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mx-auto flex max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg"
        >

          {/* LEFT SIDE */}
          <div className="hidden w-1/2 bg-[#E8F0FE] p-8 md:block">

            {/* Logo */}
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart
                size={28}
                className="text-blue-600"
              />

              <h1 className="text-2xl font-bold text-gray-900">
                Shop
                <span className="text-blue-600">
                  Kart
                </span>
              </h1>
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              Shop More · Save More · Be Happy
            </p>

            {/* Image */}
            <div className="mt-7 h-64 overflow-hidden rounded-xl">
              <img
                src="/signup-page-img.png"
                alt="signup-page-img"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <h2 className="mt-7 text-2xl font-bold leading-tight text-[#182238]">
              Join ShopKart
              <span className="block">
                Today
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-600">
              Create your account and get access to amazing deals,
              faster checkouts and a personalized shopping experience.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full p-7 sm:p-9 md:w-1/2">

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Fill in your details to get started.
              </p>
            </div>

            {/* NAME */}
            <div className="mt-7">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  {...register("username")}
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mt-5">
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

            {/* PASSWORD */}
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
                  placeholder="Create a password"
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

            {/* CONFIRM PASSWORD */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <LockKeyhole
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={
                    showconfirmPassword
                      ? "text"
                      : "password"
                  }
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showconfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showconfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* REGISTER BUTTON */}
            <button
              className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
              type="submit"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* LOGIN LINK */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Login
              </NavLink>
            </p>

          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

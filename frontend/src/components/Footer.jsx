import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight">
                SHOP<span className="text-pink-500">KART</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
              Discover the latest fashion, trends and everyday essentials,
              all in one place. Shop smart, shop with ShopKart.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
             <FaInstagram size={18} />
             <FaFacebookF size={18} />
             <FaTwitter size={18} />
            </div>
          </div>

          {/* ================= SHOP ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/products"
                  className="transition hover:text-pink-500"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/men"
                  className="transition hover:text-pink-500"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  to="/women"
                  className="transition hover:text-pink-500"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  to="/kids"
                  className="transition hover:text-pink-500"
                >
                  Kids
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="transition hover:text-pink-500"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CUSTOMER CARE ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Customer Care
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/cart"
                  className="transition hover:text-pink-500"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="transition hover:text-pink-500"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-pink-500"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition hover:text-pink-500"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-pink-500"
                />

                <p>
                  Hisar, Haryana
                  <br />
                  India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-pink-500" />

                <span>+91 95181-09229</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-pink-500" />

                <span>support@shopkart.com</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-10">

          <p className="text-xs text-gray-500">
            © 2026 ShopKart. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs text-gray-500">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;


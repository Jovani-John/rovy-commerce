import React, { useState, useEffect, useContext } from "react";
import { IoBagOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { HiUser, HiLogout } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../pages/WishlistContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // استخدام WishlistContext للحصول على بيانات الـ wishlist والـ cart
  const { wishlist, cart } = useContext(WishlistContext);

  // حساب عدد المنتجات في الـ wishlist
  const wishlistCount = wishlist.reduce((total, item) => total + item.quantity, 0);
  
  // حساب عدد المنتجات في الـ cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // تحديث حالة المستخدم عند تغيير localStorage
  const updateUserState = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  };

  useEffect(() => {
    updateUserState();
    // إضافة event listener للـ storage changes
    window.addEventListener('storage', updateUserState);
    return () => window.removeEventListener('storage', updateUserState);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-4 md:p-5 flex-row items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`flex items-center text-gray-900 transition-all duration-300 ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          } text-3xl font-['Abril_Fatface'] text-green-800 font-bold hover:text-green-900 hover:scale-105`}
        >
          ROVY
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:ml-auto md:mr-auto items-center text-base justify-center gap-10">
          {[
            { to: "/", label: "HOME" },
            { to: "/product", label: "PRODUCTS" },
            { to: "/about", label: "ABOUT" },
            { to: "/contact", label: "CONTACT" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-green-800 hover:text-green-950 text-sm font-bold cursor-pointer relative group transition-all duration-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Icons + Login or User Info */}
        <div className="hidden md:flex items-center gap-6 relative">
          {/* Wishlist Link with Counter */}
          <Link to="/wishlist" aria-label="Go to wishlist" className="relative group">
            <FaRegHeart className="w-7 h-7 text-green-800 font-bold hover:text-green-900 cursor-pointer transition-all duration-300 group-hover:scale-110" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link with Counter */}
          <Link to="/cart" aria-label="Go to cart" className="relative group">
            <IoBagOutline className="w-7 h-7 text-green-800 font-bold hover:text-green-900 cursor-pointer transition-all duration-300 group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {loggedInUser ? (
            <div className="relative">
              {/* User Info Button */}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-green-200 py-2 px-4 rounded-full hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <HiUser className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-800 font-bold text-sm">
                  {loggedInUser.username}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-all duration-200"
                  >
                    <HiUser className="w-5 h-5" />
                    My Profile
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full text-left"
                  >
                    <HiLogout className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="inline-flex items-center border-2 py-2 px-6 border-green-800 font-bold text-green-800 rounded-full text-base hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              SIGN UP
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800 focus:outline-none p-2 rounded-lg hover:bg-green-100 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white/95 backdrop-blur-sm border-t border-green-100">
          <div className="flex flex-col items-center gap-6 pt-6">
            {/* Logo in mobile menu */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-3xl font-['Abril_Fatface'] text-green-800 font-bold hover:text-green-900"
            >
              ROVY
            </Link>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-center">
              {[
                { to: "/", label: "HOME" },
                { to: "/product", label: "PRODUCTS" },
                { to: "/about", label: "ABOUT" },
                { to: "/contact", label: "CONTACT" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="text-green-800 hover:text-green-950 text-lg font-bold cursor-pointer py-2 transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Icons + Login or User Info */}
            <div className="flex flex-row gap-6 items-center justify-center">
              {/* Mobile Wishlist with Counter */}
              <Link to="/wishlist" onClick={closeMenu} aria-label="Go to wishlist" className="relative">
                <FaRegHeart className="w-6 h-6 text-green-800 hover:text-green-900 cursor-pointer transition-all duration-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Mobile Cart with Counter */}
              <Link to="/cart" onClick={closeMenu} aria-label="Go to cart" className="relative">
                <IoBagOutline className="w-6 h-6 text-green-800 hover:text-green-900 cursor-pointer transition-all duration-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {loggedInUser ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <HiUser className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-800 font-bold text-lg">
                    {loggedInUser.username}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="inline-flex items-center border-2 py-2 px-5 border-green-800 font-bold text-green-800 rounded-full text-sm hover:bg-green-800 hover:text-white transition-all duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center border-2 py-2 px-5 border-red-500 font-bold text-red-500 rounded-full text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signup"
                onClick={closeMenu}
                className="inline-flex items-center border-2 py-3 px-8 border-green-800 font-bold text-green-800 rounded-full text-lg hover:bg-green-800 hover:text-white transition-all duration-300"
              >
                SIGN UP
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
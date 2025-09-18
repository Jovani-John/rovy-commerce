// ProductDetails.jsx
import React from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetails = ({ product, toggleWishlist, isLiked, addToCart }) => {
  if (!product) return null;

  return (
    <motion.section
      className="text-gray-700 body-font overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container px-5 py-24 mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">
        {/* Product Image */}
        <motion.div
          className="lg:w-1/2 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden bg-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <img
            alt={product.title}
            src={product.image}
            className="w-full h-auto object-contain bg-white p-10"
            loading="lazy"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="lg:w-1/2 w-full max-w-xl flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm text-green-600 tracking-widest font-semibold mb-3">
            {product.category?.toUpperCase() || "BRAND NAME"}
          </h2>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <span className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => {
                const rating = product.rating?.rate || 4.5;
                return (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(rating)
                        ? "text-yellow-400"
                        : i < rating
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }
                    size={22}
                  />
                );
              })}
            </span>
            <span className="ml-4 text-gray-600 font-medium">
              {product.rating?.count || 4} Reviews
            </span>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Colors & Sizes */}
          <div className="flex items-center mb-8 space-x-8">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">Color:</span>
              <button className="w-7 h-7 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-green-500 transition-colors bg-white" />
              <button className="w-7 h-7 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-green-500 transition-colors bg-gray-700" />
              <button className="w-7 h-7 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-green-500 transition-colors bg-green-600" />
            </div>

            <div className="flex items-center space-x-3">
              <label htmlFor="size" className="font-semibold text-gray-800">
                Size:
              </label>
              <select
                id="size"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 cursor-pointer"
              >
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>

          {/* Price + Actions */}
          <div className="flex items-center space-x-6">
            <span className="text-3xl font-extrabold text-green-700">
              ${product.price.toFixed(2)}
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition"
              aria-label="Add to cart"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 10, scale: 1.1 }}
              onClick={toggleWishlist}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors shadow-md"
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isLiked ? (
                <FaHeart size={24} className="text-red-600" />
              ) : (
                <FaRegHeart size={24} />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductDetails;

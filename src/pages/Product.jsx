// Product.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
  } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const clothingCategories = [
          "men's clothing",
          "women's clothing",
          "clothing",
        ];
        const filtered = res.data.filter((p) =>
          clothingCategories.includes(p.category.toLowerCase())
        );
        const repeated = [...filtered, ...filtered, ...filtered];
        setProducts(repeated);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist`);
    }
  };

  const addProductToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div className="container mx-auto py-16 px-4 max-w-7xl">
      <h2 className="text-4xl font-extrabold text-green-900 mb-12 text-center tracking-wide">
        Our Clothing Collection
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-5 pr-5 py-3 border border-green-400 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 w-full sm:w-1/3 text-lg placeholder-green-600"
          aria-label="Search products by name"
        />
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-5 py-3 bg-green-700 text-white rounded-l-lg disabled:opacity-50 hover:bg-green-800 transition"
            aria-label="Previous page"
          >
            &lt;
          </button>
          <span className="px-6 py-3 border-t border-b border-green-700 font-semibold text-green-900">
            {page}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-5 py-3 bg-green-700 text-white rounded-r-lg disabled:opacity-50 hover:bg-green-800 transition"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {currentItems.length > 0 ? (
            currentItems.map((product) => {
              const liked = isInWishlist(product.id);
              return (
                <motion.div
                  key={`${product.id}-${Math.random()}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-3xl shadow-xl p-6 flex flex-col hover:shadow-2xl transition-shadow duration-500"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="relative block h-72 rounded-2xl overflow-hidden mb-5 cursor-pointer group"
                    aria-label={`View details for ${product.title}`}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      className={`absolute top-4 right-4 text-3xl drop-shadow-lg transition-colors duration-300 ${
                        liked ? "text-red-600 hover:text-red-700" : "text-gray-300 hover:text-red-500"
                      }`}
                      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </Link>

                  <h3
                    className="text-lg font-semibold text-gray-900 truncate mb-3"
                    title={product.title}
                  >
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xl font-extrabold text-green-800">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center text-yellow-400 text-sm font-semibold">
                      <span className="mr-1">{product.rating?.rate?.toFixed(1) || "4.5"}</span>
                      <FaStar />
                    </div>
                  </div>

                  <button
                    onClick={() => addProductToCart(product)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    aria-label="Add to cart"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              );
            })
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center col-span-full text-gray-500 text-lg"
            >
              No products found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
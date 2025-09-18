import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
    updateWishlistQuantity,
    addToCart,
  } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-gray-500 animate-fadeIn">
        Your wishlist is empty.
      </div>
    );
  }

  const moveToCart = (product, quantity) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    removeFromWishlist(product.id);
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl animate-fadeIn">
      <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
        Your Wishlist
      </h2>

      <ul className="space-y-6">
        {wishlist.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] p-5 duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-contain rounded-lg mr-6 transition-transform duration-300 hover:scale-105"
            />

            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
              <p className="text-green-600 font-semibold text-lg mt-1">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex items-center mt-3 space-x-3">
                <button
                  onClick={() => updateWishlistQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-green-50 text-green-700 transition disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => updateWishlistQuantity(product.id, quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-green-50 text-green-700 transition"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Move to Cart */}
            <button
              onClick={() => moveToCart(product, quantity)}
              className="ml-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transform transition"
            >
              <FaShoppingCart size={18} /> Move to Cart
            </button>

            {/* Remove */}
            <button
              onClick={() => removeFromWishlist(product.id)}
              aria-label="Remove from wishlist"
              className="text-red-500 hover:text-red-700 transition ml-4 transform hover:scale-110"
            >
              <FaTrash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

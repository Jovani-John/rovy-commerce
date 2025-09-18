// ProductDetailsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetails from "./ProductDetails";
import { WishlistContext } from "./WishlistContext";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
  } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist`);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div>
      {product ? (
        <ProductDetails
          product={product}
          toggleWishlist={toggleWishlist}
          isLiked={isInWishlist(product.id)}
          addToCart={handleAddToCart}
        />
      ) : (
        <div className="container mx-auto py-24 px-5 text-center text-gray-500">
          Loading product details...
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import BestSalling from "./components/best-selling/BestSalling";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { WishlistProvider } from "./pages/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Auth/Profile";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <WishlistProvider>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <BestSalling />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </WishlistProvider>
  );
}

export default App;
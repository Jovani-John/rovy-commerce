import React, { useState, useEffect } from "react";
import Women1 from "../../assets/women1.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const words = ["Discover and", "Find Your Own", "Fashion!"];
  const fullText = words.join("\n"); 
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 80 : 180;

    const handleTyping = () => {
      if (!isDeleting && index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setText(fullText.substring(0, index - 1));
        setIndex(index - 1);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);

  return (
    <section className="text-gray-600 body-font bg-green-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 sm:px-10 lg:px-20 py-16 md:py-24">
        
        {/* النص */}
        <div className="flex flex-col md:w-1/2 md:pr-10 lg:pr-16 text-center md:text-left mb-12 md:mb-0">
          <h1
            className="title-font text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Abril_Fatface'] 
                       font-bold text-green-900 mb-6 leading-tight whitespace-pre-line"
          >
            {text}
            <span className="border-r-4 border-green-900 animate-pulse ml-1"></span>
          </h1>

          <p className="mb-8 leading-relaxed text-green-800 text-base sm:text-lg">
            Explore our curated collection of stylish
            <br className="hidden lg:inline-block" />
            clothing and accessories tailored to your
            <br className="hidden lg:inline-block" />
            unique taste.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link to="/product" className="inline-flex text-white bg-green-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-400 rounded text-lg transition">
              Explore Now
            </Link>
          </div>
        </div>

        {/* الصورة */}
        <div className="relative w-4/5 sm:w-3/5 md:w-1/2 lg:max-w-lg mx-auto md:mx-0 group">
          {/* الفريم الخلفي */}
          <div className="absolute inset-0 rounded-3xl frame-glow animate-pulse-slow"></div>

          {/* الصورة */}
          <img
            className="relative object-cover object-center rounded-3xl animate-floating group-hover:scale-110 transition-all duration-700 ease-in-out"
            alt="hero"
            src={Women1}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;

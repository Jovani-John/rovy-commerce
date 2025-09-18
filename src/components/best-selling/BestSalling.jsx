import React from "react";
import Women2 from "../../assets/women2.png";
import Women3 from "../../assets/women3.png";
import Women4 from "../../assets/women4.png";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BestSalling = () => {
  return (
    <div className="items-center text-center justify-center px-6 sm:px-10 lg:px-20 py-12">
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-green-900 text-4xl sm:text-5xl mb-4 font-bold">
          Best Selling
        </h1>
        <p className="text-green-900 text-base sm:text-lg max-w-2xl mx-auto">
          Get in on the trend with our curated selection of best-selling styles.
        </p>
      </div>

      {/* Cards */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {/* Card Component */}
            {[
              {
                img: Women2,
                bg: "bg-[#93B9A2]",
                title: "Regular Fit Long Sleeve Top",
              },
              {
                img: Women3,
                bg: "bg-[#A9D4BA]",
                title: "Black Crop Tailored Jacket",
              },
              {
                img: Women4,
                bg: "bg-[#CADCD0]",
                title: "Textured Sunset Shirt",
              },
            ].map((item, index) => (
              <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3">
                <div className="h-full overflow-hidden rounded-xl transition transform hover:-translate-y-2 bg-white flex flex-col">
                  {/* Product Image */}
                  <div
                    className={`${item.bg} flex justify-center items-center aspect-[4/5]`}
                  >
                    <img
                      className="object-cover h-full w-full p-6"
                      src={item.img}
                      alt="product"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6 text-center flex flex-col flex-grow">
                    <h1 className="title-font text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h1>

                    {/* Price + Rating */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-gray-700 font-medium">$38.99</span>
                      <span className="text-gray-400">|</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700 font-medium">5.0</span>
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="mt-auto flex items-center justify-center gap-2 text-green-800 font-medium cursor-pointer hover:underline">
                      <Link to="/product" className="flex items-center gap-2">
                        <span>View Details</span>
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="mt-10">
        <Link
          to="/product"
          className="inline-flex items-center border-2 py-2 px-8 sm:px-10 border-green-800 font-bold text-green-800 rounded text-base hover:bg-green-800 hover:text-white transition"
        >
          See all <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BestSalling;

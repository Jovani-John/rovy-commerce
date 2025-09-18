import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="bg-green-950 mt-10">
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            {/* Logo + Social */}
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6 flex flex-col items-center text-center mb-8 lg:items-start lg:text-left lg:mb-0">
                {/* Logo */}
                <a className="title-font font-medium mb-2">
                  <span className="text-3xl font-['Abril_Fatface'] text-white font-bold">
                    ROVY
                  </span>
                </a>

                {/* Title */}
                <p className="text-white mb-2">Social Media</p>

                {/* Social Icons */}
                <div className="flex gap-x-4 justify-center">
                  <FaFacebookSquare className="text-white w-6 h-6" />
                  <FaInstagram className="text-white w-6 h-6" />
                  <FaXTwitter className="text-white w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Links + Newsletter */}
            <div className="mt-0 lg:mt-0">
              <div className="flex flex-row flex-wrap justify-between gap-x-6 gap-y-6 lg:grid lg:grid-cols-5">
                {/* SHOP */}
                <div className="min-w-[120px]">
                  <h3 className="text-gray-700 uppercase dark:text-white">SHOP</h3>
                  <Link to="/Product" href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Products</Link>
                  <a href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Overview</a>
                  <a href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Pricing</a>
                  <a href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Releases</a>
                </div>

                {/* Company */}
                <div className="min-w-[120px]">
                  <h3 className="text-gray-700 uppercase dark:text-white">Company</h3>
                  <Link to="/About" href="#" className="block mt-2 text-sm text-gray-400 hover:underline">About us</Link>
                  <Link to="/Contact" href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Contact</Link>
                  <a href="#" className="block mt-2 text-sm text-gray-400 hover:underline">News</a>
                  <a href="#" className="block mt-2 text-sm text-gray-400 hover:underline">Support</a>
                </div>

                {/* Contact */}
                <div className="min-w-[120px]">
                  <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                  <span className="block mt-2 text-sm text-gray-400">+201552568856</span>
                  <span className="block mt-2 text-sm text-gray-400">jovanijohn40@gmail.com</span>
                </div>

                {/* Newsletter */}
                <div className="min-w-[200px] w-full md:w-auto">
                  <h3 className="text-gray-700 uppercase dark:text-white">Stay up to date</h3>
                  <div className="flex flex-col mt-4 space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-3">
                    <input
                      id="email"
                      type="text"
                      placeholder="Email Address"
                      className="px-4 py-2 text-black bg-white rounded-md dark:bg-green-950 dark:text-gray-300 dark:border-green-300 border-2 border-green-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-green-300 flex-grow"
                    />
                    <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-green-900 transition-colors duration-300 transform md:w-auto md:mx-0 focus:outline-none bg-green-300 rounded-lg hover:bg-green-500 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="h-px my-4 bg-gray-200 border-none dark:bg-gray-700" />

          {/* Bottom text */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
              © Traple J 2025 - All rights reserved
            </p>

            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
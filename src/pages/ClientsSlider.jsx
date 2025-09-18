import React from "react";
import { motion } from "framer-motion";
import {
  SiNike,
  SiAdidas,
  SiPuma,
  SiReebok,
  SiNewbalance,
  SiJordan,
} from "react-icons/si";

const clients = [
  { name: "Nike", icon: <SiNike className="text-6xl text-gray-800" /> },
  { name: "Adidas", icon: <SiAdidas className="text-6xl text-gray-800" /> },
  { name: "Puma", icon: <SiPuma className="text-6xl text-gray-800" /> },
  { name: "Reebok", icon: <SiReebok className="text-6xl text-gray-800" /> },
  { name: "New Balance", icon: <SiNewbalance className="text-6xl text-gray-800" /> },
  { name: "Jordan", icon: <SiJordan className="text-6xl text-gray-800" /> },
];

const sliderVariants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const ClientsSlider = () => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex space-x-16"
        variants={sliderVariants}
        animate="animate"
      >
        {[...clients, ...clients].map((client, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center min-w-[150px]"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div>{client.icon}</div>
            <p className="text-gray-700 font-semibold mt-2">{client.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClientsSlider;

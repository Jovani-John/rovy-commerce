import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedInUser  = localStorage.getItem("loggedInUser ");
    if (loggedInUser ) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser  = JSON.parse(localStorage.getItem("user"));
    if (!storedUser ) {
      setError("No user found, please sign up first.");
      return;
    }
    if (storedUser .email === form.email && storedUser .password === form.password) {
      localStorage.setItem("loggedInUser ", JSON.stringify(storedUser ));
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen  overflow-hidden px-4">
      {/* Background subtle animated blobs */}
      <motion.div
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-3xl opacity-30 top-16 left-16"
      />
      <motion.div
        animate={{ x: [0, -40, 40, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full blur-3xl opacity-25 bottom-10 right-20"
      />

      {/* Form */}
      <motion.form
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-200"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-extrabold text-center text-green-900 mb-8"
        >
          Login
        </motion.h2>

        {[{ icon: <HiMail />, type: "email", placeholder: "Email", key: "email" },
          { icon: <HiLockClosed />, type: "password", placeholder: "Password", key: "password" }].map((field, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
            className="flex items-center bg-green-50 border border-green-300 rounded-xl px-3 mb-5 focus-within:ring-2 focus-within:ring-green-400 transition-all"
          >
            <span className="text-green-600 text-lg">{field.icon}</span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full bg-transparent p-3 text-green-900 placeholder-green-400 focus:outline-none"
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              required
            />
          </motion.div>
        ))}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(16, 185, 129, 0.6)", // green shadow
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
        >
          Login
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-green-900 text-sm text-center mt-5"
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-700 hover:text-teal-700 cursor-pointer transition"
          >
            Sign Up
          </span>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Login;
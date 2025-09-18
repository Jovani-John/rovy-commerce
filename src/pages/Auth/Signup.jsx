import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiUser, HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من وجود مستخدم مسجل دخوله مسبقاً
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // إرسال Notification عن طريق Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "6c123e70-b648-423d-882b-da0fdfd7e8fe",
          subject: "🔔 New Signup Notification",
          from_name: "Your Website",
          message: `New user signed up!\n\nUsername: ${form.username}\nEmail: ${form.email}`,
        }),
      });

      // حفظ بيانات المستخدم في localStorage
      localStorage.setItem("user", JSON.stringify(form));
      localStorage.setItem("loggedInUser", JSON.stringify(form));
      
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const formFields = [
    {
      icon: <HiUser />,
      type: "text",
      placeholder: "Enter your username",
      key: "username",
      label: "Username"
    },
    {
      icon: <HiMail />,
      type: "email",
      placeholder: "Enter your email",
      key: "email",
      label: "Email Address"
    },
    {
      icon: <HiLockClosed />,
      type: showPassword ? "text" : "password",
      placeholder: "Create a password",
      key: "password",
      label: "Password",
      hasToggle: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 80, -80, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
            >
              <HiUser className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600 text-sm">Join us and start your journey</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-gray-700 block">
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">{field.icon}</span>
                  </div>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-300 ${
                      errors[field.key]
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    }`}
                    disabled={isLoading}
                  />
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                    </button>
                  )}
                </div>
                {errors[field.key] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-medium"
                  >
                    {errors[field.key]}
                  </motion.p>
                )}
              </motion.div>
            ))}

            {errors.general && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3"
              >
                <p className="text-red-600 text-sm text-center">{errors.general}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-green-600 hover:text-emerald-600 font-semibold transition-colors duration-300 underline decoration-2 underline-offset-4"
                disabled={isLoading}
              >
                Sign In
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

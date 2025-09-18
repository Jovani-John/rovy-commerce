import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiUser, HiMail, HiCalendar, HiIdentification } from "react-icons/hi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6 overflow-hidden">
      {/* خلفية متحركة */}
      <motion.div
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute w-80 h-80 bg-green-300/30 rounded-full blur-3xl top-10 left-20"
      />
      <motion.div
        animate={{ x: [0, -40, 40, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute w-[26rem] h-[26rem] bg-emerald-300/30 rounded-full blur-3xl bottom-10 right-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-gray-200"
      >
        {/* صورة البروفايل */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <HiUser className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* عنوان البروفايل */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-extrabold text-center mb-8 text-gray-800"
        >
          My Profile
        </motion.h2>

        {/* معلومات المستخدم */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200"
          >
            <HiIdentification className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200"
          >
            <HiMail className="w-8 h-8 text-emerald-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center p-4 bg-teal-50 rounded-xl border border-teal-200"
          >
            <HiCalendar className="w-8 h-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* الأزرار */}
        <div className="mt-8 space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            Go to Home
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(239, 68, 68, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            Sign Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
"use client";

import { motion } from "framer-motion";

const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  color = "indigo",
}) => {
  const colorClasses = {
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-white",
      border: "border-indigo-100",
      iconBg: "bg-gradient-to-br from-indigo-600 to-indigo-700",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-white",
      border: "border-purple-100",
      iconBg: "bg-gradient-to-br from-purple-600 to-purple-700",
    },
  };

  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={`${colorClasses[color].bg} rounded-2xl p-8 shadow-lg border ${colorClasses[color].border}`}
    >
      <div
        className={`h-14 w-14 ${colorClasses[color].iconBg} text-white rounded-xl flex items-center justify-center mb-6 shadow-md`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;

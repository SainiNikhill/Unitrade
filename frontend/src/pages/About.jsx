import React from "react";
import { motion } from "framer-motion";
import img from "../assets/logo_unitrade.png"

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 sm:p-16 mt-30 ">
      {/* Logo Div */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="w-15 h-15 rounded-full overflow-hidden">
          <img
            src={img} // Replace with your logo image path
            alt="Unitrade Logo"
            className="w-16 h-15 object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold font-['League_Spartan'] text-gray-900">
          unitrade.
        </h1>
      </motion.div>

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white rounded-lg shadow-lg p-8 sm:p-12 text-gray-700"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          About Unitrade
        </h2>
        <p className="mb-4 leading-relaxed text-lg">
          Welcome to <strong>Unitrade</strong>, your go-to marketplace built
          with students in mind. Our mission is to create a seamless platform
          where students can easily buy, sell, and discover products that fit
          their lifestyle and budget.
        </p>
        <p className="mb-4 leading-relaxed text-lg">
          Whether you're looking to grab affordable textbooks, gadgets, or
          fashion, Unitrade connects you with trusted sellers within your
          community. We believe in empowering students by providing a simple,
          secure, and friendly marketplace experience.
        </p>
        <p className="leading-relaxed text-lg">
          Join us on this journey to make student life easier and more
          connected. At Unitrade, we're more than just a marketplace — we're a
          community.
        </p>
      </motion.div>
    </div>
  );
};

export default About;

import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <img src="/logo.course.png" alt="Logo" className="h-10 w-auto rounded-full" />
          </h2>
          <p className="text-sm text-gray-400">
            Empowering learners through practical and modern education.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400 text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaGithub /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Useful Pages</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

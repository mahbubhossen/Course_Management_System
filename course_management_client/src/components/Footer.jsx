import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" w-full  bg-gray-900 text-white pt-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-12 md:px-6 py-3">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <img
              src="/logo.course.png"
              alt="Logo"
              className="h-10 w-auto rounded-full"
            />
          </h2>
          <p className="text-sm text-gray-400">
            Empowering learners through practical and modern education.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/mahbub.hossen.408214"
              className="hover:text-blue-400 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/mahbub--hossen/"
              className="hover:text-blue-400 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/mahbubhossen"
              className="hover:text-blue-400 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Useful Pages</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </li>
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

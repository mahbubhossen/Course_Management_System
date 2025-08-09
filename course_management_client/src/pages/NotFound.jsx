import React from "react";
import { Link } from "react-router";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404 Not Found");
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4 max-w-xl mx-auto text-base-content">
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-red-600">404</h1>
      <p className="text-xl sm:text-2xl mt-4">Page Not Found</p>
      <p className="mt-2  px-2 sm:px-4 md:px-0">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

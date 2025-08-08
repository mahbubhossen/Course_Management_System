import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white flex flex-wrap items-center justify-between lg:p-3 md:px-6 h-auto py-3 md:py-0">
      <div className="w-full md:w-auto flex justify-between items-center mb-3 md:mb-0">
        <NavLink to="/" className="text-2xl font-bold hover:text-blue-400">
          <img
            src="/logo.course.png"
            alt="Logo"
            className="h-10 w-auto rounded-full"
          />
        </NavLink>
      </div>

      <div className="w-full md:flex-1 flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-6 text-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/add-course"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Add Course
        </NavLink>
        <NavLink
          to="/manage-courses"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Manage Courses
        </NavLink>
        <NavLink
          to="/my-enrollments"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          My Enrollments
        </NavLink>
        <NavLink
          to="/top-instructors"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Top Instructors
        </NavLink>
      </div>

      <div className="w-full md:w-auto flex justify-center md:justify-end items-center space-x-4 mt-3 md:mt-0">
        {user ? (
          <div className="relative">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="Profile"
              title={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-20">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }
            >
              Login
            </NavLink>
            <span>|</span>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

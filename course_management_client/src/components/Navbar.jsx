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
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-12 md:px-6 py-3">
        
        {/* Logo */}
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold hover:text-blue-400">
            <img
              src="/logo.course.png"
              alt="Logo"
              className="h-10 w-auto rounded-full"
            />
          </NavLink>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex md:justify-center space-x-6 text-center">
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
            to="/top-instructors"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }
          >
            Top Instructors
          </NavLink>

          {user && (
            <>
              <NavLink to="/add-course" className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }>
                Add Course
              </NavLink>
              <NavLink to="/manage-courses" className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }>
                Manage Courses
              </NavLink>
              <NavLink to="/my-enrollments" className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }>
                My Enrollments
              </NavLink>
            </>
          )}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="flex items-center space-x-4">
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

      </div>
    </nav>
  );
};

export default Navbar;

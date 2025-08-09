import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // new state for mobile menu

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      setMobileMenuOpen(false);  // close mobile menu on logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Links to show based on user login
  const commonLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        Courses
      </NavLink>
      <NavLink
        to="/top-instructors"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        Top Instructors
      </NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavLink
        to="/add-course"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        Add Course
      </NavLink>
      <NavLink
        to="/manage-courses"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        Manage Courses
      </NavLink>
      <NavLink
        to="/my-enrollments"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold block px-4 py-2 md:px-2 md:py-1 md:text-sm"
            : "hover:text-blue-400 block px-4 py-2 md:px-2 md:py-1 md:text-sm"
        }
        onClick={() => setMobileMenuOpen(false)}
      >
        My Enrollments
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-12 md:px-10 py-3 md:flex md:flex-nowrap lg:flex lg:flex-wrap lg:justify-between  md:justify-center md:items-center ">

        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <NavLink to="/" className="text-2xl font-bold hover:text-blue-400">
            <img
              src="/logo.course.png"
              alt="Logo"
              className="h-10 w-auto rounded-full"
            />
          </NavLink>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:justify-center md:space-x-3 space-x-6 text-center">
          {commonLinks}
          {user && loggedInLinks}
        </div>

        {/* Auth Buttons / Profile on desktop */}
        <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-1">
          {commonLinks}
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-400 font-semibold block px-4 py-2" : "hover:text-blue-400 block px-4 py-2"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-400 font-semibold block px-4 py-2" : "hover:text-blue-400 block px-4 py-2"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {loggedInLinks}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

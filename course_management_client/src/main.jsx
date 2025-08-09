import React, { useEffect } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppWrapper() {
  useEffect(() => {
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const applyDarkMode = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    // Initial check
    applyDarkMode(darkModeMq);
    // Listen for changes
    darkModeMq.addEventListener("change", applyDarkMode);
    // Cleanup on unmount
    return () => darkModeMq.removeEventListener("change", applyDarkMode);
  }, []);

  return (
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

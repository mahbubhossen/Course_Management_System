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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </AuthProvider>
  </StrictMode>
);

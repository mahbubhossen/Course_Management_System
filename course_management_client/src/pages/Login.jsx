import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase/firebase.init";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success("Logged in with GitHub!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 sm:p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1 text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm sm:text-base">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="w-full p-2 border rounded mt-1 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Login
        </button>
      </form>

      <div className="mt-6">
        <p className="text-center text-gray-500 mb-2 text-sm sm:text-base">Or login with</p>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0 px-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
      <p className="text-center text-sm sm:text-base text-gray-600 mt-4 px-4">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline font-medium">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;

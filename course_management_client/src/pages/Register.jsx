import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase/firebase.init";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const Register = () => {
  useTitle("Register");
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = () => {
    const { email, password, confirmPassword } = formData;

    const rules = [
      {
        check: password.length >= 8,
        msg: "Password must be at least 8 characters long.",
      },
      {
        check: /[A-Z]/.test(password),
        msg: "Password must contain at least one uppercase letter.",
      },
      {
        check: /[a-z]/.test(password),
        msg: "Password must contain at least one lowercase letter.",
      },
      {
        check: /[0-9]/.test(password),
        msg: "Password must contain at least one number.",
      },
      {
        check: /[^A-Za-z0-9]/.test(password),
        msg: "Password must contain at least one special character.",
      },
      {
        check: password === confirmPassword,
        msg: "Passwords do not match.",
      },
      {
        check: !password.includes(email),
        msg: "Password cannot contain your email address.",
      },
    ];

    for (let rule of rules) {
      if (!rule.check) return rule.msg;
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const { name, photoURL, email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGithubSignup = async () => {
    setError("");
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
    <div className="max-w-md mx-auto mt-18 my-3 p-6 sm:p-8 bg-white rounded shadow-md text-base-content">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4 text-gray-800">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <div className="mt-6">
        <p className="text-center text-gray-500 mb-2">Or register with</p>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
          <button
            onClick={handleGoogleSignup}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={handleGithubSignup}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center gap-2 justify-center"
          >
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4 px-2">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const AddCourse = () => {
  useTitle("Add Course");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    seats: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...formData,
      seats: parseInt(formData.seats),
      createdByEmail: user?.email,
      createdByName: user?.displayName || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://course-management-server-self.vercel.app/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const result = await response.json();
      console.log("Course added:", result);

      toast.success(" Course added successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/courses");
      }, 2000);
    } catch (error) {
      console.error("Error adding course:", error.message);
      toast.error(" Failed to add course!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto  p-6 sm:p-8 bg-white shadow-md rounded mt-18">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
        Add a New Course
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-5 text-gray-800"
      >
        <div>
          <label className="block font-medium mb-1 ">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
            placeholder="Brief overview of the course"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
            placeholder="https://example.com/course.jpg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Duration (e.g. 6 weeks)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
            placeholder="e.g. 4 weeks, 12 hours"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
            min="1"
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
            placeholder="Total number of seats (e.g. 10)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Add Course
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddCourse;

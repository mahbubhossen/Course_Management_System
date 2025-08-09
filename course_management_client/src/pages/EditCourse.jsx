import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const EditCourse = () => {
  useTitle("Edit Course");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    seats: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:3000/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setFormData({
          title: data.title,
          description: data.description,
          image: data.image,
          duration: data.duration,
          seats: data.seats || "",
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCourse = {
      ...formData,
      seats: parseInt(formData.seats),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`http://localhost:3000/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!res.ok) throw new Error("Failed to update course");

      toast.success("Course updated successfully!");
      navigate("/manage-courses");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading course...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 sm:p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Edit Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded text-sm sm:text-base"
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
            className="w-full border px-4 py-2 rounded text-sm sm:text-base"
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
            className="w-full border px-4 py-2 rounded text-sm sm:text-base"
            placeholder="https://example.com/course.jpg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded text-sm sm:text-base"
            placeholder="e.g. 4 weeks"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Total Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
            min="1"
            className="w-full border px-4 py-2 rounded text-sm sm:text-base"
            placeholder="e.g. 10"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;

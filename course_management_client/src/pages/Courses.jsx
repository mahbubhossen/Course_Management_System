import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";

const Courses = () => {
  useTitle("Courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://course-management-server-self.vercel.app/all-courses"
        );
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/courses/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
        All Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded overflow-hidden flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 sm:h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                {course.description?.slice(0, 100)}...
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Added on: {formatDate(course.createdAt)}
              </p>
              <button
                onClick={() => handleDetailsClick(course._id)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm sm:text-base"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;

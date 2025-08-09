import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/courses?limit=8");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        const sortedCourses = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCourses(sortedCourses.slice(0, 8));
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`, { autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDetailsClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleSeeAllCourses = () => {
    navigate("/courses");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <p className="text-center mt-8">Loading courses...</p>;
  if (error)
    return <p className="text-center mt-8 text-red-600">Error: {error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Latest Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded overflow-hidden flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 sm:h-44 md:h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                {course.description?.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 mb-4">
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
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSeeAllCourses}
          className="bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2 rounded text-base sm:text-lg"
        >
          See All Courses
        </button>
      </div>
    </section>
  );
};

export default CoursesSection;

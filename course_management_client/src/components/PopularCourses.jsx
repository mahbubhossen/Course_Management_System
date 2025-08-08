import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          "https://course-management-server-self.vercel.app/popular-courses"
        );
        const data = await res.json();
        setPopularCourses(data);
      } catch (err) {
        console.error("Failed to fetch popular courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Popular Courses
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
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
                <p className="text-sm text-gray-500 mb-2">
                  Enrollments: {course.enrollments}
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
      )}
    </section>
  );
};

export default PopularCourses;

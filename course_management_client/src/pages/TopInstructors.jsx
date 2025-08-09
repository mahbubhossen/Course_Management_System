import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";

const TopInstructors = () => {
  useTitle("Top Instructors");
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:3000/top-instructors");
        if (!res.ok) throw new Error("Failed to fetch instructors");
        const data = await res.json();
        setInstructors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;

  return (
    <section className="max-w-3xl mx-auto px-4 my-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Top Instructors
      </h2>
      <ul className="bg-white shadow-md rounded divide-y">
        {instructors.map((instructor, index) => (
          <li
            key={index}
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0"
          >
            <div>
              <p className="text-lg font-semibold">{instructor.name}</p>
              <p className="text-sm text-gray-600 break-words max-w-xs sm:max-w-none">
                {instructor._id}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {instructor.totalCourses} Courses
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopInstructors;

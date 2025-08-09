import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const ManageCourses = () => {
  useTitle("Manage Courses");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `http://localhost:3000/user-courses?email=${user.email}`
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch user courses:", err);
        toast.error("Failed to load your courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setCourses(courses.filter((course) => course._id !== id));
      setConfirmId(null);
      toast.success("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Failed to delete the course.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  if (loading)
    return <p className="text-center mt-8">Loading your courses...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-18">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Your Courses
      </h2>
      {courses.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any courses yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border hidden sm:table-cell">
                  Description
                </th>
                <th className="py-2 px-4 border text-center">Seats Left</th>
                <th className="py-2 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => {
                const seatsLeft =
                  (course.seats || 0) - (course.enrollmentsCount || 0);
                return (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 break-words max-w-xs">
                      {course.title}
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell break-words max-w-md">
                      {course.description.slice(0, 80)}...
                    </td>
                    <td className="py-2 px-4 text-center whitespace-nowrap">
                      {seatsLeft > 0 ? (
                        <span className="text-green-600 font-semibold">
                          {seatsLeft}
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">Full</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(course._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmId(course._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {confirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <p className="text-gray-800 mb-4">
              Are you sure you want to delete this course?
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;

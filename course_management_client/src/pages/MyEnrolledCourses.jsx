import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const MyEnrolledCourses = () => {
  useTitle("My Enrolled Courses");
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/my-enrollments?email=${user?.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch enrolled courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const confirmRemove = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/enrollments/${selectedEnrollmentId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to remove enrollment");

      setCourses((prev) =>
        prev.filter((course) => course.enrollmentId !== selectedEnrollmentId)
      );

      setShowModal(false);
      setSelectedEnrollmentId(null);
      toast.success("Enrollment removed successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setShowModal(false);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!courses.length)
    return <p className="text-center mt-6">No enrolled courses.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-18 p-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        My Enrolled Courses
      </h2>
      {/* Fixed responsiveness here: prevent horizontal scroll on mobile */}
      <div className="overflow-x-hidden sm:overflow-x-auto">
        <table className="w-full border min-w-full sm:min-w-[600px] bg-white">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4 border-b">Title</th>
              <th className="py-3 px-4 border-b hidden sm:table-cell">Duration</th>
              <th className="py-3 px-4 border-b hidden md:table-cell">Enrolled At</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="py-3 px-4 border-b break-words max-w-xs">
                  {course.title}
                </td>
                <td className="py-3 px-4 border-b hidden sm:table-cell">
                  {course.duration}
                </td>
                <td className="py-3 px-4 border-b hidden md:table-cell">
                  {new Date(course.enrolledAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b text-center whitespace-nowrap">
                  <button
                    onClick={() => confirmRemove(course.enrollmentId)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove Enrollment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Remove
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this enrollment?
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../hooks/useTitle";

const CourseDetails = () => {
  useTitle("Course Details");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrollmentId, setEnrollmentId] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetch(
          `https://course-management-server-self.vercel.app/courses/${id}`
        );
        if (!res.ok) throw new Error("Failed to load course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course.");
      }
    };
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const fetchEnrollmentInfo = async () => {
      try {
        if (user?.email) {
          const res = await fetch(
            `https://course-management-server-self.vercel.app/enrollments?email=${user.email}&courseId=${id}`
          );
          if (!res.ok) throw new Error("Failed to check enrollment");
          const data = await res.json();
          setEnrolled(data.enrolled);
          setEnrollmentId(data.enrollmentId || null);
        } else {
          setEnrolled(false);
          setEnrollmentId(null);
        }

        const countRes = await fetch(
          `https://course-management-server-self.vercel.app/enrollments/count/${id}`
        );
        if (!countRes.ok) throw new Error("Failed to load enrollment count");
        const countData = await countRes.json();
        setEnrollmentCount(countData.count);
      } catch (err) {
        console.error(err);
        toast.error("Error checking enrollment status or seat count.");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollmentInfo();
  }, [user, id]);

  const handleEnrollToggle = async () => {
    if (!user) {
      toast.warn("You must be logged in to enroll or unenroll.");
      return;
    }

    if (enrolled) {
      if (!enrollmentId) {
        toast.error("Enrollment ID missing, cannot unenroll.");
        return;
      }
      try {
        const res = await fetch(
          `https://course-management-server-self.vercel.app/enrollments/${enrollmentId}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Unenrollment failed");

        setEnrolled(false);
        setEnrollmentCount((prev) => (prev > 0 ? prev - 1 : 0));
        setEnrollmentId(null);
        toast.success("You have been unenrolled.");
      } catch (error) {
        console.error("Unenrollment failed:", error);
        toast.error("Failed to unenroll. Please try again.");
      }
    } else {
      if (enrollmentCount >= (course?.seats ?? Infinity)) {
        toast.error("No seats left.");
        return;
      }

      try {
        const res = await fetch(
          "https://course-management-server-self.vercel.app/enrollments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, courseId: id }),
          }
        );

        if (res.status === 201) {
          const result = await res.json();
          setEnrolled(true);
          setEnrollmentCount((prev) => prev + 1);
          setEnrollmentId(result.insertedId);
          toast.success("Successfully enrolled!");
        } else if (res.status === 409) {
          const errorData = await res.json();
          if (errorData.error === "Already enrolled") {
            setEnrolled(true);
            toast.info("You're already enrolled in this course.");
          } else if (errorData.error === "No seats left") {
            toast.error("No seats left.");
          } else {
            toast.error("Enrollment failed. Please try again.");
          }
        } else if (res.status === 403) {
          toast.error("You cannot enroll in more than 3 courses.");
        } else {
          throw new Error("Enrollment failed");
        }
      } catch (error) {
        console.error("Enrollment failed:", error);
        toast.error("Enrollment failed. Please try again.");
      }
    }
  };

  if (loading) return <p className="text-center mt-20">Loading course...</p>;
  if (!course) return <p className="text-center mt-20">Course not found.</p>;

  const seatsLeft = (course.seats ?? Infinity) - enrollmentCount;

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 sm:h-64 md:h-80 object-cover rounded mb-6"
      />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4 text-sm sm:text-base">
        {course.description}
      </p>
      <p className="text-xs sm:text-sm text-gray-400 mb-2">
        Duration: {course.duration}
      </p>
      <p className="text-xs sm:text-sm text-gray-400 mb-4">
        Created At: {new Date(course.createdAt).toLocaleString()}
      </p>

      <p className="text-sm mb-4 font-medium text-gray-700">
        {seatsLeft > 0
          ? `${seatsLeft} seat${seatsLeft > 1 ? "s" : ""} left`
          : "No seats left"}
      </p>

      <button
        onClick={handleEnrollToggle}
        disabled={!user || (!enrolled && seatsLeft <= 0)}
        className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded text-white ${
          !user
            ? "bg-gray-400 cursor-not-allowed"
            : enrolled
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {user ? (enrolled ? "Unenroll" : "Enroll") : "Login to Enroll"}
      </button>
    </div>
  );
};

export default CourseDetails;

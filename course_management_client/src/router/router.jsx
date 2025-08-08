import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCourse from "../pages/AddCourse";
import Courses from "../pages/Courses";
import PrivateRoute from "../components/PrivateRoute";
import CourseDetails from "../pages/CourseDetails";
import ManageCourses from "../pages/ManageCourses";
import EditCourse from "../pages/EditCourse";
import MyEnrolledCourses from "../pages/MyEnrolledCourses";
import TopInstructors from "../pages/TopInstructors";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "add-course",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-courses",
        element: (
          <PrivateRoute>
            <ManageCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/top-instructors",
        element: <TopInstructors />,
      },
      {
        path: "/my-enrollments",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

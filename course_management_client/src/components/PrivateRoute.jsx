import { Navigate, useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <p className="text-center mt-20 text-base sm:text-lg md:text-xl">Loading...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;

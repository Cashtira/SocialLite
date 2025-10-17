import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function PrivateRoute({ children }) {
  const { currentUser } = useUser();
  return currentUser ? children : <Navigate to="/login" replace />;
}
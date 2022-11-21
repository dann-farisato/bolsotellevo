import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {

  const { Currentuser } = useAuth();

  console.log("user:", Currentuser);

  if (!Currentuser) return <Navigate to="/login" />;

  return <>{children}</>;

}
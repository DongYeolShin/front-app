import { Navigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

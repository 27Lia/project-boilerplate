import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function PrivateRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

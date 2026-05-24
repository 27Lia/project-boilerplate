import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function PublicRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return accessToken ? <Navigate to="/" replace /> : <Outlet />;
}

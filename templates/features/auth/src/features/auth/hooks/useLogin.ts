import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios";
import { useAuthStore } from "../store/authStore";
import type { LoginRequest, LoginResponse } from "../types";

async function loginWithEmail(body: LoginRequest) {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", body);
  return data;
}

export function useLogin() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      navigate("/");
    },
  });
}

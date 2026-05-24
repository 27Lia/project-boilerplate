import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios";
import type { SignupFormValues } from "../types";

async function signup(body: SignupFormValues) {
  const { data } = await apiClient.post("/auth/signup", body);
  return data;
}

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => navigate("/signup/complete"),
  });
}

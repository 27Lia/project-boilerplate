import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { UserProfile } from "../types";

const QUERY_KEY = ["profile"];

async function fetchProfile() {
  const { data } = await apiClient.get<UserProfile>("/users/me");
  return data;
}

async function updateProfile(body: Partial<UserProfile>) {
  const { data } = await apiClient.patch<UserProfile>("/users/me", body);
  return data;
}

export function useProfile() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: fetchProfile });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

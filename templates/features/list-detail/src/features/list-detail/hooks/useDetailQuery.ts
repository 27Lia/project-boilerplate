import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ListItem } from "../types";

async function fetchDetail(id: number) {
  const { data } = await apiClient.get<ListItem>(`/items/${id}`);
  return data;
}

export function useDetailQuery(id: number) {
  return useQuery({
    queryKey: ["list", "detail", id],
    queryFn: () => fetchDetail(id),
    enabled: !!id,
  });
}

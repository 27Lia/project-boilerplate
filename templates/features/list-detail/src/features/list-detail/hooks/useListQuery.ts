import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ListFilter, ListItem } from "../types";
import type { PaginatedResponse } from "@/types/common";

export const LIST_QUERY_KEY = ["list"];

async function fetchList(filter: ListFilter) {
  const { data } = await apiClient.get<PaginatedResponse<ListItem>>("/items", {
    params: filter,
  });
  return data;
}

export function useListQuery(filter: ListFilter) {
  return useQuery({
    queryKey: [...LIST_QUERY_KEY, filter],
    queryFn: () => fetchList(filter),
  });
}

/**
 * React Query 키 팩토리
 *
 * @example
 * useQuery({ queryKey: authQueryKeys.me() })
 * queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
 */

export const authQueryKeys = {
  all: ["auth"] as const,
  me: () => [...authQueryKeys.all, "me"] as const,
};

export const userQueryKeys = {
  all: ["users"] as const,
  me: () => [...userQueryKeys.all, "me"] as const,
};

// 리스트/상세 페이지용 예시 — 실제 도메인에 맞게 수정하세요
export const createQueryKeys = (domain: string) => ({
  all: [domain] as const,
  list: (params?: object) => [domain, "list", params] as const,
  detail: (id: number | string) => [domain, "detail", id] as const,
});

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  logout: () => void;
}

// 개발 중 로그인 화면 건너뛰기: .env.local에 VITE_MOCK_AUTH=true 추가
const MOCK_TOKEN = import.meta.env.VITE_MOCK_AUTH === "true" ? "mock-token" : null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: MOCK_TOKEN,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAuth: () => set({ accessToken: null }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth-storage",
      // mock 모드에서는 persist 스토리지를 무시하고 항상 mock 토큰 유지
      ...(MOCK_TOKEN ? { skipHydration: true } : {}),
    }
  )
);

import { AUTH_URLS, USER_URLS } from "@/constants/apiUrls";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authQueryKeys, userQueryKeys } from "@/api/queryKeys";
import { useAuthStore } from "@/features/auth/store/authStore";

// ─── 타입 ────────────────────────────────────────────────

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface MeResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

// ─── API 훅 ────────────────────────────────────────────────

/**
 * @example
 * const { mutate: login, isPending } = useLogin();
 * login({ email, password }, { onSuccess: () => navigate("/home") });
 */
export const useLogin = () => {
  const { setAccessToken } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const res = await axiosInstance.post<{ data: LoginResponse }>(
        AUTH_URLS.LOGIN,
        payload
      );
      return res.data.data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });
};

/**
 * @example
 * const { mutate: signup, isPending } = useSignup();
 * signup(formData, { onSuccess: () => navigate("/login") });
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: SignupRequest) => {
      const res = await axiosInstance.post(AUTH_URLS.SIGNUP, payload);
      return res.data;
    },
  });
};

/**
 * @example
 * const { mutate: logout } = useLogout();
 * logout();
 */
export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post(AUTH_URLS.LOGOUT),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};

/**
 * @example
 * const { data: me, isLoading } = useMe();
 */
export const useMe = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: userQueryKeys.me(),
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: MeResponse }>(USER_URLS.ME);
      return res.data.data;
    },
    enabled: !!accessToken,
  });
};

/**
 * @example
 * const { mutate: sendCode } = useSendEmailCode();
 * sendCode({ email });
 */
export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      axiosInstance.post(AUTH_URLS.SEND_EMAIL_CODE, payload),
  });
};

/**
 * @example
 * const { mutate: verify } = useVerifyEmailCode();
 * verify({ email, code });
 */
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: (payload: { email: string; code: string }) =>
      axiosInstance.post(AUTH_URLS.VERIFY_EMAIL_CODE, payload),
  });
};

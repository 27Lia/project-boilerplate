export type SocialProvider = "kakao" | "google" | "apple";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface EmailLoginFormValues {
  email: string;
  password: string;
}

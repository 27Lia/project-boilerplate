import type { SocialProvider } from "../types";

const SOCIAL_URLS: Record<SocialProvider, (redirectUri: string) => string> = {
  kakao: (uri) =>
    `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${uri}&response_type=code&scope=account_email,profile_nickname,profile_image`,
  google: (uri) =>
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${uri}&response_type=code&scope=email profile`,
  apple: (uri) =>
    `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${uri}&response_type=code id_token&scope=name email&response_mode=form_post`,
};

export function useSocialLogin() {
  const login = (provider: SocialProvider) => {
    const redirectUri = `${window.location.origin}/oauth/callback/${provider}`;
    window.location.href = SOCIAL_URLS[provider](redirectUri);
  };

  return { login };
}

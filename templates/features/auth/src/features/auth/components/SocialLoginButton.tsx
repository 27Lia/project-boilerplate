import { cn } from "@/lib/utils";

/**
 * SocialLoginButton — 소셜 로그인 원형 버튼 (카카오/구글/애플)
 * LoginPage에서 자동으로 사용됩니다. 직접 사용할 일은 거의 없습니다.
 *
 * @example
 * <SocialLoginButton provider="kakao" onClick={() => login("kakao")} />
 * <SocialLoginButton provider="google" isRecent onClick={() => login("google")} />
 */

interface SocialLoginButtonProps {
  provider: "kakao" | "google" | "apple";
  onClick: () => void;
  isRecent?: boolean;
}

// 카카오 로고
function KakaoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.524 5.076 3.84 6.516l-.98 3.636a.3.3 0 00.457.324l4.332-2.868A11.3 11.3 0 0012 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z"
        fill="#3C1E1E"
      />
    </svg>
  );
}

// 구글 로고
function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// 애플 로고
function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.38.07 2.33.74 3.13.8 1.19-.24 2.33-.93 3.61-.84 1.54.12 2.7.72 3.44 1.84-3.14 1.88-2.39 5.96.59 7.1-.51 1.35-1.18 2.67-2.77 3.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

const PROVIDER_CONFIG = {
  kakao: { bg: "bg-[#FEE500]", label: "카카오", icon: <KakaoIcon /> },
  google: { bg: "bg-white border border-neutral-200", label: "구글", icon: <GoogleIcon /> },
  apple: { bg: "bg-black", label: "애플", icon: <AppleIcon /> },
};

function RecentBadge() {
  return (
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
      <span className="rounded-lg bg-primary px-2 py-0.5 text-[10px] text-white whitespace-nowrap shadow-sm">
        최근 로그인
      </span>
      <span className="border-x-4 border-t-4 border-x-transparent border-t-primary" />
    </div>
  );
}

export function SocialLoginButton({ provider, onClick, isRecent }: SocialLoginButtonProps) {
  const { bg, label, icon } = PROVIDER_CONFIG[provider];

  return (
    <div className="relative pt-5">
      {isRecent && <RecentBadge />}
      <button
        type="button"
        aria-label={`${label}로 로그인`}
        onClick={onClick}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-md transition-opacity active:opacity-70",
          bg
        )}
      >
        {icon}
      </button>
    </div>
  );
}

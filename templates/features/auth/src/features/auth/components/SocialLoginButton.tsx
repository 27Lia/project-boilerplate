import { cn } from "@/lib/utils";

interface SocialLoginButtonProps {
  provider: "kakao" | "google" | "apple";
  onClick: () => void;
  isRecent?: boolean;
}

const PROVIDER_STYLES = {
  kakao: { bg: "bg-[#FEE500]", label: "카카오" },
  google: { bg: "bg-white border border-gray-200", label: "구글" },
  apple: { bg: "bg-black", label: "애플" },
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
  const { bg, label } = PROVIDER_STYLES[provider];

  return (
    <div className="relative pt-5">
      {isRecent && <RecentBadge />}
      <button
        type="button"
        aria-label={`${label}로 로그인`}
        onClick={onClick}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-80",
          bg
        )}
      >
        <img
          src={`/icons/${provider}.svg`}
          alt={label}
          className="h-8 w-8 object-contain"
        />
      </button>
    </div>
  );
}

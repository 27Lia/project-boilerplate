import { cva } from "class-variance-authority";
import { Bell, ChevronLeft, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * @example
 * // 기본 (뒤로가기 + 타이틀)
 * <Header showBack title="설정" />
 *
 * // 홈 (로고 + 우측 아이콘)
 * <Header variant="home" rightIcons={["notification", "profile"]} />
 *
 * // 탭 헤더
 * <Header
 *   variant="tabs"
 *   tabs={[{ label: "전체", value: "all" }, { label: "관심", value: "like" }]}
 *   activeTab={tab}
 *   onTabChange={setTab}
 * />
 */

const headerVariants = cva(
  "relative flex h-12 w-full items-center gap-3 px-4 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)]",
  {
    variants: {
      variant: {
        home: "bg-gradient-to-r from-primary to-primary/80",
        tabs: "bg-white",
        default: "bg-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const tabLabelVariants = cva("text-base font-semibold transition-colors", {
  variants: {
    active: {
      true: "text-neutral-900",
      false: "text-neutral-400",
    },
  },
  defaultVariants: { active: false },
});

type Tab = { label: string; value: string };
type RightIcon = "chat" | "notification" | "profile";

interface BaseProps {
  rightIcons?: RightIcon[];
  profileImageUrl?: string;
  className?: string;
  title?: string;
  titleClassName?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
}

interface HomeProps extends BaseProps {
  variant: "home";
  logo?: React.ReactNode;
}

interface TabsProps extends BaseProps {
  variant: "tabs";
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

interface DefaultProps extends BaseProps {
  variant?: "default";
}

type Props = HomeProps | TabsProps | DefaultProps;

export function Header(props: Props) {
  const {
    rightIcons = [],
    profileImageUrl,
    className,
    titleClassName,
    showBack,
    onBack,
    rightSlot,
  } = props;
  const navigate = useNavigate();

  const renderLeft = () => {
    if (props.variant === "home") {
      return props.logo ?? (
        <span className="text-lg font-bold text-white">로고</span>
      );
    }

    if (props.variant === "tabs") {
      return (
        <div className="flex items-center gap-1">
          {props.tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => props.onTabChange(tab.value)}
              className="px-3 py-1"
            >
              <span className={tabLabelVariants({ active: props.activeTab === tab.value })}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      );
    }

    if (showBack) {
      return (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack ?? (() => navigate(-1))}
            className="shrink-0 p-1"
          >
            <ChevronLeft size={24} className="text-neutral-700" />
          </button>
          {props.title && (
            <p className={cn("text-base font-semibold text-neutral-900", titleClassName)}>
              {props.title}
            </p>
          )}
        </div>
      );
    }

    return (
      <p className={cn("text-base font-bold text-neutral-900", titleClassName)}>
        {props.title}
      </p>
    );
  };

  const iconColor = props.variant === "home" ? "text-white" : "text-neutral-700";

  return (
    <div className={cn(headerVariants({ variant: props.variant ?? "default" }), className)}>
      <div className="flex flex-1 items-center">{renderLeft()}</div>

      <div className="flex items-center gap-3">
        {rightSlot}

        {rightIcons.includes("chat") && (
          <button onClick={() => navigate("/chat")} className="p-1">
            <MessageCircle size={22} className={iconColor} />
          </button>
        )}
        {rightIcons.includes("notification") && (
          <button onClick={() => navigate("/notifications")} className="p-1">
            <Bell size={22} className={iconColor} />
          </button>
        )}
        {rightIcons.includes("profile") && (
          <button onClick={() => navigate("/mypage")} className="p-1">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <User size={22} className={iconColor} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

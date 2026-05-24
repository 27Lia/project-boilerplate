import { useNavigate } from "react-router-dom";
import { ProfileCard } from "@/features/mypage/components/ProfileCard";
import { MenuList } from "@/features/mypage/components/MenuList";
import { useProfile } from "@/features/mypage/hooks/useProfile";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";

const MENU_ITEMS = [
  { label: "프로필 수정", path: "/mypage/profile/edit" },
  { label: "비밀번호 변경", path: "/mypage/change-password" },
  { label: "알림 설정", path: "/mypage/notifications" },
];

const ACCOUNT_ITEMS = [
  { label: "이용약관", path: "/mypage/terms" },
  { label: "개인정보 처리방침", path: "/mypage/privacy" },
  { label: "앱 버전", path: "" },
];

export default function MyPage() {
  const { data: profile, isLoading } = useProfile();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  if (isLoading || !profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-10">
      <ProfileCard profile={profile} />

      <div className="h-2 bg-gray-50" />
      <MenuList title="계정" items={MENU_ITEMS} />

      <div className="h-2 bg-gray-50" />
      <MenuList title="앱 정보" items={ACCOUNT_ITEMS} />

      <div className="h-2 bg-gray-50" />
      <button
        type="button"
        className="px-6 py-4 text-left text-sm text-red-500 hover:bg-gray-50"
        onClick={() => setLogoutModalOpen(true)}
      >
        로그아웃
      </button>

      <Modal
        open={logoutModalOpen}
        title="로그아웃"
        description="정말 로그아웃 하시겠어요?"
        confirmText="로그아웃"
        cancelText="취소"
        danger
        onConfirm={() => {
          logout();
          navigate("/login");
        }}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}

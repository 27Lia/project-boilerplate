import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../types";

interface ProfileCardProps {
  profile: UserProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <button
        type="button"
        onClick={() => navigate("/mypage/profile/edit")}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100"
      >
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl text-gray-400">
            {profile.name[0]}
          </span>
        )}
        <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-gray-600">
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.914l-3 1 1-3a4 4 0 01.914-1.414z" />
          </svg>
        </span>
      </button>

      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-gray-900">{profile.name}</p>
        <p className="text-sm text-gray-500">{profile.email}</p>
      </div>
    </div>
  );
}

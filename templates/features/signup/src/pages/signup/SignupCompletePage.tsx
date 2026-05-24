import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function SignupCompletePage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-10 w-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">가입 완료!</h1>
        <p className="text-sm text-gray-500">가입이 완료되었습니다.</p>
      </div>

      <Button size="full" onClick={() => navigate("/")}>
        시작하기
      </Button>
    </div>
  );
}

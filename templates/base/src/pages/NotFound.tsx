import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p className="text-4xl font-bold text-gray-300">404</p>
      <p className="text-gray-500">페이지를 찾을 수 없습니다.</p>
      <Button onClick={() => navigate("/")}>홈으로</Button>
    </div>
  );
}

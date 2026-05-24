import { useParams, useNavigate } from "react-router-dom";
import { useDetailQuery } from "@/features/list-detail/hooks/useDetailQuery";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useDetailQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        항목을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12.5 16.5L6 10l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-base font-semibold truncate">{data.title}</h1>
      </header>

      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="aspect-video w-full object-cover bg-gray-100"
        />
      )}

      <div className="flex flex-col gap-4 px-6 py-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-xs text-gray-400">
            {new Date(data.createdAt).toLocaleDateString("ko-KR")}
          </p>
        </div>

        {data.description && (
          <p className="text-sm leading-relaxed text-gray-700">{data.description}</p>
        )}
      </div>
    </div>
  );
}

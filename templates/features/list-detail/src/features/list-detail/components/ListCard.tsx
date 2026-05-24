import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ListItem } from "../types";

interface ListCardProps {
  item: ListItem;
  basePath: string;
}

export function ListCard({ item, basePath }: ListCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`${basePath}/${item.id}`)}
      className={cn(
        "flex w-full items-center gap-4 px-4 py-4 text-left",
        "hover:bg-gray-50 active:bg-gray-100 transition-colors"
      )}
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-16 w-16 shrink-0 rounded-xl object-cover bg-gray-100"
        />
      )}
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="truncate font-medium text-gray-900">{item.title}</p>
        {item.description && (
          <p className="truncate text-sm text-gray-500">{item.description}</p>
        )}
        <p className="text-xs text-gray-300">
          {new Date(item.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
    </button>
  );
}

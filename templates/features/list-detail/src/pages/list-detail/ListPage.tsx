import { useState } from "react";
import { SearchBar } from "@/features/list-detail/components/SearchBar";
import { ListCard } from "@/features/list-detail/components/ListCard";
import { useListQuery } from "@/features/list-detail/hooks/useListQuery";

const BASE_PATH = "/items";

export default function ListPage() {
  const [filter, setFilter] = useState({ keyword: "", page: 0, size: 20 });

  const { data, isLoading } = useListQuery(filter);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SearchBar
        onSearch={(keyword) => setFilter((prev) => ({ ...prev, keyword, page: 0 }))}
      />

      {!data?.content.length ? (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-400">
          <p className="text-sm">항목이 없습니다.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {data.content.map((item) => (
            <ListCard key={item.id} item={item} basePath={BASE_PATH} />
          ))}
        </div>
      )}
    </div>
  );
}

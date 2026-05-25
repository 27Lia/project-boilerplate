import { useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SearchInput — 검색 인풋 (돋보기 아이콘 + 초기화 버튼)
 *
 * @example
 * const [query, setQuery] = useState("");
 *
 * <SearchInput
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="검색어를 입력하세요"
 * />
 *
 * // onSearch로 엔터/돋보기 클릭 이벤트 처리
 * <SearchInput
 *   value={query}
 *   onChange={setQuery}
 *   onSearch={(v) => fetchResults(v)}
 * />
 */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "검색",
  className,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch?.(value);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 transition-colors focus-within:border-primary focus-within:bg-white",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSearch?.(value)}
        className="shrink-0 text-neutral-400"
      >
        <Search size={18} />
      </button>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-11 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          className="shrink-0 text-neutral-400 hover:text-neutral-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

import { useRef } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ImageUploader — 이미지 업로드 + 미리보기 (다중 선택 지원)
 *
 * @example
 * const [files, setFiles] = useState<File[]>([]);
 *
 * <ImageUploader
 *   files={files}
 *   onChange={setFiles}
 *   maxCount={5}
 * />
 *
 * // 폼 제출 시
 * const formData = new FormData();
 * files.forEach((f) => formData.append("images", f));
 */

interface ImageUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxCount?: number;
  className?: string;
}

export function ImageUploader({ files, onChange, maxCount = 10, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const merged = [...files, ...selected].slice(0, maxCount);
    onChange(merged);
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {files.map((file, i) => (
        <div key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-neutral-200">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white"
          >
            <X size={12} />
          </button>
        </div>
      ))}

      {files.length < maxCount && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={20} />
          <span className="text-xs">
            {files.length}/{maxCount}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAdd}
      />
    </div>
  );
}

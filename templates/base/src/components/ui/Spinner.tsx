import { cn } from "@/lib/utils";

/**
 * Spinner — 로딩 스피너
 *
 * @example
 * // 인라인 스피너
 * {isLoading && <Spinner />}
 * {isLoading && <Spinner size="sm" />}
 *
 * // 전체화면 로딩
 * if (isLoading) return <FullPageSpinner />;
 *
 * // 버튼 내부 (Button 컴포넌트의 loading prop 사용 권장)
 * <Button loading={isPending}>저장</Button>
 */

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-neutral-200 border-t-primary",
        sizeMap[size],
        className
      )}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

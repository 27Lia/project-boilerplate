/**
 * EmptyState — 데이터 없을 때 표시하는 빈 상태 컴포넌트
 *
 * @example
 * // 기본
 * <EmptyState />
 *
 * // 커스텀 문구
 * <EmptyState title="게시글이 없습니다" description="첫 번째 글을 작성해보세요." />
 *
 * // 액션 버튼 포함
 * <EmptyState
 *   title="아직 신청한 공고가 없어요"
 *   action={<Button onClick={() => navigate("/list")}>공고 보러가기</Button>}
 * />
 */

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "데이터가 없습니다",
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-4xl">🗂️</p>
      <p className="text-base font-medium text-neutral-700">{title}</p>
      {description && <p className="text-sm text-neutral-400">{description}</p>}
      {action}
    </div>
  );
}

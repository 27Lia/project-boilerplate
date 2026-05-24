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
      {description && (
        <p className="text-sm text-neutral-400">{description}</p>
      )}
      {action}
    </div>
  );
}

interface StepProgressBarProps {
  current: number;
  total: number;
}

export function StepProgressBar({ current, total }: StepProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="h-1 w-full bg-gray-100">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

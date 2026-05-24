import { useNavigate } from "react-router-dom";

interface StepHeaderProps {
  onBack: () => void;
  title?: string;
}

export function StepHeader({ onBack, title }: StepHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-3">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12.5 16.5L6 10l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {title && <h1 className="text-base font-semibold">{title}</h1>}
    </header>
  );
}

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Checkbox — 체크박스 버튼 컴포넌트
 *
 * @example
 * // 단독 사용
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onChange={setChecked} label="전체 동의" />
 *
 * // React Hook Form과 연동
 * const { watch, setValue } = useFormContext();
 * <Checkbox
 *   checked={watch("agreeAll")}
 *   onChange={(v) => setValue("agreeAll", v)}
 *   label="전체 동의"
 * />
 */

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn("flex items-center gap-2", disabled && "opacity-50", className)}
    >
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          checked ? "border-primary bg-primary" : "border-neutral-300 bg-white"
        )}
      >
        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
      {label && <span className="text-sm text-neutral-700">{label}</span>}
    </button>
  );
}

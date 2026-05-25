import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * OTPInput — 인증번호 N자리 입력 (자동 포커스 이동)
 *
 * @example
 * const [otp, setOtp] = useState("");
 *
 * <OTPInput length={6} value={otp} onChange={setOtp} />
 *
 * // 입력 완료 시 자동 제출
 * <OTPInput
 *   length={6}
 *   value={otp}
 *   onChange={(v) => {
 *     setOtp(v);
 *     if (v.length === 6) verifyOtp(v);
 *   }}
 * />
 */

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({ length = 6, value, onChange, disabled, className }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted.padEnd(length, "").slice(0, length));
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className={cn(
            "h-12 w-full rounded-2xl border border-neutral-200 text-center text-lg font-semibold text-neutral-900 outline-none transition-colors",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            digit && "border-primary",
            disabled && "bg-neutral-50 text-neutral-400"
          )}
        />
      ))}
    </div>
  );
}

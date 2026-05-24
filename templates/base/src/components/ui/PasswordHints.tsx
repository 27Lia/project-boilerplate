import { cn } from "@/lib/utils";

export const PASSWORD_RULES = {
  length: (pw: string) => pw.length >= 8,
  hasLetter: (pw: string) => /[a-zA-Z]/.test(pw),
  hasNumber: (pw: string) => /[0-9]/.test(pw),
  hasSpecial: (pw: string) => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(pw),
};

interface PasswordHintsProps {
  password: string;
}

function Hint({ ok, label }: { ok: boolean; label: string }) {
  return (
    <p
      className={cn(
        "text-xs transition-colors",
        ok ? "text-success" : "text-neutral-400"
      )}
    >
      · {label}
    </p>
  );
}

export function PasswordHints({ password }: PasswordHintsProps) {
  return (
    <div className="flex flex-col gap-1 pl-1">
      <Hint ok={PASSWORD_RULES.length(password)} label="8자 이상" />
      <Hint ok={PASSWORD_RULES.hasLetter(password)} label="영문 포함" />
      <Hint ok={PASSWORD_RULES.hasNumber(password)} label="숫자 포함" />
      <Hint ok={PASSWORD_RULES.hasSpecial(password)} label="특수문자 포함" />
    </div>
  );
}

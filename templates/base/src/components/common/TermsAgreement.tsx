import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

/**
 * TermsAgreement — 약관 동의 컴포넌트 (전체동의 + 개별 체크박스)
 * 회원가입 스텝에서 주로 사용합니다.
 *
 * @example
 * const TERMS = [
 *   { id: "terms", label: "이용약관 동의", required: true, url: "/terms" },
 *   { id: "privacy", label: "개인정보 처리방침 동의", required: true, url: "/privacy" },
 *   { id: "marketing", label: "마케팅 정보 수신 동의", required: false },
 * ];
 *
 * const [agreed, setAgreed] = useState<string[]>([]);
 * const allRequired = TERMS.filter(t => t.required).every(t => agreed.includes(t.id));
 *
 * <TermsAgreement terms={TERMS} agreed={agreed} onChange={setAgreed} />
 * <Button size="full" disabled={!allRequired} onClick={onNext}>다음</Button>
 */

interface Term {
  id: string;
  label: string;
  required?: boolean;
  url?: string;
}

interface TermsAgreementProps {
  terms: Term[];
  agreed: string[];
  onChange: (agreed: string[]) => void;
  className?: string;
}

export function TermsAgreement({ terms, agreed, onChange, className }: TermsAgreementProps) {
  const allChecked = terms.every((t) => agreed.includes(t.id));

  const toggleAll = () => {
    onChange(allChecked ? [] : terms.map((t) => t.id));
  };

  const toggle = (id: string) => {
    onChange(
      agreed.includes(id) ? agreed.filter((a) => a !== id) : [...agreed, id]
    );
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* 전체 동의 */}
      <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3">
        <Checkbox checked={allChecked} onChange={toggleAll} />
        <span className="text-base font-semibold text-neutral-900">전체 동의</span>
      </div>

      <div className="h-px bg-neutral-100" />

      {/* 개별 약관 */}
      {terms.map((term) => (
        <div key={term.id} className="flex items-center gap-3 px-1">
          <Checkbox checked={agreed.includes(term.id)} onChange={() => toggle(term.id)} />
          <span className="flex-1 text-sm text-neutral-700">
            {term.required && (
              <span className="mr-1 text-primary">[필수]</span>
            )}
            {!term.required && (
              <span className="mr-1 text-neutral-400">[선택]</span>
            )}
            {term.label}
          </span>
          {term.url && (
            <a href={term.url} className="shrink-0 text-neutral-400 hover:text-neutral-600">
              <ChevronRight size={16} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

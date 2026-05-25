import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";

/**
 * FormPasswordInput — 비밀번호 입력 컴포넌트 (antd 눈 아이콘 토글)
 * 반드시 <FormProvider> 안에서 사용해야 합니다.
 * 비밀번호 규칙 힌트가 필요하면 <PasswordHints> 조합해서 사용하세요.
 *
 * @example
 * <FormPasswordInput name="password" label="비밀번호" placeholder="영문+숫자+특수문자 8자 이상" />
 *
 * // 비밀번호 힌트 조합
 * const password = methods.watch("password");
 * <FormPasswordInput name="password" label="비밀번호" placeholder="비밀번호 입력" />
 * <PasswordHints password={password} />
 */

interface FormPasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FormPasswordInput({
  name,
  label,
  placeholder,
  disabled,
  className,
}: FormPasswordInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div
        className={cn(
          "flex items-center rounded-2xl border border-neutral-200 bg-white px-4 transition-colors focus-within:border-primary",
          error && "border-error focus-within:border-error",
          disabled && "bg-neutral-50",
          className
        )}
      >
        <input
          {...field}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          className="h-12 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-300 disabled:text-neutral-400"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="ml-2 shrink-0 text-neutral-400 hover:text-neutral-600"
          tabIndex={-1}
        >
          {show ? <EyeInvisibleOutlined style={{ fontSize: 18 }} /> : <EyeOutlined style={{ fontSize: 18 }} />}
        </button>
      </div>
      {error && <p className="text-xs text-error">{error.message}</p>}
    </div>
  );
}

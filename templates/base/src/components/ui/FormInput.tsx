import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

/**
 * FormInput — React Hook Form과 연동된 텍스트 입력 컴포넌트
 * 반드시 <FormProvider> 안에서 사용해야 합니다.
 *
 * @example
 * const methods = useForm();
 *
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <FormInput name="email" label="이메일" type="email" placeholder="example@email.com" />
 *     <FormInput name="phone" label="전화번호" placeholder="010-0000-0000" />
 *   </form>
 * </FormProvider>
 */

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  disabled,
  className,
}: FormInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

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
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className="h-12 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-300 disabled:text-neutral-400"
        />
      </div>
      {error && <p className="text-xs text-error">{error.message}</p>}
    </div>
  );
}

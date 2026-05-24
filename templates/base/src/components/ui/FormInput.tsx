import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

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
          "flex items-center rounded-xl border border-neutral-200 bg-white px-4 transition-colors focus-within:border-primary",
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
          className="h-11 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-300 disabled:text-neutral-400"
        />
      </div>
      {error && <p className="text-xs text-error">{error.message}</p>}
    </div>
  );
}

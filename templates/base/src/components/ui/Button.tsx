import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button
 *
 * @example
 * <Button>확인</Button>
 * <Button variant="outline" size="full">취소</Button>
 * <Button variant="gray" onClick={handleBack}>이전</Button>
 * <Button variant="danger" loading={isPending}>삭제</Button>
 * <Button size="full" disabled={!isValid} type="submit">다음</Button>
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:brightness-95",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary-50",
        ghost: "text-primary hover:bg-primary-50",
        gray: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
        danger: "bg-error text-white hover:brightness-95",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-5 text-base",
        lg: "h-14 px-6 text-base",
        full: "h-14 w-full text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({ className, variant, size, loading, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {children}
    </button>
  );
}

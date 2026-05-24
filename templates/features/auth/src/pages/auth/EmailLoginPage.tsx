import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FormInput } from "@/components/ui/FormInput";
import { FormPasswordInput } from "@/components/ui/FormPasswordInput";
import { Button } from "@/components/ui/Button";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { EmailLoginFormValues } from "@/features/auth/types";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export default function EmailLoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const methods = useForm<EmailLoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="flex h-full flex-col px-6 pt-16 gap-8">
      <h1 className="text-2xl font-bold text-neutral-900">이메일 로그인</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => login(values))}
          className="flex flex-col gap-4"
        >
          <FormInput
            name="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
          />
          <FormPasswordInput
            name="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
          />

          <button
            type="button"
            className="self-end text-xs text-neutral-400 underline"
            onClick={() => navigate("/find-password")}
          >
            비밀번호 찾기
          </button>

          <Button type="submit" size="full" disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

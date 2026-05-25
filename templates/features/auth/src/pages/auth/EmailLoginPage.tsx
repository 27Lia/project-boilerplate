import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
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
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center px-2 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          <ChevronLeft size={24} className="text-neutral-700" />
        </button>
      </div>

      {/* 폼 */}
      <div className="flex flex-1 flex-col px-6 pt-8">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900">이메일 로그인</h1>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((values) => login(values))}
            className="flex flex-col gap-4"
          >
            <FormInput name="email" label="이메일" type="email" placeholder="example@email.com" />
            <FormPasswordInput name="password" label="비밀번호" placeholder="비밀번호 입력" />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-neutral-400 underline-offset-2 hover:underline"
                onClick={() => navigate("/find-password")}
              >
                비밀번호 찾기
              </button>
            </div>

            <div className="mt-4">
              <Button type="submit" size="full" loading={isPending}>
                로그인
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

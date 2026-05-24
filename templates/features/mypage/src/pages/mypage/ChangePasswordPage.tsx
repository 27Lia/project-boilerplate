import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const schema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
      .regex(/[0-9]/, "숫자를 포함해야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (body: FormValues) => apiClient.patch("/users/me/password", body),
    onSuccess: () => navigate(-1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div className="flex flex-col px-6 pt-6 gap-6">
      <h1 className="text-xl font-bold">비밀번호 변경</h1>

      <form
        onSubmit={handleSubmit((values) => changePassword(values))}
        className="flex flex-col gap-4"
      >
        <Input
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호 입력"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <Input
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호 입력"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <Input
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호 재입력"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" size="full" disabled={isPending} className="mt-4">
          {isPending ? "변경 중..." : "변경하기"}
        </Button>
      </form>
    </div>
  );
}

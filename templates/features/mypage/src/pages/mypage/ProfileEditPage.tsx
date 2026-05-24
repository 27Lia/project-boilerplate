import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useProfile, useUpdateProfile } from "@/features/mypage/hooks/useProfile";

const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요.")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: profile?.name ?? "", phone: profile?.phone ?? "" },
  });

  return (
    <div className="flex flex-col px-6 pt-6 gap-6">
      <h1 className="text-xl font-bold">프로필 수정</h1>

      <form
        onSubmit={handleSubmit((values) =>
          updateProfile(values, { onSuccess: () => navigate(-1) })
        )}
        className="flex flex-col gap-4"
      >
        <Input
          label="이름"
          placeholder="이름 입력"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="전화번호"
          placeholder="010-0000-0000"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Button type="submit" size="full" disabled={isPending} className="mt-4">
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </form>
    </div>
  );
}

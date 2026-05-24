import { z } from "zod";

export const signupSchema = z.object({
  termsAgreed: z.literal(true, { errorMap: () => ({ message: "필수 약관에 동의해주세요." }) }),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: "개인정보 처리방침에 동의해주세요." }) }),
  marketingAgreed: z.boolean(),
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요."),
});

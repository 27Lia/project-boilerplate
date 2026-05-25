import { z } from "zod";

// ──────────────────────────────────────────────────────────
// 공통 필드 검증 규칙 — 필요한 것만 골라서 signupSchema에 추가하세요
// ──────────────────────────────────────────────────────────

export const validators = {
  /** 이름: 2~20자, 한글/영문만 허용, 특수문자/숫자 불가 */
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요.")
    .max(20, "이름은 20자 이하로 입력해주세요.")
    .regex(/^[가-힣a-zA-Z\s]+$/, "이름에 특수문자나 숫자를 사용할 수 없습니다."),

  /** 이메일: 표준 이메일 형식 */
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식을 입력해주세요.")
    .max(100, "이메일은 100자 이하로 입력해주세요."),

  /** 비밀번호: 8~20자, 영문+숫자+특수문자 각 1개 이상 */
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 20자 이하로 입력해주세요.")
    .regex(/[a-zA-Z]/, "영문을 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다.")
    .regex(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, "특수문자를 포함해야 합니다."),

  /** 비밀번호 확인 — confirmPassword 필드와 superRefine으로 함께 사용 */
  passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),

  /** 휴대폰 번호: 010-0000-0000 형식 */
  phone: z
    .string()
    .regex(/^010-\d{3,4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요."),

  /** 생년월일: YYYY-MM-DD, 만 14세 이상 */
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요.")
    .refine((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 14;
    }, "만 14세 이상만 가입할 수 있습니다."),

  /** 성별 */
  gender: z.enum(["MALE", "FEMALE"], { errorMap: () => ({ message: "성별을 선택해주세요." }) }),

  /** 닉네임: 2~15자, 한글/영문/숫자, 특수문자 불가 */
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상 입력해주세요.")
    .max(15, "닉네임은 15자 이하로 입력해주세요.")
    .regex(/^[가-힣a-zA-Z0-9]+$/, "닉네임에 특수문자를 사용할 수 없습니다."),

  /** 지역 */
  region: z.string().min(1, "지역을 선택해주세요."),

  /** 필수 약관 동의 */
  termsAgreed: z.literal(true, { errorMap: () => ({ message: "이용약관에 동의해주세요." }) }),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: "개인정보 처리방침에 동의해주세요." }) }),
  marketingAgreed: z.boolean(),
};

// ──────────────────────────────────────────────────────────
// 기본 회원가입 스키마 — 프로젝트에 맞게 필드를 추가/제거하세요
// ──────────────────────────────────────────────────────────
export const signupSchema = z
  .object({
    termsAgreed: validators.termsAgreed,
    privacyAgreed: validators.privacyAgreed,
    marketingAgreed: validators.marketingAgreed,
    name: validators.name,
    email: validators.email,
    password: validators.password,
    passwordConfirm: validators.passwordConfirm,
    phone: validators.phone,
    // 필요 시 추가:
    // birthDate: validators.birthDate,
    // gender: validators.gender,
    // nickname: validators.nickname,
    // region: validators.region,
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

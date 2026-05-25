import path from "path";
import fse from "fs-extra";

export async function generateClaudeMd({ projectPath, projectName, features, primaryColor }) {
  const featureList = features.join(", ") || "없음";

  const hasAuth = features.includes("auth");
  const hasSignup = features.includes("signup");
  const hasMypage = features.includes("mypage");
  const hasListDetail = features.includes("list-detail");

  const content = `# ${projectName}

이 프로젝트는 \`project-boilerplate\`로 생성된 React + TypeScript + Tailwind 앱입니다.
Claude Code에서 작업할 때 이 파일을 먼저 읽어 프로젝트 구조와 패턴을 파악하세요.

## 프로젝트 정보
- **포함된 기능**: ${featureList}
- **메인 컬러**: \`${primaryColor}\`
- **스타일**: Tailwind CSS v3 (neutral, error, success, primary 색상 사전 정의)

## 핵심 규칙

### 폼 입력 — 반드시 FormProvider 패턴 사용
\`\`\`tsx
// ✅ 올바른 방법
const methods = useForm({ resolver: zodResolver(schema) });
<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)}>
    <FormInput name="email" label="이메일" type="email" />
    <FormPasswordInput name="password" label="비밀번호" />
    <Button type="submit" size="full">확인</Button>
  </form>
</FormProvider>

// ❌ 하지 말 것 — 일반 <input> 직접 사용하지 말 것
<input {...register("email")} />
\`\`\`

### Zod 스키마 — 항상 함께 작성
\`\`\`tsx
const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(8, "8자 이상 입력해주세요."),
});
\`\`\`

### 버튼
\`\`\`tsx
<Button size="full">기본 (primary)</Button>
<Button variant="outline" size="full">취소</Button>
<Button variant="gray">이전</Button>
<Button loading={isPending}>로딩 상태</Button>
<Button size="full" disabled={!isValid} type="submit">폼 제출</Button>
\`\`\`

### API 호출 — React Query + axios
\`\`\`tsx
// hooks/useXxx.ts 파일 생성 패턴
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) => apiClient.post("/auth/login", data),
  });
}
\`\`\`

## UI 컴포넌트 목록 (\`src/components/ui/\`)

| 컴포넌트 | 설명 | 주요 props |
|---------|------|-----------|
| \`Button\` | 버튼 | variant(primary/outline/gray/danger), size(sm/md/lg/full), loading |
| \`FormInput\` | 텍스트 입력 (RHF 연동) | name, label, type, placeholder |
| \`FormPasswordInput\` | 비밀번호 입력 + 눈 아이콘 | name, label, placeholder |
| \`PasswordHints\` | 비밀번호 규칙 실시간 체크 | password(string) |
| \`Checkbox\` | 체크박스 | checked, onChange, label |
| \`Modal\` | 확인/취소 모달 | open, title, onConfirm, onCancel |
| \`Drawer\` | 하단 드로어 | open, onClose, title, height |
| \`Image\` | antd Image 래퍼 | src, size, fit, radius |
| \`EmptyState\` | 빈 상태 | title, description, action |
| \`Spinner\` | 로딩 스피너 | size(sm/md/lg) |
| \`FullPageSpinner\` | 전체화면 로딩 | - |

## 공통 컴포넌트 (\`src/components/common/\`)

| 컴포넌트 | 설명 |
|---------|------|
| \`RegionDrawer\` | 시/도 → 시/군/구 2단계 지역 선택 |
| \`DatePickerDrawer\` | 달력 날짜 선택 (dayjs 필요) |
| \`OTPInput\` | N자리 인증번호 입력 (자동 포커스) |
| \`ImageUploader\` | 이미지 업로드 + 미리보기 |
| \`SearchInput\` | 검색 입력 + 초기화 버튼 |
| \`TermsAgreement\` | 전체동의 + 개별 약관 체크박스 |

> scaffold component 명령어로 언제든 추가 가능

## 파일 구조
\`\`\`
src/
├── components/
│   ├── ui/          # 공통 UI 컴포넌트
│   └── common/      # 도메인 공통 컴포넌트
├── features/        # 기능별 로직 (hooks, store, types)
│   ${hasAuth ? "├── auth/" : ""}
│   ${hasSignup ? "├── signup/" : ""}
│   ${hasMypage ? "├── mypage/" : ""}
│   ${hasListDetail ? "└── list-detail/" : ""}
├── pages/           # 라우트 페이지
├── lib/             # axios, queryClient, utils
├── store/           # zustand 전역 상태
└── types/           # 공통 타입
\`\`\`
${hasAuth ? `
## 인증 흐름
- \`/login\` → 소셜/이메일 선택 (PublicRoute 보호)
- \`/login/email\` → 이메일 로그인 폼
- \`useAuthStore\` (zustand): accessToken, setAccessToken, logout
- axios interceptor에서 자동으로 Bearer 토큰 주입
- 401 응답 시 refresh token 재발급 자동 처리` : ""}
${hasSignup ? `
## 회원가입 흐름
- \`/signup\` → 멀티스텝 폼 (FormProvider로 전체 감싸짐)
- 각 Step 파일: \`src/pages/signup/steps/StepN.tsx\`
- 스텝에서 \`trigger(["fieldName"])\`으로 해당 필드만 검증 후 다음으로
- \`signupSchema\`: \`src/features/signup/schema.ts\` 수정해서 필드 추가` : ""}

## 작업 요청 시 참고사항
- 새 페이지 만들 때: \`src/pages/\` 에 생성 후 \`src/App.tsx\`에 라우트 추가
- 새 API 훅 만들 때: \`src/features/[기능]/hooks/\` 에 생성
- 컬러는 tailwind 클래스로: \`bg-primary\`, \`text-error\`, \`bg-success\`, \`text-neutral-500\`
`;

  await fse.outputFile(path.join(projectPath, "CLAUDE.md"), content.trimStart());
  console.log("  ✓ CLAUDE.md");
}

/**
 * 추가 가능한 컴포넌트 카탈로그
 * scaffold component 명령어로 기존 프로젝트에 추가할 수 있습니다.
 */

export const COMPONENT_CATALOG = [
  {
    name: "RegionDrawer",
    description: "지역 선택 드로어 (시/도 → 시/군/구)",
    files: [
      {
        src: "components/common/RegionDrawer.tsx",
        dest: "src/components/common/RegionDrawer.tsx",
      },
    ],
    deps: [],
  },
  {
    name: "DatePickerDrawer",
    description: "날짜 선택 드로어 (dayjs 기반)",
    files: [
      {
        src: "components/common/DatePickerDrawer.tsx",
        dest: "src/components/common/DatePickerDrawer.tsx",
      },
    ],
    deps: ["dayjs"],
  },
  {
    name: "OTPInput",
    description: "인증번호 N자리 입력 (자동 포커스 이동)",
    files: [
      {
        src: "components/common/OTPInput.tsx",
        dest: "src/components/common/OTPInput.tsx",
      },
    ],
    deps: [],
  },
  {
    name: "ImageUploader",
    description: "이미지 업로드 + 미리보기 (다중 선택 지원)",
    files: [
      {
        src: "components/common/ImageUploader.tsx",
        dest: "src/components/common/ImageUploader.tsx",
      },
    ],
    deps: [],
  },
  {
    name: "BottomSheet",
    description: "범용 바텀시트 (스크롤 + 닫기 제스처)",
    files: [
      {
        src: "components/common/BottomSheet.tsx",
        dest: "src/components/common/BottomSheet.tsx",
      },
    ],
    deps: [],
  },
  {
    name: "SearchInput",
    description: "돋보기 아이콘 + 검색 인풋 + 초기화 버튼",
    files: [
      {
        src: "components/common/SearchInput.tsx",
        dest: "src/components/common/SearchInput.tsx",
      },
    ],
    deps: [],
  },
  {
    name: "TermsAgreement",
    description: "약관 전체동의 + 개별 체크박스 (회원가입 스텝용)",
    files: [
      {
        src: "components/common/TermsAgreement.tsx",
        dest: "src/components/common/TermsAgreement.tsx",
      },
    ],
    deps: [],
  },
];

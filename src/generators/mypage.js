import path from "path";
import fse from "fs-extra";
import { TEMPLATES_DIR } from "../constants.js";

const MYPAGE_DIR = path.join(TEMPLATES_DIR, "features/mypage");

export async function generateMypage(ctx) {
  const { projectPath } = ctx;

  const files = [
    "src/features/mypage/types/index.ts",
    "src/features/mypage/hooks/useProfile.ts",
    "src/features/mypage/components/ProfileCard.tsx",
    "src/features/mypage/components/MenuList.tsx",
    "src/pages/mypage/MyPage.tsx",
    "src/pages/mypage/ProfileEditPage.tsx",
    "src/pages/mypage/ChangePasswordPage.tsx",
  ];

  for (const file of files) {
    await fse.copy(path.join(MYPAGE_DIR, file), path.join(projectPath, file));
  }

  console.log("  ✓ mypage");
}

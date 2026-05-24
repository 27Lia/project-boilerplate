import path from "path";
import fse from "fs-extra";
import { generateBase } from "./generators/base.js";
import { generateAuth } from "./generators/auth.js";
import { generateSignup } from "./generators/signup.js";
import { generateMypage } from "./generators/mypage.js";
import { generateListDetail } from "./generators/list-detail.js";

export async function generateProject(options) {
  const { projectName, outputDir, features, socialLogins, signupSteps, primaryColor } = options;

  const projectPath = path.resolve(outputDir, projectName);

  if (await fse.pathExists(projectPath)) {
    console.error(`\n❌ "${projectPath}" 폴더가 이미 존재합니다.`);
    process.exit(1);
  }

  console.log(`\n🚀 프로젝트 생성 중: ${projectName}\n`);

  const ctx = { projectName, projectPath, features, socialLogins, signupSteps, primaryColor };

  await generateBase(ctx);

  if (features.includes("auth")) await generateAuth(ctx);
  if (features.includes("signup")) await generateSignup(ctx);
  if (features.includes("mypage")) await generateMypage(ctx);
  if (features.includes("list-detail")) await generateListDetail(ctx);

  console.log(`\n✅ 완료! 다음 명령어로 시작하세요:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev\n`);
}

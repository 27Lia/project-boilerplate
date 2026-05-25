#!/usr/bin/env node
import inquirer from "inquirer";
import path from "path";
import fse from "fs-extra";
import { generateProject } from "../src/generator.js";
import { addComponent } from "../src/addComponent.js";
import { COMPONENT_CATALOG } from "../src/components.js";

const command = process.argv[2];

// ─────────────────────────────────────────
// scaffold component  →  기존 프로젝트에 컴포넌트 추가
// ─────────────────────────────────────────
if (command === "component") {
  const cwd = process.cwd();
  const hasPackageJson = await fse.pathExists(path.join(cwd, "package.json"));

  if (!hasPackageJson) {
    console.error("\n❌ package.json을 찾을 수 없습니다. 프로젝트 루트에서 실행해주세요.\n");
    process.exit(1);
  }

  const { selected } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "추가할 컴포넌트를 선택하세요:",
      choices: COMPONENT_CATALOG.map((c) => ({
        name: `${c.name}  —  ${c.description}`,
        value: c.name,
      })),
      validate: (v) => v.length > 0 || "최소 1개 이상 선택해주세요.",
    },
  ]);

  console.log("");
  const results = await addComponent({ targetDir: cwd, componentNames: selected });

  for (const r of results) {
    if (!r.success) {
      console.log(`  ✗ ${r.name}: ${r.reason}`);
    } else if (r.skipped) {
      console.log(`  ~ ${r.name}: 이미 존재 (건너뜀) → ${r.dest}`);
    } else {
      console.log(`  ✓ ${r.name} → ${r.dest}`);
    }
  }

  const neededDeps = selected
    .flatMap((name) => COMPONENT_CATALOG.find((c) => c.name === name)?.deps ?? [])
    .filter((dep, i, arr) => arr.indexOf(dep) === i);

  if (neededDeps.length > 0) {
    console.log(`\n📦 추가로 설치가 필요한 패키지:`);
    console.log(`  npm install ${neededDeps.join(" ")}\n`);
  } else {
    console.log("\n✅ 완료!\n");
  }

  process.exit(0);
}

// ─────────────────────────────────────────
// scaffold  →  새 프로젝트 생성
// ─────────────────────────────────────────
if (!command || command === "create") {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "프로젝트 이름:",
      validate: (v) => v.trim() !== "" || "이름을 입력해주세요.",
    },
    {
      type: "input",
      name: "outputDir",
      message: "생성 경로 (기본: 현재 디렉토리):",
      default: ".",
    },
    {
      type: "checkbox",
      name: "features",
      message: "포함할 기능 선택:",
      choices: [
        { name: "로그인 (auth)", value: "auth", checked: true },
        { name: "회원가입 스텝 (signup)", value: "signup", checked: true },
        { name: "마이페이지 (mypage)", value: "mypage" },
        { name: "리스트 + 상세 (list-detail)", value: "list-detail" },
      ],
    },
    {
      type: "checkbox",
      name: "socialLogins",
      message: "소셜 로그인 선택:",
      choices: [
        { name: "카카오", value: "kakao", checked: true },
        { name: "구글", value: "google", checked: true },
        { name: "애플", value: "apple" },
      ],
      when: (a) => a.features.includes("auth"),
    },
    {
      type: "number",
      name: "signupSteps",
      message: "회원가입 스텝 수:",
      default: 4,
      when: (a) => a.features.includes("signup"),
    },
    {
      type: "input",
      name: "primaryColor",
      message: "Tailwind 메인 컬러 (hex, 기본: #6366f1):",
      default: "#6366f1",
    },
  ]);

  await generateProject(answers);
  process.exit(0);
}

// 알 수 없는 커맨드
console.log(`
사용법:
  scaffold              새 프로젝트 생성
  scaffold component    기존 프로젝트에 컴포넌트 추가
`);
process.exit(1);

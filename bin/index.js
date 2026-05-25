#!/usr/bin/env node
import inquirer from "inquirer";
import path from "path";
import fse from "fs-extra";
import { generateProject } from "../src/generator.js";
import { addComponent } from "../src/addComponent.js";
import { addFeature } from "../src/addFeature.js";
import { startServer } from "../src/server.js";
import { COMPONENT_CATALOG } from "../src/components.js";

const command = process.argv[2];

if (command === "ui") {
  // ── GUI 브라우저 앱 실행
  startServer(3939);

} else if (command === "component") {
  // ── 기존 프로젝트에 컴포넌트 추가
  const cwd = process.cwd();
  if (!(await fse.pathExists(path.join(cwd, "package.json")))) {
    console.error("\n❌ 프로젝트 루트에서 실행해주세요.\n");
    process.exit(1);
  }

  const { selected } = await inquirer.prompt([{
    type: "checkbox",
    name: "selected",
    message: "추가할 컴포넌트를 선택하세요:",
    choices: COMPONENT_CATALOG.map((c) => ({ name: `${c.name}  —  ${c.description}`, value: c.name })),
    validate: (v) => v.length > 0 || "최소 1개 이상 선택해주세요.",
  }]);

  console.log("");
  const results = await addComponent({ targetDir: cwd, componentNames: selected });
  for (const r of results) {
    if (!r.success) console.log(`  ✗ ${r.name}: ${r.reason}`);
    else if (r.skipped) console.log(`  ~ ${r.name}: 이미 존재 (건너뜀)`);
    else console.log(`  ✓ ${r.name} → ${r.dest}`);
  }

  const deps = selected.flatMap((n) => COMPONENT_CATALOG.find((c) => c.name === n)?.deps ?? []).filter((d, i, a) => a.indexOf(d) === i);
  if (deps.length) console.log(`\n📦 npm install ${deps.join(" ")}\n`);
  else console.log("\n✅ 완료!\n");
  process.exit(0);

} else if (command === "feature") {
  // ── 기존 프로젝트에 기능 추가
  const cwd = process.cwd();
  if (!(await fse.pathExists(path.join(cwd, "package.json")))) {
    console.error("\n❌ 프로젝트 루트에서 실행해주세요.\n");
    process.exit(1);
  }

  const { features } = await inquirer.prompt([{
    type: "checkbox",
    name: "features",
    message: "추가할 기능을 선택하세요:",
    choices: [
      { name: "로그인 (auth)", value: "auth" },
      { name: "회원가입 스텝 (signup)", value: "signup" },
      { name: "마이페이지 (mypage)", value: "mypage" },
      { name: "리스트 + 상세 (list-detail)", value: "list-detail" },
    ],
    validate: (v) => v.length > 0 || "최소 1개 이상 선택해주세요.",
  }]);

  const extra = await inquirer.prompt([
    { type: "checkbox", name: "socialLogins", message: "소셜 로그인 선택:", choices: [{ name: "카카오", value: "kakao", checked: true }, { name: "구글", value: "google", checked: true }, { name: "애플", value: "apple" }], when: () => features.includes("auth") },
    { type: "number", name: "signupSteps", message: "회원가입 스텝 수:", default: 4, when: () => features.includes("signup") },
  ]);

  const ctx = { projectName: path.basename(cwd), socialLogins: extra.socialLogins ?? [], signupSteps: extra.signupSteps ?? 4, features, primaryColor: "#6366f1" };
  console.log("");
  const results = await addFeature({ targetDir: cwd, features, ctx });
  for (const r of results) {
    console.log(r.success ? `  ✓ ${r.feature} 추가 완료` : `  ✗ ${r.feature}: ${r.reason}`);
  }
  console.log("\n✅ 완료!\n");
  process.exit(0);

} else if (!command || command === "create") {
  // ── 새 프로젝트 생성
  const answers = await inquirer.prompt([
    { type: "input", name: "projectName", message: "프로젝트 이름:", validate: (v) => v.trim() !== "" || "이름을 입력해주세요." },
    { type: "input", name: "outputDir", message: "생성 경로 (기본: 현재 디렉토리):", default: "." },
    {
      type: "checkbox", name: "features", message: "포함할 기능 선택:",
      choices: [
        { name: "로그인 (auth)", value: "auth", checked: true },
        { name: "회원가입 스텝 (signup)", value: "signup", checked: true },
        { name: "마이페이지 (mypage)", value: "mypage" },
        { name: "리스트 + 상세 (list-detail)", value: "list-detail" },
      ],
    },
    { type: "checkbox", name: "socialLogins", message: "소셜 로그인 선택:", choices: [{ name: "카카오", value: "kakao", checked: true }, { name: "구글", value: "google", checked: true }, { name: "애플", value: "apple" }], when: (a) => a.features.includes("auth") },
    { type: "number", name: "signupSteps", message: "회원가입 스텝 수:", default: 4, when: (a) => a.features.includes("signup") },
    { type: "input", name: "primaryColor", message: "Tailwind 메인 컬러 (hex, 기본: #6366f1):", default: "#6366f1" },
  ]);
  await generateProject(answers);
  process.exit(0);

} else {
  console.log(`
사용법:
  scaffold              새 프로젝트 생성 (CLI)
  scaffold ui           GUI 앱 실행 (브라우저)
  scaffold feature      기존 프로젝트에 기능 추가
  scaffold component    기존 프로젝트에 컴포넌트 추가
`);
  process.exit(1);
}

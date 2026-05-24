#!/usr/bin/env node
import inquirer from "inquirer";
import { generateProject } from "../src/generator.js";

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
      { name: "알림 (notifications)", value: "notifications" },
      { name: "고객센터 (customer-service)", value: "customer-service" },
      { name: "채팅 (chat)", value: "chat" },
      { name: "어드민 레이아웃 (admin)", value: "admin" },
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

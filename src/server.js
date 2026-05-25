import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import fse from "fs-extra";
import { generateProject } from "./generator.js";
import { addFeature } from "./addFeature.js";
import { addComponent } from "./addComponent.js";
import { COMPONENT_CATALOG } from "./components.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function startServer(port = 3939) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "ui")));

  // ── 컴포넌트 카탈로그 조회
  app.get("/api/components", (_req, res) => {
    res.json(COMPONENT_CATALOG.map((c) => ({ name: c.name, description: c.description, deps: c.deps })));
  });

  // ── 새 프로젝트 생성 (Server-Sent Events로 실시간 로그)
  app.post("/api/create", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (msg) => res.write(`data: ${JSON.stringify({ msg })}\n\n`);

    try {
      const { projectName, outputDir, features, socialLogins, signupSteps, primaryColor } = req.body;

      send(`🚀 프로젝트 생성 중: ${projectName}`);

      // console.log를 가로채기
      const origLog = console.log;
      console.log = (...args) => send(args.join(" "));

      await generateProject({ projectName, outputDir, features, socialLogins, signupSteps, primaryColor });

      console.log = origLog;

      send("✅ 완료! VS Code에서 열어보세요.");
      res.write(`data: ${JSON.stringify({ done: true, projectName, outputDir })}\n\n`);
    } catch (e) {
      res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    }

    res.end();
  });

  // ── 기능 추가
  app.post("/api/feature", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (msg) => res.write(`data: ${JSON.stringify({ msg })}\n\n`);

    try {
      const { targetDir, features, socialLogins, signupSteps } = req.body;

      if (!(await fse.pathExists(path.join(targetDir, "package.json")))) {
        send("❌ package.json을 찾을 수 없습니다. 올바른 프로젝트 경로인지 확인해주세요.");
        res.write(`data: ${JSON.stringify({ error: true })}\n\n`);
        return res.end();
      }

      const origLog = console.log;
      console.log = (...args) => send(args.join(" "));

      const ctx = {
        projectName: path.basename(targetDir),
        socialLogins: socialLogins ?? [],
        signupSteps: signupSteps ?? 4,
        features,
        primaryColor: "#6366f1",
      };

      const results = await addFeature({ targetDir, features, ctx });
      console.log = origLog;

      for (const r of results) {
        send(r.success ? `✓ ${r.feature} 추가 완료` : `✗ ${r.feature}: ${r.reason}`);
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    } catch (e) {
      res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    }

    res.end();
  });

  // ── 컴포넌트 추가
  app.post("/api/component", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (msg) => res.write(`data: ${JSON.stringify({ msg })}\n\n`);

    try {
      const { targetDir, componentNames } = req.body;

      if (!(await fse.pathExists(path.join(targetDir, "package.json")))) {
        send("❌ package.json을 찾을 수 없습니다. 올바른 프로젝트 경로인지 확인해주세요.");
        res.write(`data: ${JSON.stringify({ error: true })}\n\n`);
        return res.end();
      }

      const results = await addComponent({ targetDir, componentNames });

      for (const r of results) {
        if (!r.success) send(`✗ ${r.name}: ${r.reason}`);
        else if (r.skipped) send(`~ ${r.name}: 이미 존재 (건너뜀)`);
        else send(`✓ ${r.name} → ${r.dest}`);
      }

      const neededDeps = componentNames
        .flatMap((name) => COMPONENT_CATALOG.find((c) => c.name === name)?.deps ?? [])
        .filter((d, i, a) => a.indexOf(d) === i);

      if (neededDeps.length > 0) {
        send(`📦 추가 설치 필요: npm install ${neededDeps.join(" ")}`);
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    } catch (e) {
      res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    }

    res.end();
  });

  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n🖥️  Scaffold UI 실행 중: ${url}\n`);
    // 브라우저 자동 열기
    const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    execFile(opener, [url]);
  });
}

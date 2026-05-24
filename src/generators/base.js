import path from "path";
import fse from "fs-extra";
import Handlebars from "handlebars";
import { TEMPLATES_DIR } from "../constants.js";

Handlebars.registerHelper("includes", (arr, val) => Array.isArray(arr) && arr.includes(val));

const BASE_DIR = path.join(TEMPLATES_DIR, "base");

async function renderTemplate(templatePath, ctx) {
  const raw = await fse.readFile(templatePath, "utf-8");
  return Handlebars.compile(raw)(ctx);
}

async function writeRendered(destPath, templatePath, ctx) {
  const content = await renderTemplate(templatePath, ctx);
  await fse.outputFile(destPath, content);
}

export async function generateBase(ctx) {
  const { projectPath, projectName } = ctx;

  const staticFiles = [
    "public/vite.svg",
    "src/main.tsx",
    "src/index.css",
    "src/lib/queryClient.ts",
    "src/lib/axios.ts",
    "src/lib/utils.ts",
    "src/store/uiStore.ts",
    "src/types/common.ts",
    "src/components/ui/Button.tsx",
    "src/components/ui/Input.tsx",
    "src/components/ui/Modal.tsx",
    "src/pages/NotFound.tsx",
  ];

  for (const file of staticFiles) {
    const src = path.join(BASE_DIR, file);
    const dest = path.join(projectPath, file);
    if (await fse.pathExists(src)) {
      await fse.copy(src, dest);
    }
  }

  const templatedFiles = [
    { src: "src/App.tsx.hbs", dest: "src/App.tsx" },
    { src: "package.json.hbs", dest: "package.json" },
    { src: "vite.config.ts.hbs", dest: "vite.config.ts" },
    { src: "tsconfig.json.hbs", dest: "tsconfig.json" },
    { src: "tsconfig.app.json.hbs", dest: "tsconfig.app.json" },
    { src: "tailwind.config.js.hbs", dest: "tailwind.config.js" },
    { src: "postcss.config.js.hbs", dest: "postcss.config.js" },
    { src: "index.html.hbs", dest: "index.html" },
    { src: ".env.example.hbs", dest: ".env.example" },
    { src: ".gitignore.hbs", dest: ".gitignore" },
  ];

  for (const { src, dest } of templatedFiles) {
    await writeRendered(
      path.join(projectPath, dest),
      path.join(BASE_DIR, src),
      ctx
    );
  }

  console.log("  ✓ base");
}

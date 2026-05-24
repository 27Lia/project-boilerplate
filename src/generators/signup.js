import path from "path";
import fse from "fs-extra";
import Handlebars from "handlebars";
import { TEMPLATES_DIR } from "../constants.js";

const SIGNUP_DIR = path.join(TEMPLATES_DIR, "features/signup");

async function renderAndWrite(srcPath, destPath, ctx) {
  const raw = await fse.readFile(srcPath, "utf-8");
  const content = Handlebars.compile(raw)(ctx);
  await fse.outputFile(destPath, content);
}

export async function generateSignup(ctx) {
  const { projectPath, signupSteps } = ctx;

  const staticFiles = [
    "src/features/signup/components/StepProgressBar.tsx",
    "src/features/signup/components/StepHeader.tsx",
    "src/features/signup/types/index.ts",
    "src/features/signup/hooks/useSignup.ts",
    "src/features/signup/schema.ts",
    "src/pages/signup/SignupCompletePage.tsx",
  ];

  for (const file of staticFiles) {
    await fse.copy(
      path.join(SIGNUP_DIR, file),
      path.join(projectPath, file)
    );
  }

  const steps = Array.from({ length: signupSteps }, (_, i) => ({
    stepNumber: i + 1,
  }));

  await renderAndWrite(
    path.join(SIGNUP_DIR, "src/pages/signup/SignupPage.tsx.hbs"),
    path.join(projectPath, "src/pages/signup/SignupPage.tsx"),
    { ...ctx, steps }
  );

  for (const step of steps) {
    await renderAndWrite(
      path.join(SIGNUP_DIR, "src/pages/signup/steps/StepTemplate.tsx.hbs"),
      path.join(projectPath, `src/pages/signup/steps/Step${step.stepNumber}.tsx`),
      { ...ctx, stepNumber: step.stepNumber }
    );
  }

  console.log("  ✓ signup");
}

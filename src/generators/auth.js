import path from "path";
import fse from "fs-extra";
import Handlebars from "handlebars";
import { TEMPLATES_DIR } from "../constants.js";

const AUTH_DIR = path.join(TEMPLATES_DIR, "features/auth");

async function renderAndWrite(srcPath, destPath, ctx) {
  const raw = await fse.readFile(srcPath, "utf-8");
  const content = Handlebars.compile(raw)(ctx);
  await fse.outputFile(destPath, content);
}

export async function generateAuth(ctx) {
  const { projectPath, socialLogins, projectName } = ctx;

  const staticFiles = [
    "src/features/auth/store/authStore.ts",
    "src/features/auth/types/index.ts",
    "src/features/auth/hooks/useLogin.ts",
    "src/features/auth/hooks/useSocialLogin.ts",
    "src/features/auth/components/SocialLoginButton.tsx",
    "src/pages/auth/EmailLoginPage.tsx",
    "src/pages/PrivateRoute.tsx",
    "src/pages/PublicRoute.tsx",
  ];

  for (const file of staticFiles) {
    await fse.copy(
      path.join(AUTH_DIR, file),
      path.join(projectPath, file)
    );
  }

  await renderAndWrite(
    path.join(AUTH_DIR, "src/pages/auth/LoginPage.tsx.hbs"),
    path.join(projectPath, "src/pages/auth/LoginPage.tsx"),
    ctx
  );

  for (const provider of socialLogins) {
    await renderAndWrite(
      path.join(AUTH_DIR, "src/pages/auth/oauth/OAuthCallbackPage.tsx.hbs"),
      path.join(projectPath, `src/pages/auth/oauth/${capitalize(provider)}CallbackPage.tsx`),
      { ...ctx, provider }
    );
  }

  console.log("  ✓ auth");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

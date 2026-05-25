import path from "path";
import fse from "fs-extra";
import { generateAuth } from "./generators/auth.js";
import { generateSignup } from "./generators/signup.js";
import { generateMypage } from "./generators/mypage.js";
import { generateListDetail } from "./generators/list-detail.js";

/**
 * 기존 프로젝트에 feature 추가 + App.tsx 라우트 자동 주입
 */

const FEATURE_ROUTES = {
  mypage: {
    imports: [`import MyPage from "@/pages/mypage/MyPage";`],
    privateRoutes: [`        <Route path="/mypage" element={<MyPage />} />`],
    publicRoutes: [],
  },
  "list-detail": {
    imports: [
      `import ListPage from "@/pages/list-detail/ListPage";`,
      `import DetailPage from "@/pages/list-detail/DetailPage";`,
    ],
    privateRoutes: [
      `        <Route path="/list" element={<ListPage />} />`,
      `        <Route path="/list/:id" element={<DetailPage />} />`,
    ],
    publicRoutes: [],
  },
  auth: {
    imports: [
      `import PrivateRoute from "@/pages/PrivateRoute";`,
      `import PublicRoute from "@/pages/PublicRoute";`,
      `import LoginPage from "@/pages/auth/LoginPage";`,
      `import EmailLoginPage from "@/pages/auth/EmailLoginPage";`,
    ],
    privateRoutes: [],
    publicRoutes: [
      `      <Route element={<PublicRoute />}>`,
      `        <Route path="/login" element={<LoginPage />} />`,
      `        <Route path="/login/email" element={<EmailLoginPage />} />`,
      `      </Route>`,
      `      <Route path="/" element={<Navigate to="/login" replace />} />`,
    ],
  },
  signup: {
    imports: [
      `import SignupPage from "@/pages/signup/SignupPage";`,
      `import SignupCompletePage from "@/pages/signup/SignupCompletePage";`,
    ],
    privateRoutes: [],
    publicRoutes: [
      `      <Route path="/signup" element={<SignupPage />} />`,
      `      <Route path="/signup/complete" element={<SignupCompletePage />} />`,
    ],
  },
};

async function injectIntoAppTsx(appTsxPath, feature) {
  const routes = FEATURE_ROUTES[feature];
  if (!routes) return false;

  let content = await fse.readFile(appTsxPath, "utf-8");

  // ── 1. import 주입 (마지막 import 줄 뒤에 추가)
  for (const imp of routes.imports) {
    if (content.includes(imp)) continue; // 이미 있으면 skip
    const lastImportIdx = content.lastIndexOf("\nimport ");
    if (lastImportIdx === -1) continue;
    const lineEnd = content.indexOf("\n", lastImportIdx + 1);
    content = content.slice(0, lineEnd) + "\n" + imp + content.slice(lineEnd);
  }

  // ── 2. PrivateRoute 안에 라우트 주입
  if (routes.privateRoutes.length > 0) {
    const privateMarker = `<Route element={<PrivateRoute />}>`;
    const markerIdx = content.indexOf(privateMarker);
    if (markerIdx !== -1) {
      // PrivateRoute 닫는 태그 찾기
      const closeMarker = `</Route>`;
      const afterMarker = content.indexOf(closeMarker, markerIdx);
      if (afterMarker !== -1) {
        const toInject = routes.privateRoutes
          .filter((r) => !content.includes(r.trim()))
          .join("\n");
        if (toInject) {
          content = content.slice(0, afterMarker) + toInject + "\n      " + content.slice(afterMarker);
        }
      }
    }
  }

  // ── 3. public 라우트 주입 (<Route path="*" 앞에)
  if (routes.publicRoutes.length > 0) {
    const notFoundMarker = `<Route path="*"`;
    const nfIdx = content.indexOf(notFoundMarker);
    if (nfIdx !== -1) {
      const toInject = routes.publicRoutes
        .filter((r) => !content.includes(r.trim()))
        .join("\n");
      if (toInject) {
        content = content.slice(0, nfIdx) + toInject + "\n      " + content.slice(nfIdx);
      }
    }
  }

  await fse.writeFile(appTsxPath, content, "utf-8");
  return true;
}

export async function addFeature({ targetDir, features, ctx }) {
  const appTsxPath = path.join(targetDir, "src/App.tsx");
  const hasAppTsx = await fse.pathExists(appTsxPath);

  const results = [];

  for (const feature of features) {
    const featureCtx = { ...ctx, projectPath: targetDir };

    try {
      if (feature === "auth") await generateAuth(featureCtx);
      else if (feature === "signup") await generateSignup(featureCtx);
      else if (feature === "mypage") await generateMypage(featureCtx);
      else if (feature === "list-detail") await generateListDetail(featureCtx);
      else {
        results.push({ feature, success: false, reason: "지원하지 않는 feature" });
        continue;
      }

      if (hasAppTsx) {
        await injectIntoAppTsx(appTsxPath, feature);
      }

      results.push({ feature, success: true });
    } catch (e) {
      results.push({ feature, success: false, reason: e.message });
    }
  }

  return results;
}

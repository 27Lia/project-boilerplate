import path from "path";
import fse from "fs-extra";
import { TEMPLATES_DIR } from "./constants.js";
import { COMPONENT_CATALOG } from "./components.js";

const BASE_TEMPLATE_DIR = path.join(TEMPLATES_DIR, "base/src");

export async function addComponent({ targetDir, componentNames }) {
  const results = [];

  for (const name of componentNames) {
    const component = COMPONENT_CATALOG.find((c) => c.name === name);
    if (!component) {
      results.push({ name, success: false, reason: "카탈로그에 없는 컴포넌트" });
      continue;
    }

    for (const file of component.files) {
      const src = path.join(BASE_TEMPLATE_DIR, file.src);
      const dest = path.join(targetDir, file.dest);

      if (!(await fse.pathExists(src))) {
        results.push({ name, success: false, reason: `템플릿 파일 없음: ${file.src}` });
        continue;
      }

      const alreadyExists = await fse.pathExists(dest);
      await fse.copy(src, dest, { overwrite: false });
      results.push({ name, success: true, dest: file.dest, skipped: alreadyExists });
    }
  }

  return results;
}

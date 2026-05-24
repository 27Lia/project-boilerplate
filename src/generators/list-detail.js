import path from "path";
import fse from "fs-extra";
import { TEMPLATES_DIR } from "../constants.js";

const LIST_DIR = path.join(TEMPLATES_DIR, "features/list-detail");

export async function generateListDetail(ctx) {
  const { projectPath } = ctx;

  const files = [
    "src/features/list-detail/types/index.ts",
    "src/features/list-detail/hooks/useListQuery.ts",
    "src/features/list-detail/hooks/useDetailQuery.ts",
    "src/features/list-detail/components/ListCard.tsx",
    "src/features/list-detail/components/SearchBar.tsx",
    "src/pages/list-detail/ListPage.tsx",
    "src/pages/list-detail/DetailPage.tsx",
  ];

  for (const file of files) {
    await fse.copy(path.join(LIST_DIR, file), path.join(projectPath, file));
  }

  console.log("  ✓ list-detail");
}

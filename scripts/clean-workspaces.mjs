import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  "apps/api/dist",
  "apps/web/.next",
  "packages/shared/dist"
];

for (const target of targets) {
  const absoluteTarget = path.resolve(root, target);

  if (!absoluteTarget.startsWith(root + path.sep)) {
    throw new Error(`Refusing to remove path outside workspace: ${absoluteTarget}`);
  }

  rmSync(absoluteTarget, { recursive: true, force: true });
}

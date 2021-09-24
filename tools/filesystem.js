import fs from "fs-extra";
import { join } from "path";

export const publicFolderPath = join(process.cwd(), "public");

export const readJSONFile = async (path) => {
  return JSON.parse(await fs.readFile(path, "utf8"));
};

export const writeJSONFile = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content));
};

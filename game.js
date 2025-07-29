import * as frida from "frida";
import fs from "fs";

async function main() {
  const session = await frida.attach("gtutorial-x86_64.exe");

  const agentPath = new URL("./agent/game.js", import.meta.url);
  const source = fs.readFileSync(agentPath, "utf-8");
  const script = await session.createScript(source);

  // 加载脚本
  await script.load();
}

main().catch((e) => {
  console.error(e);
});

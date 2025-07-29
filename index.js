import * as frida from "frida";
import fs from "fs";

async function main() {
  const session = await frida.attach("Tutorial-x86_64.exe");

  // 读取并编译 Frida 脚本
  const agentPath = new URL("./agent/test.js", import.meta.url);
  const source = fs.readFileSync(agentPath, "utf-8");
  const script = await session.createScript(source);
  

  // 加载脚本
  await script.load();

  // // 读取并编译 Frida 脚本
  // const agentPath2 = new URL("./agent/test2.js", import.meta.url);
  // const source2 = fs.readFileSync(agentPath2, "utf-8");
  // const script2 = await session.createScript(source2);

  // // 监听脚本消息
  // script2.message.connect((message) => {
  //   console.log("Message from script:", message.payload);
  //   // 调用 RPC 方法
  //   // script.exports.modify(message.payload, 1000)
  // });

  // // 加载脚本
  // await script2.load();

  // 读取并编译 Frida 脚本
  const agentPath2 = new URL("./agent/level9.js", import.meta.url);
  const source2 = fs.readFileSync(agentPath2, "utf-8");
  const script2 = await session.createScript(source2);

  // 加载脚本
  await script2.load();
}

main().catch((e) => {
  console.error(e);
});

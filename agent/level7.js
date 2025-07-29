// 第七关
// 修改运算值,代码注入
// 跳关密码 013370
// "Tutorial-x86_64.exe"+48367 - 83 AE E0070000 01     - sub dword ptr [rsi+000007E0],01 { 1 }

const Module = Process.mainModule;

const TARGET_ADDR = Module.base.add(0x48367); // 偏移
Interceptor.attach(TARGET_ADDR, {
  onEnter(args) {
    console.log(JSON.stringify(this.context));

    const rsi = this.context.rsi;
    const addr = rsi.add(0x7E0);
    ptr(addr).writeU64(addr.readU64() + 3);
  },
});

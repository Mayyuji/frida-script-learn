// 第三关
// 位置初始值
// 跳关密码 419482
// "Tutorial-x86_64.exe"+4650D - 29 9E F8070000        - sub [rsi+000007F8],ebx

const Module = Process.mainModule;

const TARGET_ADDR = Module.base.add(0x4650D); // 偏移
Interceptor.attach(TARGET_ADDR, {
  onEnter(args) {

    const rsi = this.context.rsi;

    // 让sub减0 ebx 是 rbx 的 32 位低位部分
    this.context.rbx = ptr(0); 
    const addr = rsi.add(0x7f8);

    ptr(addr).writeU64(5000);
  },
});

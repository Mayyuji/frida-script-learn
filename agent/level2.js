// 第二关
// 修改值
// "Tutorial-x86_64.exe"+45D7D - 29 93 F8070000        - sub [rbx+000007F8],edx

// this.context
// {"pc":"0x100045d7d",
// "sp":"0x13fe900",
// "rax":"0x1",
// "rcx":"0x62f51c56",
// "rdx":"0x2",
// "rbx":"0x1638920",
// "rsp":"0x13fe900",
// "rbp":"0x13fea30",
// "rsi":"0x0",
// "rdi":"0x1002b9010",
// "r8":"0x9140",
// "r9":"0x100e3c",
// "r10":"0x0",
// "r11":"0x246",
// "r12":"0x1639140",
// "r13":"0x100167980",
// "r14":"0x1002b86d0",
// "r15":"0x1002b9008",
// "rip":"0x100045d7d"}

// 目标地址 01639118

const Module = Process.mainModule;

const TARGET_ADDR = Module.base.add(0x45d7d); // 偏移
Interceptor.attach(TARGET_ADDR, {
  onEnter(args) {
    // rbx 是寄存器，不能直接读值，但我们可以通过 this.context 访问

    const rbx = this.context.rbx;
    // 让sub减0 edx 是 rdx 的 32 位低位部分
    this.context.rdx = ptr(0); 
    const addr = rbx.add(0x7f8);

    ptr(addr).writeU64(1000);
  },
});

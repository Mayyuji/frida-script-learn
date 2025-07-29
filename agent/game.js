const Module = Process.mainModule;

// 第一关
// "gtutorial-x86_64.exe"+4023B - 8B 40 70              - mov eax,[rax+70]
const TARGET_1 = Module.base.add(0x4023b); // 偏移
Interceptor.attach(TARGET_1, {
  onEnter: function (args) {
    const rax = this.context.rax;
    const addr = rax.add(0x70);
    addr.writeU32(4);
  },
});

// 第二关
// "gtutorial-x86_64.exe"+42D13 - 29 50 60              - sub [rax+60],edx

// "gtutorial-x86_64.exe"+41688 - 8B 40 60              - mov eax,[rax+60]
const TARGET_2 = Module.base.add(0x41688); // 偏移

Interceptor.attach(TARGET_2, {
  onEnter: function (args) {
    const rax = this.context.rax;
    const addr = rax.add(0x60);
    addr.writeU32(999);
  },
});

// const TARGET_3 = Module.base.add(0x42d13);

// try {
// 不执行不知道为啥
//   Interceptor.attach(TARGET_3, {
//     onEnter: function (args) {
//       console.log("[*] 进入函数，打印寄存器:");
//     },
//   });
//   console.log("[*] Hook附加成功");
// } catch (e) {
//   console.log("[!] Hook附加失败:", e);
// }


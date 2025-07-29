// 第九关
// 共享代码,区分敌我
// 跳关密码 31337157

// 发现四个生命中都被以下指令修改
// 1000499ED - F3 0F11 43 08  - movss [rbx+08],xmm0

// 比较结构发现偏移 14 可用来判断敌我


const Module = Process.mainModule;

const TARGET_ADDR = Module.base.add(0x499ed); // 偏移
Interceptor.attach(TARGET_ADDR, {
  onEnter(args) {
    const rbx = this.context.rbx;
    const flag = rbx.add(0x14);
    const h = rbx.add(0x8);
    const name = rbx.add(0x19)

    const instruction = Instruction.parse(h);
    const nopCount = instruction.size;
    Memory.protect(h, nopCount, 'rwx');

    if (flag.readS8() !== 1)  { // 敌
      setTimeout(() => {
        h.writeFloat(1.0);
      });
    } else { // 我
      setTimeout(() => {
        h.writeFloat(999.0);
      });
    }
  },
});

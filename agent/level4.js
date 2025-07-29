// 第四关
// 浮点数
// 跳关密码 890124
// 100047084 - F3 0F11 8E 18080000  - movss [rsi+00000818],xmm1
// 015B9D30
// "Tutorial-x86_64.exe"+34EC40
// 100046E6C - F2 0F11 83 20080000  - movsd [rbx+00000820],xmm0
// 015B9D30
// "Tutorial-x86_64.exe"+34EC40

const Module = Process.mainModule;
console.log("Modul", JSON.stringify(Module));

const TARGET_POINTER = Module.base.add(0x34EC40); // 偏移

const baseAddress = TARGET_POINTER.readPointer()
console.log('baseAddress', baseAddress)

const TARGET_ADDRESS = baseAddress.add(0x818);
const TARGET_ADDRESS2 = baseAddress.add(0x820);

TARGET_ADDRESS.writeFloat(5000)
TARGET_ADDRESS2.writeDouble(5000)
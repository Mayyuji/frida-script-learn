// 第五关
// 修改指令
// 跳关密码 888899
// "Tutorial-x86_64.exe"+473E8 - 89 10                 - mov [rax],edx

const Module = Process.mainModule;
const TARGET = Module.base.add(0x473e8);

const instruction = Instruction.parse(TARGET);

console.log(JSON.stringify(Instruction.parse(TARGET)));

const nopCount = instruction.size;

// 读取原始字节可用来恢复
const originalBytes = TARGET.readByteArray(nopCount);

const nops = new Array(nopCount).fill(0x90);

// 修改内存权限
Memory.protect(TARGET, nopCount, 'rwx');

try {
    TARGET.writeByteArray(nops);
    console.log("内存修改成功！");
} catch (error) {
    console.log('写入失败:', error);
}

console.log(JSON.stringify(Instruction.parse(TARGET)));


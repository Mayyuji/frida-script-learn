//  1.找到地址所在模块
// const TARGET_ADDRESS = ptr("0x015C9198"); // 替换为实际的内存地址
// console.log(
//   `当前进程: ${JSON.stringify(Process.findRangeByAddress(TARGET_ADDRESS))}`
// );
// 015A8AD8 - 01550000 
// 014F9A38 - 14a0000
// 01559908 - 1500000


//  2.通过循环使用第一步找到的模块大小和base 进行匹配 摆脱内存地址的猜测
let Module = null
Process.enumerateRanges('rw-').forEach(range => {
    // 检查保护权限和大小（如果已知）
    if (range.size === 1044480) {
        if (Module === null) {
          Module = range
        } else {
          // 需根据实际判断该怎么取
          Module.base < range.base || (Module = range);
        }

    }
});
console.log('Module',JSON.stringify(Module));
const TARGET_ADDRESS = Module.base.add(0x58AD8); // 偏移等于目标地址-模块
send(TARGET_ADDRESS);

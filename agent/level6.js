// 10034EC70
// 第六关 
// 指针
// 跳关密码 098712
const Modul = Process.mainModule;
console.log("Modul", JSON.stringify(Modul));

const TARGET_POINTER = Modul.base.add(0x34ec70); // 偏移

// 读取指针的值
let POINTER_VAl = TARGET_POINTER.readU64();

// 修改地址的值
setInterval(() => {
  if (TARGET_POINTER.readU64() !== POINTER_VAl) {
    POINTER_VAl = TARGET_POINTER.readU64();
    let ADDRESS = ptr("0x" + POINTER_VAl.toString(16)) ;
    ADDRESS.writeU64(5000);
  }
}, 1000);

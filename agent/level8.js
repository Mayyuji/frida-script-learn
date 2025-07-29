// 第八关
// 多级指针
// 跳关密码 525927

//  015D2668
//  015D2650 + 18
//  015EB140 + 0
//  015EB0C0 + 18
//  01619170 + 10
// "Tutorial-x86_64.exe"+34ECA0

const Modul = Process.mainModule;

const BASE_ADDRESS = Modul.base.add(0x34eca0); // 偏移

const offectArr = [0x10, 0x18, 0x0, 0x18];

// 通过指针偏移取地址
function getPointerByOffsets(baseAddress, offsetArr) {
  let currentPtr = baseAddress.readPointer();
  for (let index = 0; index < offectArr.length; index++) {
    if (index == offectArr.length - 1) {
      return currentPtr.add(offectArr[index]);
    } else {
      currentPtr = currentPtr.add(offectArr[index]).readPointer();
    }
  }
}

const TARGET_ADDRESS = getPointerByOffsets(BASE_ADDRESS, offectArr);

// 读值
let POINTER_VAl = TARGET_ADDRESS.readU64();
console.log("TARGET_ADDRESS", TARGET_ADDRESS);
console.log("TARGET_ADDRESS", POINTER_VAl);

// 修改地址的值
setInterval(() => {
  getPointerByOffsets(BASE_ADDRESS, offectArr).writeU64(5000);
}, 1000);

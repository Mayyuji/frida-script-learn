// 定义要修改的内存地址
let TARGET_ADDRESS = null;

// 修改内存值的函数
function modifyMemory(value) {
  try {
    // 根据指针大小确定写入方式
    if (Process.pointerSize === 4) {
      TARGET_ADDRESS.writeU32(value);
      console.log(`已将地址 ${TARGET_ADDRESS} 的值修改为: ${value}`);
    } else {
      TARGET_ADDRESS.writeU64(value);
      console.log(`已将地址 ${TARGET_ADDRESS} 的值修改为: ${value}`);
    }
  } catch (e) {
    console.error(`修改内存失败: ${e}`);
  }
}

// 注册rpc函数，以便从外部调用
rpc.exports = {
  modify: function (address, value) {
    TARGET_ADDRESS = ptr(address);
    modifyMemory(value);
  },
  getCurrentValue: function () {
    try {
      if (Process.pointerSize === 4) {
        return TARGET_ADDRESS.readU32();
      } else {
        return TARGET_ADDRESS.readU64();
      }
    } catch (e) {
      console.error(`读取内存失败: ${e}`);
      return null;
    }
  },
};

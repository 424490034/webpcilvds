import { isExistFolder, readFileStr } from '../index';
/**
 * @file 解析项目下的package文件
 */
export async function parsePackage(filePath: string) {
  const packagePath = filePath + '\\package.json';
  const isHave = await isExistFolder(packagePath, undefined);
  if (isHave) {
    const packageStr = await readFileStr(packagePath);
    const dataObj = formatScript(packageStr);
    return {
      isError: false,
      data: dataObj,
    };
  } else {
    return {
      isError: true,
      data: {},
    };
  }
}
function formatScript(str: string) {
  const keyName = '"scripts"';
  try {
    let num = str.indexOf(keyName) + keyName.length;
    let str2 = str.slice(num, str.length);
    if (str2.indexOf(':') === -1) {
      return {};
    }
    let num2 = str2.indexOf(':') + 1;
    let str3 = str2.slice(num2, str2.length);
    if (str3.indexOf('},') === -1) {
      // 这里可能存在script为结尾的情况
      // 需要额外判断
      // 获取最后结尾的}位置
      let end1 = str3.lastIndexOf('}');
      let end2 = str3.slice(0, end1).lastIndexOf('}');
      // 判断后续字段中是否存在数字或英文 如果存在则代表还有数据
      // 直接抛出异常 否则正常返回
      let result = /^[A-Za-z0-9]+$/.test(str3.slice(end2+1, end1));
      if (result) {
        return {};
      } else {
        let str4 = str3.slice(0, end2+1);
        return eval(`window.customPackageScript = ${str4}`);
      }
    }
    let num3 = str2.indexOf('},');
    let str4 = str3.slice(0, num3);
    return eval(`window.customPackageScript = ${str4}`);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function 提供给node使用 返回读取字符串
 */
export async function parsePackageStr(filePath: string) {
  const packagePath = filePath + '\\package.json';
  const isHave = await isExistFolder(packagePath, undefined);
  if (isHave) {
    const packageStr = await readFileStr(packagePath);
    const dataStr = strSlice(packageStr);
    return {
      isError: false,
      data: dataStr,
    };
  } else {
    return {
      isError: true,
      data: {},
    };
  }
}
export function strSlice(str: string) {
  const keyName = '"scripts"';
  let num = str.indexOf(keyName) + keyName.length;
  let str2 = str.slice(num, str.length);
  if (str2.indexOf(':') === -1) {
    return {};
  }
  let num2 = str2.indexOf(':') + 1;
  let str3 = str2.slice(num2, str2.length);
  if (str3.indexOf('},') === -1) {
    return {};
  }
  let num3 = str2.indexOf('},');
  let str4 = str3.slice(0, num3);
  return str4;
}

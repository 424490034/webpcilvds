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
      return {};
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

import { message } from 'antd';
import { remote } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import _Model from './model';
const _store = new Store();
export const store = _store;
/**
 * @funtion 指令执行默认中转函数 窗口创建初期存在数据为响应问题 这里提前做预存
 */
export function setTerminalTransFer(data: any) {
  store.set('terminalTransfer', data);
}
export function getTerminalTransFer() {
  return store.get('terminalTransfer');
}
export function delTerminalTransFer() {
  return store.delete('terminalTransfer');
}
/**
 * @function 获取本地已保存指令集
 * @returns 返回本地保存的指令集合
 */
export function GetOrderList() {
  let downModels = store.get('orderList');
  if (Array.isArray(downModels)) {
    return downModels;
  } else {
    return [];
  }
}
/**
 * @function 设置更改后的指令集合
 * @returns 返回修改结果
 */
export function SetOrderList(list: Array<any>) {
  if (Array.isArray(list)) {
    store.set('orderList', list);
    return true;
  } else {
    return false;
  }
}
/**
 * @function 删除指定文件
 * @param path 指定需要删除的文件
 * @param callback 回调函数
 */
export async function removeFile(path: string, callback?: any) {
  await fs.unlink(path, (err: any) => {
    if (err) {
      console.error('删除异常', err);
    }
    callback && callback();
  });
}
/**
 *检查指定目录是否为空
 *
 * @param {string} [dir=process.cwd()]
 * @returns 若为空目录则返回true；反之则返回false
 */
export function isEmptyFolder(dir = process.cwd()): boolean {
  var currentDir = fs.readdirSync(dir);
  return currentDir.length === 0;
}
/**
 * @function 检查指定路径是否存在
 * @param path 判断路径是否存在
 * @param callback 回调函数
 */
export function isExistFolder(path: string, callback?: any) {
  return new Promise((resolve, reject) => {
    // fs.exists(path, function(exists) {
    //   console.log(exists ? "创建成功" : "创建失败");
    //   if (callback) {
    //     callback(exists,path)
    //   }
    // });
    //判断文件/目录是否存在
    fs.access(path, (err) => {
      if (callback) {
        callback(err, path);
      }
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
/**
 * @function 删除指定路径文件及目录
 */
export function delPath(filePath: string) {
  function deleteall(path: string) {
    var files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          deleteall(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
  deleteall(filePath);
}
/**
 * @function 创建指定路径文件夹
 */
export function mkdirSync(mkdirPath: string) {
  mkdirPath = mkdirPath.replaceAll('\\', '/');
  fs.mkdirSync(mkdirPath);
}
/**
 * @function 创建文件写入内容
 * @param filePath 需要创建的文件路径
 * @param content 需要创建的文件内容
 * @param callback 失败回调函数
 */
export function mkdirFile(filePath: string, content: any, callback: any) {
  fs.writeFile(filePath, content, function (error) {
    if (callback) {
      callback(error);
    }
  });
}
/**
 * @function 读取本地文件
 * @param filePath
 */
export function readFile(filePath: string, callback?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        if (callback) {
          callback(err);
          resolve(undefined);
        }
        return false;
      }
      resolve(data);
    });
  });
}
/**
 * @function 读取本地文件-字符串
 * @param filePath
 */
export function readFileStr(filePath: string, callback?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        if (callback) {
          callback(err);
          resolve(undefined);
        }
        return false;
      }
      resolve(data);
    });
  });
}
/**
 * @function 将指定就文件路径剪切到新路径下
 * @param oldPath 旧文件路径
 * @param newPath 新文件路径
 * @param callback 回调函数
 */
export async function transferFile(
  oldPath: string,
  newPath: string,
  callback?: any
) {
  function exists(src: string, dst: any, callback: any) {
    fs.exists(dst, function (exists) {
      // 已存在
      if (exists) {
        callback(src, dst);
      }
      // 不存在
      else {
        fs.mkdir(dst, function () {
          callback(src, dst);
        });
      }
    });
  }
  return new Promise((resolve, reject) => {
    let stat = fs.stat;
    // 读取目录中的所有文件/目录
    fs.readdir(oldPath, async function (err, paths) {
      if (err) {
        console.log('!!!!', oldPath);
        reject(false);
        throw err;
      }
      await paths.forEach(function (path) {
        var _src = oldPath + '/' + path,
          _dst = newPath + '/' + path,
          readable,
          writable;
        stat(_src, function (err, st) {
          if (err) {
            throw err;
          }
          // 判断是否为文件
          if (st.isFile()) {
            // 创建读取流
            readable = fs.createReadStream(_src);
            // 创建写入流
            writable = fs.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
          }
          // 如果是目录则递归调用自身
          else if (st.isDirectory()) {
            exists(_src, _dst, transferFile);
          }
        });
      });
      if (callback) {
        callback();
      }
      resolve(true);
    });
  });
}
// 对外提供的指令执行库方法集合
export const orderOptions = {
  GetOrderList, // 获取指令数据
  SetOrderList, // 设置指令数据
};
export let Model = _Model;
/**
 * @file 复制到粘贴板
 */
export function copyText(text: string) {
  var input = document.createElement('input');

  input.setAttribute('id', 'input_for_copyText');
  input.value = text;

  document.getElementsByTagName('body')[0].appendChild(input);
  document.getElementById('input_for_copyText').select();
  document.execCommand('copy');
  document.getElementById('input_for_copyText').remove();
  message.success('复制成功!');
}
/**
 * @function 全局消息通知
 * @param title 全局消息标题
 * @param body 全局消息内容
 * @param icon 图标
 * @param callback 回调函数
 * @param href 跳转地址
 */
export function globalMessage(
  title: string,
  body: string,
  icon: string,
  callback?: any,
  href?: string
) {
  let option = {
    title, // 通知标题
    body, // 内容
    icon, // 图标
    href, // 地址
  };

  // 创建通知并保存
  let hhwNotication = new window.Notification(option.title, option);

  // 当通知被点击时
  hhwNotication.onclick = function () {
    // TODO something...
    if (callback) {
      callback();
    } else {
      const win = remote.getCurrentWindow();
      win?.show();
    }
  };
}

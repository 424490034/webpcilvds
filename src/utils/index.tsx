import { message } from 'antd';
import { remote } from 'electron';
import Store from 'electron-store';
import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import { openTerminal } from '../config/ipc';
import { isEmpty } from 'lodash';
const _store = new Store();
export const store = _store;
/**
 * @file 快捷指令执行历史数据
 * @param data 保存的数据
 */
export function addBatchRunsOrders(data: any) {
  let ary: any = getBatchRunsOrders();
  store.set('batchRunsOrders', [...ary, data]);
}
export function getBatchRunsOrders() {
  let data: any = store.get('batchRunsOrders') || [];
  const projectData: any = getProjectData();
  // 进行项目数据比对
  let newList = data.map((item: any) => {
    if (Array.isArray(item.batchData) && item.batchData.length > 0) {
      item.batchData = item.batchData.map((batchs: any) => {
        let [newProjectData] = projectData.filter(
          (res: any) => res.id === batchs.id
        );
        if (!isEmpty(newProjectData)) {
          return {
            ...batchs,
            ...newProjectData,
            initOrderKey: batchs.initOrderKey,
            terminalKey: batchs.terminalKey,
            updateTime: +new Date(),
          };
        } else {
          console.error('数据比对异常');
          return batchs;
        }
      });
    }
    return item;
  });
  store.set('batchRunsOrders', newList);
  return newList || [];
}
export function delBatchRunsOrders(id: string) {
  let ary: any = getBatchRunsOrders();
  let newAry = ary.filter((item: any) => item.id !== id);
  store.set('batchRunsOrders', newAry);
}
/**
 * @function 修改指定id的批量执行
 * @param id 指定id
 * @param data 修改数据
 */
export function editBatchRunsOrders(id: string, data: any) {
  let ary: any = getBatchRunsOrders();
  let newAry = ary.map((item: any) => {
    if (item.id == id) {
      return {
        ...item,
        ...data,
      };
    } else {
      return item;
    }
  });
  store.set('batchRunsOrders', newAry);
}
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
 * @function 获取到对应项目的总数
 */
export function getTypeProjectNum() {
  let data: any = getProjectData();
  let nums = {
    pc: 0,
    mobile: 0,
    serve: 0,
    rest: 0,
  };
  if (data && Array.isArray(data)) {
    data.map((item: any) => {
      let type = item?.projectData?.type || item.type;
      switch (type) {
        case '1': //PC端
          nums.pc += 1;
          break;
        case '2': // 移动端
          nums.mobile += 1;
          break;
        case '3': // 服务端
          nums.serve += 1;
          break;
        case '4': // 其他
          nums.rest += 1;
          break;
        case '5': // 属于自定义指令
          nums.rest += 1;
          break;
        default:
          break;
      }
    });
  }
  return nums;
}
/**
 * @function 项目管理数据保存函数
 * @param data 对应数据
 */
export function setProjectData(data: any) {
  store.set('projectData', data);
}
/**
 * @function 项目管理数据修改函数
 * @param id 对应id
 * @param data 修改后的数据
 */
export function updateProject(id: string, data: any) {
  let oldData: any = getProjectData();
  let newData = oldData.map((item: any) => {
    if (item.id === id) {
      return {
        ...item,
        ...data,
        updateTime: +new Date(),
      };
    }
    return item;
  });
  setProjectData(newData);
}
/**
 * @function 项目管理数据移除函数
 * @param data
 */
export function removeProjectData(id: string) {
  let oldData: any = getProjectData();
  let newData = oldData.filter((item: any) => item.id != id);
  setProjectData(newData);
}
/**
 * @function 项目管理数据新增函数
 * @param data
 */
export function addProject(data: any) {
  let oldData: any = getProjectData();
  setProjectData([
    ...oldData,
    {
      ...data,
      createTime: +new Date(),
    },
  ]);
}
/**
 * @function 项目管理数据获取函数
 * @param data 对应数据
 */
export function getProjectData() {
  return store.get('projectData') || [];
}
export function delProjectData() {
  return store.delete('projectData');
}
/**
 * @function 获取本地已保存指令集
 * @returns 返回本地保存的指令集合
 */
export function GetOrderList() {
  let downModels = store.get('projectData');
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
    store.set('projectData', list);
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
/**
 * @function 获取安装所用指令名称
 * @todo 判断用户选择然后返回对应名称 支持 yarn npm cnpm
 */
export function getInstallName() {
  // 默认使用npm
  return 'yarn';
}
/**
 * @function 唯一值id获取
 * @param length 指定的id长度
 * @returns 生成的id
 */
export function genID(length: number) {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
}

/**
 * @function 根据相关参数也可不传创建终端窗口
 */
export async function createTerminal(options: any = {}, callback?: Function) {
  function show() {
    if (callback) {
      callback();
    }
    ipcRenderer?.removeListener('terminal-ok', show);
  }
  ipcRenderer?.on('terminal-ok', show);
  if (options) {
    let config = {
      ...options,
    };
    openTerminal(options, config);
  } else {
    openTerminal(options);
  }
}

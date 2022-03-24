const path = require('path');
import { message } from 'antd';
import { parsePackage, executeOrder } from '../xlOrder';
import { isExistFolder } from '../index';
/**
 * @file git相关操作函数
 * @param gitPath 需要转化的git地址
 * @returns git仓库名称
 */
export function getGitName(gitPath: string) {
  let nameLength = gitPath.lastIndexOf('/');
  let gitLength = gitPath.indexOf('.git');
  return gitPath.slice(nameLength + 1, gitLength);
}
/**
 * @function 获取指定项目的package的数据
 * @param projectPath 对应项目路径
 * @return package数据
 */
export async function getPackage(projectPath: string) {
  let isHave = await isExistFolder(path.resolve(projectPath, 'package.json'));
  if (isHave) {
    const { isError, data } = await parsePackage(projectPath);
    if (isError) {
      message.error('package.json数据获取失败,请排查');
      return {};
    }
    return data;
  } else {
    message.error('未查询到对应项目的package.json,请排查');
    return {};
  }
}
/**
 * @function 获取指定项目路径的git数据
 * @todo 解析目前为一个试行版本 后续问题多排查
 * @param projectPath 指定项目路径
 * @param callback 指令执行完成后的回调
 * @returns 当前项目全部分支数据
 */
export function getGitBranch(projectPath: string, callback: any) {
  executeOrder(
    `git分支获取`,
    'git branch -a',
    (data: any) => {
      if (data.indexOf('子进程') !== -1) {
        if (data.indexOf('运行失败') !== -1) {
          message.error('git分支情况获取失败请排查');
          return [];
        }
      } else {
        if (data.indexOf('master') == -1) {
          callback([]);
        }
        try {
          let strAry = formatGitList(data);
          callback(strAry);
        } catch (e) {
          message.error('分支数据转换异常,请排查');
        }
      }
    },
    projectPath
  );
}
/**
 * @function 转换git命令获取到的所有分支并返回数组
 * @param data 当前项目的所有git分支
 */
function formatGitList(data: string) {
  let str = data.split('').map((item: string) => {
    if (item === ' ') {
      return '烎';
    }
    if (item === '↵') {
      return '烎';
    }
    if (item === '*') {
      return '烎';
    }
    return item;
  });
  let formatAry = str.join('').split('烎');
  let appointIndex = formatAry.indexOf('->');
  formatAry = formatAry.filter((cstr: string, index: number) => {
    if (
      index === appointIndex ||
      index === appointIndex - 1 ||
      index === appointIndex + 1
    ) {
      return false;
    } else {
      return !!cstr.length;
    }
  });
  let strAry = formatAry.map((item: string) => {
    let results = item.split('').map((res: string) => {
      if (res === '烎') {
        return '';
      }
      if (res === '\n') {
        return '';
      }
      return res;
    });
    let endResult = results.join('');
    return endResult;
  });
  return strAry;
}
/**
 * @function 获取指定项目的当前分支
 * @param projectPath 指定项目路径
 */
export function getNowGitBranch(projectPath: string, callback: any) {
  executeOrder(
    `git分支获取`,
    'git rev-parse --abbrev-ref HEAD',
    (data: any) => {
      if (data.indexOf('子进程') !== -1) {
        if (data.indexOf('运行失败') !== -1) {
          message.error('git分支情况获取失败请排查');
          return [];
        }
      } else {
        callback(data);
      }
    },
    projectPath
  );
}

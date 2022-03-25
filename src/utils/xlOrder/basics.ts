import { cmdMap } from './config';
import semver from 'semver';
import { message } from 'antd';
import { execSh, execPromise, execPathSh, execPromisePathStr } from './execsh';
const kill = require('tree-kill');
/**
 * @file 基础
 */
let isOk = false;
/**
 * @function 版本校验-默认函数
 */
async function xlorderRun() {
  execPromise([
    { cmd: 'node -v', log: '>未检测到node，请安装node>=10！', tag: 'node' },
    { cmd: 'npm -v', log: '>未检测到npm，请安装npm>=6！', tag: 'npm' },
    // { cmd: 'test', log: '>未检测到test，请安装较新版本的test！' },
  ]).then(async (outs: any = []) => {
    /**
     * @function outs 这里返回的参数参考以下
     *  [ // 主要返回的是对应npm node的版本
     *      { success: true, out: 'v14.0.0\r\n', tag: 'node' },
     *      { success: true, out: '6.14.4\n', tag: 'npm' }
     *  ]
     */
    const logs = outs.reduce((acc: any, cur: any) => {
      const { success, tag, out } = cur;
      const version = cmdMap[tag];
      if (success && semver.satisfies(out, `< ${version}`)) {
        acc.push(`${tag}版本应该>=${version},请更新后重新运行！`);
      }
      return acc;
    }, []);
    if (outs.some((item: any) => !item.success)) {
      if (logs.length > 0) {
        let strs = logs.join(';');
        message.error(strs);
      }
    } else {
      isOk = true;
    }
  });
}
/**
 * .@function 指令执行函数
 * @param orderName 指令名称
 * @param commands 指令队列
 * @param path 指令路径
 */
async function executeOrder(
  orderName: string,
  commands: string,
  outputStr: any,
  path?: string
) {
  let pathStr = path || '';
  let child: any = undefined;
  if (commands) {
    if (commands.indexOf('&&') === -1) {
      // 单一语句
      // 如果存在路径 调用专用方法
      if (pathStr) {
        pathStr = pathStr.replace(':/', ':');
        child = await execPathSh(
          commands,
          orderName + '执行失败',
          pathStr,
          { stdio: 'pipe' },
          () => {
            outputStr(`Error:${orderName}-${commands}执行终止`, child);
          }
        );
      } else {
        child = await execSh(commands, orderName + '执行失败', () => {
          outputStr(`Error:${orderName}-${commands}执行终止`, child);
        });
      }
      if (child) {
        let isEnd:any = false
        child?.stdout?.on('data', (data: any) => {
          isEnd= isOkEnd(child,data && data.toString());
          outputStr(data && data.toString(), child);
        });
        child?.stdout?.on('message', (data: any) => {
          console.log(data);
        });
        child?.stderr?.on('data', (data: any) => {
          outputStr(data && data.toString(), child);
        });
        // 子进程关闭事件 保存信息 更新状态
        child.on('close', (code: any) => {
          if (isEnd) {
            outputStr(
              `子进程退出，退出码 0, 运行成功`,
              child,
              true
            );
            return
          }
          outputStr(
            `子进程退出，退出码 ${code}, 运行${code === 0 ? '成功' : '失败'}`,
            child,
            true
          );
        });
        // 子进程关闭事件 保存信息 更新状态
        child.on('message', (code: any) => {
          console.log(code);
          
          // outputStr(
          //   `子进程退出，退出码 ${code}, 运行${code === 0 ? '成功' : '失败'}`,
          //   child,
          //   true
          // );
        });
      }
    } else {
      // 多重语句
      let works = commands.split('&&');
      let cmds = works.map((data) => {
        return {
          cmd: data,
          log: '执行' + data + '终止',
          tag: orderName,
        };
      });
      if (path) {
        pathStr = path.replace(':/', ':');
        await execPromisePathStr(
          outputStr,
          cmds,
          async (out: any, cmd: any) => {},
          pathStr
        );
      } else {
        execPromise(
          cmds,
          async (out: any, cmd: any) => {},
          { stdio: 'pipe' },
          outputStr
        );
      }
    }
  } else {
    message.error('指令丢失');
  }
  return child;
}
// 额外判断 
function isOkEnd(child: any, data: string) {
  if (data.indexOf('success Saved lockfile.')!==-1) {
    // 5s后杀死进程
    setTimeout(() => {
      kill(child.pid, 'SIGKILL');
    }, 5000);
    return true
  } else if (data.indexOf('npm audit fix') !== -1 && data.indexOf('npm audit') !== -1 && data.indexOf('for details') !== -1) {
        // 5s后杀死进程
        setTimeout(() => {
          kill(child.pid, 'SIGKILL');
        }, 5000);
    return true
  } else {
    return false
  }
}
export { xlorderRun, executeOrder };

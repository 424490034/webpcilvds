import execsh from 'exec-sh';
import { message } from 'antd';
const { promise: execShPromise } = execsh;

/**
 * execsh执行单条指令，允许传入自定义回调
 * @param {string} command 需要执行的语句
 * @param {string} errlog 执行错误提示语句
 * @param {(error:{code: number, stderr: string, stdout: string})=> void} callBack 错误时回调函数
 */
function execSh(
  command: string,
  errlog: string,
  callBack: any,
  isShowOut: any = { stdio: 'pipe' }
) {
  // 执行指定命令并隐藏命令输出，若存在指定回调，则执行回调函数；反之则执行默认操作
  return execsh(command, isShowOut, (err: any) => {
    if (err && callBack) {
      callBack(err);
    } else if (err && err.code && err.code !== 0) {
      message.error(errlog || err.code);
    }
  });
}

/**
 * execsh promise 执行，用于多命令同时执行，允许传入自定义回调
 * @param {Array<{cmd: string, log: string}>} commands 需要执行的语句
 * @param {({stderr: string, stdout: string})=> void} callBack
 */
async function execPromise(
  commands: any[],
  callBack: any,
  isShowOut: any = { stdio: 'pipe' },
  outputStr: any
) {
  if (Array.isArray(commands)) {
    return Promise.all(
      commands.map(async (command) => {
        const { cmd, log, tag } = command;
        try {
          /**
           * out = { stderr: '', stdout: '' }
           * stderr 指令执行的错误信息
           * stdout 指令执行成功后的输出
           */
          const out = await execShPromise(cmd, isShowOut || true);
          if (outputStr) {
            outputStr(out.stdout, out, command);
            if (out?.stdout?.on) {
              out?.stdout?.on('data', (data: any) => {
                outputStr(data && data.toString(), out);
              });
              out?.stderr?.on('data', (data: any) => {
                outputStr(data && data.toString(), out);
              });
              // 子进程关闭事件 保存信息 更新状态
              out?.on('close', (code: any) => {
                outputStr(
                  `子进程退出，退出码 ${code}, 运行${
                    code === 0 ? '成功' : '失败'
                  }`,
                  out,
                  true
                );
              });
            }
          }
          if (callBack) {
            callBack(out, cmd);
          }
          return {
            success: true,
            out: out.stdout,
            tag,
          };
        } catch (error) {
          /**
           * error = { code: 1, stderr: '', stdout: '' }
           * code 错误码
           * stderr 指令执行的错误信息
           * stdout 指令执行成功后的输出
           */
          // 输出指令执行的默认错误
          // 输出指令指定的log
          console.log(`Error:${error}`);
          return {
            success: false,
            out: error,
            tag,
          };
        }
      })
    );
  }
}

/**
 * execsh执行指定路径单条指令，允许传入自定义回调
 * @param {string} command 需要执行的语句
 * @param {string} errlog 执行错误提示语句
 * @param {(error:{code: number, stderr: string, stdout: string})=> void} callBack 错误时回调函数
 */
function execPathSh(
  command: string,
  errlog: string,
  pathStr: string,
  isShowOut: any = { stdio: 'pipe' },
  callBack?: any
) {
  // 执行指定命令并隐藏命令输出，若存在指定回调，则执行回调函数；反之则执行默认操作
  return execsh(
    command,
    { cwd: pathStr, ...isShowOut },
    (err: any, stdout: any, stderr: any) => {
      if (err && callBack) {
        callBack(err);
      } else if (err && err.code && err.code !== 0) {
        message.error(errlog || err.code);
      }
    }
  );
}

/**
 * execsh promise 执行，用于多命令同时执行，允许传入自定义回调
 * @param {Array<{cmd: string, log: string}>} commands 需要执行的语句
 * @param {({stderr: string, stdout: string})=> void} callBack
 */
async function execPromisePathStr(
  outputStr: any,
  commands: any[],
  callBack: any,
  pathStr: string,
  isShowOut: any = { stdio: 'pipe' }
) {
  if (Array.isArray(commands)) {
    return Promise.all(
      commands.map(async (command) => {
        const { cmd, log, tag } = command;
        try {
          /**
           * out = { stderr: '', stdout: '' }
           * stderr 指令执行的错误信息
           * stdout 指令执行成功后的输出
           */
          const out: any = await execShPromise(cmd, {
            cwd: pathStr,
            ...isShowOut,
          });
          if (outputStr) {
            outputStr(out.stdout, out);
            if (out?.stdout?.on) {
              out?.stdout?.on('data', (data: any) => {
                outputStr(data && data.toString(), out);
              });
              out?.stderr?.on('data', (data: any) => {
                outputStr(data && data.toString(), out);
              });
              // 子进程关闭事件 保存信息 更新状态
              out?.on('close', (code: any) => {
                outputStr(
                  `子进程退出，退出码 ${code}, 运行${
                    code === 0 ? '成功' : '失败'
                  }`,
                  out,
                  true
                );
              });
            }
          }
          if (callBack) {
            callBack(out, cmd);
          }
          return {
            success: true,
            out: out.stdout,
            tag,
          };
        } catch (error) {
          /**
           * error = { code: 1, stderr: '', stdout: '' }
           * code 错误码
           * stderr 指令执行的错误信息
           * stdout 指令执行成功后的输出
           */
          // 输出指令执行的默认错误
          // 输出指令指定的log
          message.error(`Exit code:${error}`);
          return {
            success: false,
            out: error,
            tag,
          };
        }
      })
    );
  }
}

export { execPromise, execSh, execPathSh, execPromisePathStr };

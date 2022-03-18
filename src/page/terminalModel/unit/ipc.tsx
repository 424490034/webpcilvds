import { sendTerminalMessage } from 'config/ipc';
/**
 * @function 通知主窗口 模板异常关闭
 */
export function errorCloseFormDesigner() {
  sendTerminalMessage({
    message: '关闭',
    winStatus: 'error',
  });
}
/**
 * @function 通知主窗口 数据已配置完成
 * @param configPath 新建的表单指定地址
 */
export function successCloseFormDesigner(configPath: string) {
  sendTerminalMessage({
    message: '关闭',
    winStatus: 'ok',
    configPath,
  });
}
/**
 * @function 通知窗口已存在,
 */
export function windowHave(ids: any) {
  sendTerminalMessage({
    message: '窗口已连接',
    terminalIds: ids,
  });
}

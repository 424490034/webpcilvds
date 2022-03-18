import { registerDownloadService } from './download';
// 主进程
const ipcMain = require('electron').ipcMain;
// 渲染进程中(web page).
const ipcRenderer = require('electron').ipcRenderer;
// 需要用到的逻辑
import {
  create_terminal_window,
  closeTerminalWindow,
  sendToTerminalWindow,
} from './window';

/**
 * 添加 ipc 调用监听事件
 * @param eventName - ipc 事件名
 * @param callback - 回调函数
 */
export const ipcRendererListener = (
  eventName: any,
  callback: (event: any, ...args: any[]) => void
): void => {
  ipcRenderer.on(eventName, (event: any, ...args: any[]) => {
    callback(event, ...args);
  });
};
/**
 * 主窗口添加 ipc 调用的处理事件
 * @param eventName - ipc 事件名
 * @param listener - 回调事件
 */
export const ipcMainHandle = <T>(
  eventName: any,
  listener: (event: any, ...args: any[]) => Promise<T> | void | T
): void => {
  ipcMain.handle(eventName, async (event: any, ...args: any[]) => {
    return listener(event, ...args);
  });
};
export function initIpcListen(mainWindow: any) {
  registerDownloadService(mainWindow);
  // 主进程通信案例
  ipcMainHandle('asynchronous-message', function (event: any, arg: any) {
    console.log(arg); // prints "ping"
    // event.sender.send('asynchronous-reply', 'pong');
  });
  ipcMainHandle('synchronous-message', function (event: any, arg: any) {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
  });
  // 监听是否需要给主窗口指定频段发送信息
  ipcMainHandle('send-tempalte-form', (event: any, arg: any) => {
    mainWindow.webContents.send('send-tempalte-form', arg);
  });
  // 监听是否需要销毁终端窗口
  ipcMainHandle('close-terminal', () => {
    closeTerminalWindow();
  });
  // 监听是否需要给终端窗口发送消息
  ipcMainHandle('send-terminal', (event: any, arg: any) => {
    sendToTerminalWindow(arg);
  });
  // 监听是否需要创建终端窗口
  ipcMainHandle('terminal-window', (event: any, src, config?: any) => {
    create_terminal_window(mainWindow, src, config);
  });
  // 监听是否需要给主窗口指定频段发送信息
  // 主渲染进程接收回执使用
  ipcMainHandle('send-terminal-message', (event: any, arg: any) => {
    mainWindow.webContents.send('send-terminal-message', arg);
  });
}

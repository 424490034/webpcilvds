/**
 * @file 该文件为渲染进程通信用统一文件
 */
import { ipcRenderer, IpcRendererEvent, remote } from 'electron';
/**
 * 子窗口调用 ipc 的处理事件
 * @param eventName - ipc 事件名
 * @param args - 参数
 * @returns `Promise<any>`
 */
const ipcRendererInvoke = <T>(eventName: any, ...args: any[]): Promise<T> =>
  ipcRenderer.invoke(eventName, ...args);
/**
 * 添加 ipc 调用监听事件
 * @param eventName - ipc 事件名
 * @param callback - 回调函数
 */
export const ipcListener = (
  eventName: any,
  callback: (event: IpcRendererEvent, ...args: any[]) => void
): void => {
  ipcRenderer.on(eventName, (event, ...args: any[]) => {
    callback(event, ...args);
  });
};
/**
 * 打开桌面窗口
 */
export const openDesktop = (item: any): Promise<boolean> =>
  ipcRendererInvoke<boolean>('desktop-window', item);
/**
 * @function 给主窗口的指定终端窗口频段发送信息
 */
 export const sendTerminalMessage = (item: any): Promise<boolean> =>
   ipcRendererInvoke<boolean>('send-terminal-message', item);
 /**
 * @function 给主窗口的指定频段发送信息
 */
export const sendTemplateForm = (item: any): Promise<boolean> =>
ipcRendererInvoke<boolean>('send-tempalte-form', item);
   /**
 * @function 打开终端窗口
 * @param item 选中模型参数
 */
export const openTerminal = (src: any, config?: any): Promise<boolean> =>
  ipcRendererInvoke<boolean>('terminal-window', src, config);
/**
 * @function 给终端窗口发信息
 */
 export const sendTerminal = (item: any): Promise<boolean> =>
 ipcRendererInvoke<boolean>('send-terminal', item);
/**
* @function 关闭终端窗口
*/
export const closeTerminal = (): Promise<boolean> =>
 ipcRendererInvoke<boolean>('close-terminal');
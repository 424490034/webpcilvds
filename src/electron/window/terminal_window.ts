import { app, BrowserWindow, shell, screen } from 'electron';
import { terminal_model } from '../config';
import path from 'path';
import { setTerminalTransFer } from '../../utils';
var terminal: any;
export default function create_terminal_window(
  mainWindow: any,
  src: any,
  config?: any
) {
  let dea: any;
  if (config) {
    dea = config;
  } else {
    dea = {};
  }

  return new Promise((reject, resolve) => {
    if (terminal) {
      sendToTerminalWindow(src);
      terminal.show();
      // 回应创建成功
      mainWindow.webContents.send('terminal-ok');
    } else {
      if (src) {
        setTerminalTransFer(src);
      }
      terminal = new BrowserWindow({
        parent: mainWindow, // win是主窗口
        ...terminal_model,
        ...dea,
      });
      if (process.env.NODE_ENV === 'development') {
        let filePath = path.join(__dirname, '../../form_designer.html');
        terminal.loadURL(`file://${filePath}#/terminal_Model`);
      } else {
        terminal
          .loadURL(`file://${__dirname}/form_designer.html#/terminal_Model`)
          .catch((err) => {
            console.log(err);
          });
      }
      //重点在下面这行，开启调试
      terminal.webContents.openDevTools();
      terminal.on('closed', () => {
        terminal = null;
      });
      terminal.once('ready-to-show', () => {
        reject(terminal);
        if (src) {
          setTerminalTransFer(src);
        }
        // 回应创建成功
        mainWindow.webContents.send('terminal-ok');
      });
    }
  });
}

export function closeTerminalWindow() {
  if (terminal) {
    terminal.close();
    terminal = null;
  }
}

export function sendToTerminalWindow(arg: any) {
  if (terminal) {
    // 向其他窗口进行指定通信
    terminal.webContents.send('terminal-model', arg);
  }
}
// 用于底部右键菜单换新
export function showTerminalWindow() {
  if (terminal) {
    terminal.show();
  }
}

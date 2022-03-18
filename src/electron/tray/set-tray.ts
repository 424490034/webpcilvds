import { Menu, Tray, BrowserWindow, dialog, app } from 'electron';
import { showTerminalWindow } from '../window/index';
import path from 'path';

let tray = null;
let winConfig = {
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true, //打开remote模块
    devTools: false,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    contextIsolation: false,
  },
};
export const setTray = (mainWindow: any) => {
  if (process.env.NODE_ENV === 'development') {
    //生成环境
    tray = new Tray(path.join(__dirname, '../../../assets/favicon.ico'));
  } else {
    //研发环境
    let file = __dirname.replace('app.asar', '');
    tray = new Tray(path.join(file, './assets/favicon.ico'));
  }
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
  // tray = new Tray(path.join(__dirname, '../resources/tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      type: 'checkbox',
      label: '    开机启动',
      checked: app.getLoginItemSettings().openAtLogin,
      click: function () {
        if (!app.isPackaged) {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
            path: process.execPath,
          });
        } else {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
          });
        }
        console.log(app.getLoginItemSettings().openAtLogin);
        console.log(!app.isPackaged);
      },
    },
    {
      label: '    休息一下     ',

      submenu: [
        {
          label: '打开哔哩哔哩',
          click: () => {
            const win = new BrowserWindow(winConfig);
            win.setMenu(null);
            win.loadURL('https://www.bilibili.com/');
          },
        },
        {
          label: '打开百度',
          click: () => {
            const win = new BrowserWindow(winConfig);
            win.setMenu(null);
            win.loadURL('https://www.baidu.com/');
          },
        },
        {
          label: '打开996后台',
          click: () => {
            const win = new BrowserWindow(winConfig);
            win.setMenu(null);
            win.loadURL('https://www.996day.com/');
          },
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      label: '    窗口',
      submenu: [
        {
          label: '显示主窗口',
          click: () => {
            mainWindow.show();
            // // 调用了dialog（弹窗模块），演示效果
            // dialog.showMessageBoxSync({
            //   type: 'info',
            //   title: '提示',
            //   message: '点击了子菜单',
            // });
          },
        },
        {
          label: '唤醒指令执行窗口',
          click: () => {
            showTerminalWindow();
          },
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      label: '    退出',
      click: () => {
        app.quit();
      },
    },
    // {
    //   label: 'app', // macOS下第一个标签是应用程序名字，此处设置无效
    //   submenu: [
    //     {
    //       label: '退出',
    //       click: () => {
    //         app.quit();
    //       },
    //     },
    //     {
    //       label: '关于',
    //       click: () => {
    //         app.showAboutPanel();
    //       },
    //     },
    //   ],
    // },
  ]);
  tray.setToolTip('休闲平台');
  tray.setContextMenu(contextMenu);
  Menu.setApplicationMenu(contextMenu);
};

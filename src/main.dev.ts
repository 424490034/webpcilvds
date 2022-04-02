/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
 import 'core-js/stable';
 import 'regenerator-runtime/runtime';
 import path from 'path';
 import { app, BrowserWindow, shell, protocol } from 'electron';
 import { autoUpdater } from 'electron-updater';
 import log from 'electron-log';
 import MenuBuilder from './menu';
 import { main } from './electron/config';
 import { initIpcListen } from './electron/ipcListen';
 import { setTray } from './electron/tray/set-tray';
 import { store } from './utils';
 import { openServe } from './utils/serveUtil';
 if (process.platform == 'win32') {
   if (app.requestSingleInstanceLock()) {
     // 判断是否自由一个实例
     app.on('second-instance', (event, commandLine, workingDirectory) => {
       let allWin = BrowserWindow.getAllWindows();
       allWin.map((win) => {
         win.setSize(1500,800)
         win.show();
       });
     });
   } else {
     // 关闭当前新创建的实例
     app.quit();
   }
 }
 if (process.platform == 'linux' || process.platform == 'darwin') {
   app.on('activate', () => {
     let allWin = BrowserWindow.getAllWindows();
     if (allWin.length === 0) {
       createWindow();
     } else {
       allWin.map((win) => {
         win.setSize(1500,800)
         win.show();
       });
     }
   });
 }
 
 export default class AppUpdater {
   constructor() {
     log.transports.file.level = 'info';
     autoUpdater.logger = log;
     autoUpdater.checkForUpdatesAndNotify();
     //是否自动下载更新，设置为false时将通过api触发更新下载
     autoUpdater.autoDownload = false;
   }
 }
 
 let mainWindow: BrowserWindow | null = null;
 
 if (process.env.NODE_ENV === 'production') {
   const sourceMapSupport = require('source-map-support');
   sourceMapSupport.install();
 }
 
 if (
   process.env.NODE_ENV === 'development' ||
   process.env.DEBUG_PROD === 'true'
 ) {
   require('electron-debug')();
 }
 
 const installExtensions = async () => {
   const installer = require('electron-devtools-installer');
   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
   const extensions = ['REACT_DEVELOPER_TOOLS'];
 
   return installer
     .default(
       extensions.map((name) => installer[name]),
       forceDownload
     )
     .catch(console.log);
 };
 
 const createWindow = async () => {
   if (
     process.env.NODE_ENV === 'development' ||
     process.env.DEBUG_PROD === 'true'
   ) {
     await installExtensions();
   }
 
   const RESOURCES_PATH = app.isPackaged
     ? path.join(process.resourcesPath, 'assets')
     : path.join(__dirname, '../assets');
 
   const getAssetPath = (...paths: string[]): string => {
     return path.join(RESOURCES_PATH, ...paths);
   };
 
   mainWindow = new BrowserWindow({
     show: false,
     height: 728,
     icon: getAssetPath('icon.png'),
     ...main,
   });
   mainWindow.loadURL(`file://${__dirname}/index.html`);
   // 进行监听注册
   initIpcListen(mainWindow);
   // 进行托盘注册
   setTray(mainWindow);
   // @TODO: Use 'ready-to-show' event
   //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
   mainWindow.webContents.on('did-finish-load', () => {
     if (!mainWindow) {
       throw new Error('"mainWindow" is not defined');
     }
     if (process.env.START_MINIMIZED) {
       mainWindow.minimize();
     } else {
       mainWindow.show();
       mainWindow.focus();
     }
   });
   mainWindow.once('ready-to-show', () => {
     // 进行窗口数据处理
     let displays = require('electron').screen.getAllDisplays();
     store.set('displays', displays); // 缓存获得的所有参数
     if (Array.isArray(displays) && displays.length > 0) {
       // 窗口创建成功 开启服务器
       // 开启后台服务端程序
       openServe(mainWindow);
     }
     // 　　let externalDisplay = displays.find((display) => { // 这里进行屏幕的x轴查询 查询副屏
     //     　　return display.bounds.x !== 0 || display.bounds.y !== 0
     // 　　})
     // if (externalDisplay) {
     //   new BrowserWindow({
     //     x: externalDisplay.bounds.x + 50,
     //     y: externalDisplay.bounds.y + 50
     //   });
     // }
     // //===========自定义file:///协议的解析=======================
     // protocol.interceptFileProtocol('file', (req, callback) => {
     //   if (req.url.indexOf('index.html#') !== -1) {
     //     protocol.uninterceptProtocol('file');
     //     return true;
     //   }
     //   let templatePath: any = store.get('modelFile');
     //   let newUrl = req.url.replaceAll('/', '\\');
     //   if (newUrl.indexOf(templatePath) !== -1) {
     //     let url = req.url.substr(8);
     //     callback(decodeURI(url));
     //   } else {
     //     protocol.uninterceptProtocol('file');
     //     return true;
     //   }
     // });
     mainWindow?.show();
   });
   mainWindow.on('closed', () => {
     mainWindow = null;
   });
 
   const menuBuilder = new MenuBuilder(mainWindow);
   menuBuilder.buildMenu();
 
   // Open urls in the user's browser
   mainWindow.webContents.on('new-window', (event, url) => {
     event.preventDefault();
     shell.openExternal(url);
   });
 
   // Remove this if your app does not use auto updates
   // eslint-disable-next-line
   new AppUpdater();
 };
 
 /**
  * Add event listeners...
  */
 
 app.on('window-all-closed', () => {
   // Respect the OSX convention of having the application in memory even
   // after all windows have been closed
   if (process.platform !== 'darwin') {
     app.quit();
   }
 });
 
 app.whenReady().then(createWindow).catch(console.log);
 
 app.on('activate', () => {
   // On macOS it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (mainWindow === null) createWindow();
 });
 
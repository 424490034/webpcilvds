const main = {
  width: 1500,
  height: 800,
  // frame: process.env.NODE_ENV === 'development', // 模型自带顶部取消
  // transparent: !(process.env.NODE_ENV === 'development'), // 背景色取消
  transparent: true, // 背景色取消
  frame: false, // 模型自带顶部取消
  maximizable: false,
  skipTaskbar: true,
  resizable: false, //禁止改变主窗口尺寸
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true, //打开remote模块
    devTools: true,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    contextIsolation: false,
  },
};
const terminal_model = {
  width: 1400,
  height: 900,
  // transparent: true, // 背景色取消
  frame: false, // 模型自带顶部取消
  // maximizable: false,
  // skipTaskbar: true,
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true, //打开remote模块
    devTools: process.env.NODE_ENV === 'development',
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    contextIsolation: false,
  },
};
export {
  terminal_model,
  main,
};

const main = {
  width: 1500,
  height: 800,
  // frame: process.env.NODE_ENV === 'development', // 模型自带顶部取消
  // transparent: !(process.env.NODE_ENV === 'development'), // 背景色取消
  transparent: true, // 背景色取消
  frame: false, // 模型自带顶部取消
  maximizable: false,
  skipTaskbar: true,
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true, //打开remote模块
    devTools: true,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    contextIsolation: false,
  },
};
const desktop = {
  multiple: false,
  title: 'desktop',
  //   opacity: 0, //初始透明值
  // transparent: true, //窗口透明
  // frame: false, //是否显示边缘框
  //   fullscreen: true, //是否全屏显示
  //   maximizable: false,
  webPreferences: {
    nodeIntegration: true, //赋予此窗口页面中的JavaScript访问Node.js环境的能力
    enableRemoteModule: true, //打开remote模块
    webSecurity: false, //可以使用本地资源
    devTools: process.env.NODE_ENV === 'development',
    nodeIntegrationInWorker: true,
    contextIsolation: false,
  },
};
const live2d_model = {
  multiple: false,
  title: 'live2d',
  isNoCenter: true, // 取消默认居中 定制变量
  transparent: true, // 背景色取消
  frame: false, // 模型自带顶部取消
  webPreferences: {
    webSecurity: false,
    devTools: false,
    contextIsolation: false,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    enableRemoteModule: true,
  },
};
const live3d_model = {
  multiple: false,
  title: 'live3d',
  isMax: true, // 默认最大化窗口 定制变量
  isNoCenter: true, // 取消默认居中 定制变量
  frame: false, // 模型自带顶部取消
  transparent: true, // 背景色取消
  webPreferences: {
    webSecurity: false,
    devTools: false,
    contextIsolation: false,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    enableRemoteModule: true,
  },
};
const form_designer = {
  width: 1400,
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
  desktop,
  live2d_model,
  live3d_model,
  form_designer,
};

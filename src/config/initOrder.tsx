/**
 * @file 常规指令
 */
export const initOrders = [
  {
    label: 'vscode 打开',
    value: 'code .',
    terminalKey: 'orderOpenVSCode', // 在终端执行平台的识别key
    desc: '运行该命令请确保vsCode正确安装',
  },
  {
    label: 'smartGit 打开',
    value: 'smartgit .',
    terminalKey: 'orderOpenSmartGit', // 在终端执行平台的识别key
    desc: '运行该命令请确保smartGit正确安装',
  },
  {
    label: 'powerShell打开',
    value: 'start powershell',
    terminalKey: 'orderOpenPowerShell', // 在终端执行平台的识别key
    desc: '基于项目路径打开powershell',
  },
  {
    label: 'cmd打开',
    value: 'start cmd',
    terminalKey: 'orderOpenCmd', // 在终端执行平台的识别key
    desc: '基于项目路径打开cmd',
  },
  {
    label: '资源管理器打开',
    value: 'custom1',
    terminalKey: 'orderOpenExplorer', // 在终端执行平台的识别key
    desc: '打开对应路径窗口',
  },
];
// 通过terminalKey 获取label
function formatObj() {
  let obj: any = {};
  initOrders.map((item: any) => {
    obj[item.terminalKey] = item.label;
  });
  return obj;
}
export const initOrderLabels = formatObj();

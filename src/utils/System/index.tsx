/**
 * @file 系统信息和cpu等信息获取
 */
import os from 'os';
import child_process from 'child_process';
function dealTime(seconds: any) {
  seconds = seconds | 0;
  let day: any = (seconds / (3600 * 24)) | 0;
  let hours: any = ((seconds - day * 3600) / 3600) | 0;
  let minutes: any = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0;
  let second: any = seconds % 60;
  day < 10 && (day = '0' + day);
  hours < 10 && (hours = '0' + hours);
  minutes < 10 && (minutes = '0' + minutes);
  second < 10 && (second = '0' + second);
  return [day, hours, minutes, second].join(':');
}
function dealMem(data: any) {
  let G: any = 0,
    M: any = 0,
    KB: any = 0;
  data > 1 << 30 && (G = (data / (1 << 30)).toFixed(2));
  data > 1 << 20 && data < 1 << 30 && (M = (data / (1 << 20)).toFixed(2));
  data > 1 << 10 && data > 1 << 20 && (KB = (data / (1 << 10)).toFixed(2));
  return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : data + 'B';
}
/**
 * @function 系统信息获取函数
 * @param text 需要换取的数据 不传为全部
 */
export default function GetSystemConfig(text?: string) {
  text = text ? text.toLocaleLowerCase() : undefined;
  switch (text) {
    case 'cpu':
      //cpu架构
      return os.arch();
    case 'os':
      // 操作系统内核
      return os.type();
    case 'esp':
      // 操作系统平台
      return os.platform();
    case 'uptime':
      // 开机时间
      const uptime = os.uptime();
      return dealTime(uptime);
    case 'hostName':
      // 主机名
      return os.hostname();
    case 'hdir':
      // 主目录
      return os.homedir();
    case 'ram':
      // 内存
      return {
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
      };
    case 'cpuInfo':
      // cpu基础信息
      const info = os.cpus();
      const cpuData = info.map((cpu, idx, arr) => {
        let item: any = { ...cpu };
        let times = cpu.times;
        item['idx'] = idx;
        item['model'] = cpu.model;
        item['mhz'] = `${cpu.speed}MHz`;
        item['rate'] = `${(
          (1 -
            times.idle /
              (times.idle + times.user + times.nice + times.sys + times.irq)) *
          100
        ).toFixed(2)}%`;
        return item;
      });
      return cpuData;
    case 'newwork':
      // 网卡
      const networks = os.networkInterfaces();
      //   let wordData:any = {};
      //   for(let nw in networks){
      //     let objArr:any = networks[nw];
      //   wordData[nw] = objArr.map((obj: any, idx: any, arr: any) => {
      //     console.log(`地址：${obj.address}`);
      //     console.log(`掩码：${obj.netmask}`);
      //     console.log(`物理地址：${obj.mac}`);
      //     console.log(`协议族：${obj.family}`);
      // });
      // }
      return networks;
    case 'winver':
      return child_process.execSync('ver').toString().trim();
    case 'release':
      return os.release();
    case 'load':
      return os.loadavg();
    default:
      // cpu基础信息
      const allinfo = os.cpus();
      const cpuAllData = allinfo.map((cpu, idx, arr) => {
        let item: any = { ...cpu };
        let times = cpu.times;
        item['idx'] = idx;
        item['model'] = cpu.model;
        item['mhz'] = `${cpu.speed}MHz`;
        item['rate'] = `${(
          (1 -
            times.idle /
              (times.idle + times.user + times.nice + times.sys + times.irq)) *
          100
        ).toFixed(2)}%`;
        return item;
      });
      return {
        arch: os.arch(), // cpu架构
        os: os.type(), // 操作系统内核
        esp: os.platform(), // 操作系统平台
        upTime: dealTime(os.uptime()), // 开机时间
        hostName: os.hostname(),
        hdir: os.homedir(),
        ram: {
          totalMem: dealMem(os.totalmem()),
          freeMem: dealMem(os.freemem()),
          useMem: dealMem(os.totalmem() - os.freemem()),
        },
        cpuInfo: cpuAllData,
        cpuDetail: cpuAllData[0] || {},
        networks: os.networkInterfaces(),
        winVer: child_process.execSync('ver').toString().trim(),
        nodeVer: process.versions,
        release: os.release(), // 系统发行版本
        load: os.loadavg(), // 系统负载
      };
  }
}

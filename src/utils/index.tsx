import { remote } from 'electron';
import Store from 'electron-store';
import _Model from './model';
const _store = new Store();
export const store = _store;
/**
 * @funtion 指令执行默认中转函数 窗口创建初期存在数据为响应问题 这里提前做预存
 */
export function setTerminalTransFer(data: any) {
  store.set('terminalTransfer', data);
}
export function getTerminalTransFer() {
  return store.get('terminalTransfer');
}
export function delTerminalTransFer() {
  return store.delete('terminalTransfer');
}
/**
 * @function 获取本地已保存指令集
 * @returns 返回本地保存的指令集合
 */
export function GetOrderList() {
  let downModels = store.get('orderList');
  if (Array.isArray(downModels)) {
    return downModels;
  } else {
    return [];
  }
}
/**
 * @function 设置更改后的指令集合
 * @returns 返回修改结果
 */
export function SetOrderList(list: Array<any>) {
  if (Array.isArray(list)) {
    store.set('orderList', list);
    return true;
  } else {
    return false;
  }
}
// 对外提供的指令执行库方法集合
export const orderOptions = {
  GetOrderList, // 获取指令数据
  SetOrderList, // 设置指令数据
};
export let Model = _Model;

/**
 * @file 自定义操作指令执行函数
 */
import func from './utils';
export default async function runCustomOrder(
  key: string,
  orderData: any = {},
  isStart: boolean = false, // 是否为指令开始执行之前
  runOrder: any,
  addStr: any
) {
  return new Promise(async (resolve: any, reject: any) => {
    const { customData = {} } = orderData;
    if (!customData[key]) {
      reject('未找到定制参数配置数据');
    }
    let {
      extra, // 触发时机 1为之前 2为之后
      timing, // 定制操作的type
    } = customData[key];
    if (timing === '1' && isStart) {
      addStr('开始进行项目指令执行完成之前自定义指令执行');
      // 指令执行时机与当前函数调用时机一致时进入
      let customFunc = func[extra];
      if (customFunc) {
        await customFunc(orderData, runOrder, customData[key], reject, addStr);
        addStr(`自定义指令执行完成`);
        addStr(`准备进行项目指令${key}执行`);
        resolve({});
      } else {
        reject('未找到对应操作函数');
      }
    } else if (timing === '2' && !isStart) {
      addStr('开始进行项目指令执行完成后自定义指令执行');
      // 指令执行时机与当前函数调用时机一致时进入
      let customFunc = func[extra];
      if (customFunc) {
        await customFunc(orderData, runOrder, customData[key], reject, addStr);
        addStr(`项目指令执行完成后的自定义指令执行完成`);
        resolve({});
      } else {
        reject('未找到对应操作函数');
      }
    } else {
      resolve({});
    }
  });
}

/**
 * @file 自定义项目指令执行函数
 * @param terData 对应项目数据
 * @param runOrder 执行指令函数
 */
export default async function runProjectOrder(
  terData: any,
  runOrder: any,
  orderData: any
) {
  const { projectData = {} } = terData;
  orderData &&
    runOrder('自定义代码执行', orderData.customOrder, false, projectData.path);
}

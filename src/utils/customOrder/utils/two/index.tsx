/**
 * @file 定向打包函数
 * @param terData 对应项目数据
 * @param runOrder 执行指令函数
 */
import { nodeFS } from 'utils/nodeFS';
const {
  isExistFolder,
  isEmptyFolder,
  operateTemplatesFiles,
  delPath,
  mkdirSync,
} = nodeFS;
/**
 * @file 自定义项目指令执行函数
 * @param terData 对应项目数据
 * @param runOrder 执行指令函数
 */
export default async function moveDistFile(
  terData: any,
  runOrder: any,
  orderData: any,
  reject: any,
  addStr: any
) {
  const { projectData = {} } = terData;
  const {
    buildFilePath, // 项目打包路径
    movePath, // 项目复制路径
    isClear, // 路径存在文件时执行逻辑 '1' 清空 '2' 覆盖 '3' 停止
  } = orderData;
  // 首先判断复制和打包路径是否存在
  let isHaveDist = await isExistFolder(buildFilePath);
  let isHaveMove = await isExistFolder(movePath);
  if (!isHaveDist) {
    reject('项目打包路径不存在');
  }
  if (!isHaveMove) {
    reject('项目移动路径不存在');
  }
  if (isHaveDist && isHaveMove) {
    // 都存在时执行一下逻辑
    // 判断移动路径是否存在文件
    let isEmptyMove = await isEmptyFolder(movePath);
    switch (isClear) {
      case '1': // 如果存在文件需要清空
        if (isEmptyMove) {
          // 为空
          let list = await operateTemplatesFiles(buildFilePath, movePath);
          list.forEach((name: string) => addStr(`copy-filename:${name}`));
        } else {
          // 不为空
          // 首先进行文件删除
          try {
            await delPath(movePath);
            await mkdirSync(movePath);
            let list = await operateTemplatesFiles(buildFilePath, movePath);
            list.forEach((name: string) => addStr(`copy-filename:${name}`));
          } catch (e) {
            console.error(e);
            reject('未知错误');
          }
        }
        break;
      case '2': // 不做处理直接复制
        let list = await operateTemplatesFiles(buildFilePath, movePath);
        list.forEach((name: string) => addStr(`copy-filename:${name}`));
        break;
      default:
        // 啥都不做
        break;
    }
  }
}

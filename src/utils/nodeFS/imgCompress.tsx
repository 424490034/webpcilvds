/**
 * @file node关于图片压缩封装
 */
const images = require('images');
const fs = require('fs');
import { nodeFS } from './index';
const { isExistFolder, mkdirSync } = nodeFS;
/**
 * @function 批量压缩文件夹下图片
 * @param floderPath 需要压缩图片的文件夹
 * @param outPath 图片输出路径
 */
function floderCompress(floderPath: string, outPath: string): string[] {
  let result: string[] = [];
  function startCompress(path: string, out: string) {
    fs.readdir(path, function (err: any, files: any[]) {
      if (err) {
        console.log('error:\n' + err);
        return;
      }

      files.forEach(function (file) {
        fs.stat(path + '/' + file, function (err: any, stat: any) {
          if (err) {
            console.log(err);
            return;
          }
          if (stat.isDirectory()) {
            // 判断导出路径是否存在子路径
            isExistFolder(out + '/' + file, (err: any) => {
              if (err) {
                // 不存在
                mkdirSync(out + '/' + file);
                startCompress(path + '/' + file, out + '/' + file);
              } else {
                // 存在直接压缩
                startCompress(path + '/' + file, out + '/' + file);
              }
            });
          } else {
            //遍历图片
            console.log('文件名:' + path + '/' + file);
            let name = path + '/' + file;
            let outName = out + file;
            result.push(name);

            images(name).save(outName, {
              quality: 82, //保存图片到文件,图片质量为50
            });
          }
        });
      });
    });
  }
  startCompress(floderPath, outPath);
  return result;
}
/**
 * @function 单张图片压缩
 * @param imgPath 图片路径
 * @param outPath 图片压缩出口
 */
function imgCompress(imgPath: string, outPath: string) {
  var name = imgPath;
  var outName = outPath + '测试名称.jpg';

  images(name).save(outName, {
    quality: 82, //保存图片到文件,图片质量为50
  });
}
export const nodeImg = { imgCompress, floderCompress };

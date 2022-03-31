/**
 * @file nodejs关于 文件操作相关函数封装
 */
import fs from 'fs';
import path from 'path';
const mkdirp = require('mkdirp');
const glob = require('glob');
/**
 *检查指定目录是否为空
 *
 * @param {string} [dir=process.cwd()]
 * @returns 若为空目录则返回true；反之则返回false
 */
export function isEmptyFolder(dir = process.cwd()): boolean {
  var currentDir = fs.readdirSync(dir);
  return currentDir.length === 0;
}
/**
 * @function 检查指定路径是否存在
 * @param path 判断路径是否存在
 * @param callback 回调函数
 */
function isExistFolder(path: string, callback?: any) {
  return new Promise((resolve, reject) => {
    // fs.exists(path, function(exists) {
    //   console.log(exists ? "创建成功" : "创建失败");
    //   if (callback) {
    //     callback(exists,path)
    //   }
    // });
    //判断文件/目录是否存在
    fs.access(path, (err) => {
      if (callback) {
        callback(err, path);
      }
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
/**
 * @function 删除指定路径文件及目录
 * @param {string} filePath 指定路径文件夹
 */
function delPath(filePath: string) {
  function deleteall(path: string) {
    var files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          deleteall(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
  deleteall(filePath);
}
/**
 * 移除文件或文件夹
 * @param {string} desPath 指定路径
 */
function removeDir(desPath: string) {
  const stat = fs.statSync(desPath);
  if (stat.isFile()) {
    fs.unlinkSync(desPath);
  } else {
    const files = fs.readdirSync(desPath);
    files.forEach((file) => {
      const filePath = path.join(desPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        removeDir(filePath);
      } else if (stat.isFile()) {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(desPath);
  }
}
/**
 * @function 创建指定路径文件夹
 * @param mkdirPath 指定路径
 */
export function mkdirSync(mkdirPath: string) {
  mkdirPath = mkdirPath.replaceAll('\\', '/');
  fs.mkdirSync(mkdirPath);
}
/**
 *将指定目录的文件复制到目标目录
 *存在同名文件则覆盖
 * @param {string} templatePath 复制文件路径
 * @param {string} projectPath 对应接收路径
 * @returns {string[]} 已处理的文件集
 */
function operateTemplatesFiles(templatePath: string, projectPath: string) {
  const fileList: any = [];
  glob.sync('**/*', { cwd: templatePath, dot: true }).forEach((file: any) => {
    const fileDir = path.join(templatePath, file); // 当前文件的模板地址
    const desDir = path.join(projectPath, file); // 当前文件的当前项目地址
    const stat = fs.statSync(fileDir); // 模板文件获取
    // 判断当前路径是否为文件
    if (stat.isFile()) {
      // 进行路径添加
      fileList.push(file);
      // 进行拷贝覆盖
      fs.copyFileSync(fileDir, desDir);
    } else if (stat.isDirectory()) {
      // 判断是否为文件夹
      // 执行文件夹创建
      mkdirp.sync(desDir);
    }
  });
  return fileList;
}
export const nodeFS = {
  isExistFolder,
  delPath,
  removeDir,
  mkdirSync,
  operateTemplatesFiles,
  isEmptyFolder,
};

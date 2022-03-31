/**
 * @file 函数管理
 */
import OneFunc from './one';
import TwoFunc from './two';
import ThreeFunc from './three';
export default {
  '1': OneFunc, // 拉取最新代码函数
  '2': TwoFunc, // 对应打包路径迁移
  '3': ThreeFunc, // 自定义指令执行
};

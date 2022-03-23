/**
 * @file 指令执行文件
 */
import { xlorderRun, executeOrder } from './basics';
import { parsePackage, parsePackageStr } from './packageFile';
// 只负责执行不管回调的执行函数
function orderNow(order:string,path:string|undefined) {
    executeOrder(
        order,
        order,
        () => { },
        path
      );
}
export { xlorderRun, executeOrder, parsePackage, parsePackageStr,orderNow };

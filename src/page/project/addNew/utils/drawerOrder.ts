/**
 * @file 指令转换工具箱
 */
import { getInstallName } from 'utils';
import { getNowGitBranchPromise } from 'utils/GitUtils';
const installName = getInstallName();
/**
 * @function 获取当前配置需要执行的指令语句
 * @param twoData 
 * @returns 
 */
export async function formatOrder(twoData:any) {
    // 获取全局指定使用工具
    const {
        seleteGit, // 指定的git分支
        path: projectPath, // 项目地址
        package: packageType, // 依赖安装方式
        installOrder, // 如果packageType为3则会存在
    } = twoData
    let GitOrder = await getGigCheckout(projectPath, seleteGit);
    let installOrderStr = await getInstall(packageType,installOrder)
    if (GitOrder && installOrderStr) {
        return `${GitOrder} && ${installOrderStr}`
    } else if (GitOrder) {
        return GitOrder
    } else if (installOrderStr) {
        return installOrderStr
    } else {
        return ''
    }
}
/**
 * @function 获取选择节点是否为当前节点
 * @param projectPath 
 * @param seleteGit 
 */
 async function getGigCheckout(projectPath:string,seleteGit:string) {
    let nowGit:any =await getNowGitBranchPromise(projectPath)
    if (nowGit === seleteGit || seleteGit.indexOf(nowGit) !== -1) {
        // 表明所选节点与当前节点匹配 不需要进行节点切换
        return ''
    } else {
        // 两者不匹配 需要进行指令切换
        const nameIndex = seleteGit.indexOf('remotes/origin/');
        if (nameIndex !== -1) {
            let branchName = seleteGit.slice(nameIndex + 'remotes/origin/'.length)
            let farBranchName = seleteGit.slice(seleteGit.indexOf('remotes/') + 'remotes/'.length)
            return `git checkout -b ${branchName} ${farBranchName}`    
        } else {
            return `git checkout  ${seleteGit}`    
        }

    }
}
/**
 * @function 获取依赖包安装方式指令
 */
async function getInstall(packageType:string,installOrder?:string|undefined) {
    switch (packageType) {
        case '1': // 默认安装
            return `${installName} install`
        case '2': // 取消安装
            return '';
        case '3': // 自定义安装
            return`${installName} run ${installOrder}`
        default:
            return '';
    }
}
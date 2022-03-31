/**
 * @file 默认拉取最新代码
 */
import { getNowGitBranchPromise } from '../../../GitUtils';
export default async function gitPullNew(terData: any, runOrder: any) {
  const { projectData = {}, customData = {} } = terData;
  let gitName = await getNowGitBranchPromise(projectData.path);
  runOrder(
    '最新代码拉取',
    `git pull origin ${gitName}`,
    false,
    projectData.path
  );
}

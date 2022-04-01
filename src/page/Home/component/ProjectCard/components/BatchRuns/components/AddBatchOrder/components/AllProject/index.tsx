/**
 * @file 项目卡片
 */
import { EmptyCard } from 'components';
import React from 'react';
import styles from '../../index.module.scss';
import { Collapse } from 'antd';
import { isEmpty } from 'lodash';
import BasicsCard from './Basics';
import CustomBasicsCard from './customBasics';
const { Panel } = Collapse;
interface IProps {
  projectData: any[];
  setData: any; // 同步数据函数
  selectList: any[]; // 当前选中数据
}
export default function index(props: IProps) {
  const {
    // 传入数据
    projectData = [],
    setData,
    selectList,
  } = props;
  if (projectData.length === 0) {
    return <EmptyCard title="请先新增项目" />;
  }
  return (
    <div className={styles.project_select_div}>
      <Collapse>
        {projectData.map((item: any = {}) => {
          const { projectData } = item;
          const [data] = selectList.filter((res: any) => res.id === item.id);
          if (!isEmpty(projectData)) {
            return (
              <Panel header={projectData.name} key={item.id}>
                <BasicsCard setData={setData} item={item} data={data} />
              </Panel>
            );
          } else {
            return (
              <Panel header={item.name} key={item.id}>
                <CustomBasicsCard setData={setData} item={item} data={data} />
              </Panel>
            );
          }
        })}
      </Collapse>
    </div>
  );
}

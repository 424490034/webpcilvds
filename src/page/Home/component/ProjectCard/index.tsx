/**
 * @file 项目卡片
 * @description 新增拉取项目或者添加已有项目
 */
import React, { useRef } from 'react';
import styles from './index.module.scss';
import {
  PlusCircleOutlined,
  SnippetsOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import BatchRuns from './components/BatchRuns';
import Basics from './Basics';

export default function index(props: any) {
  const { actions, models } = props;
  const batchRunsRef: any = useRef();
  const list = [
    {
      name: '新增项目',
      icon: <PlusCircleOutlined />,
      route: '/menu/addProjetc',
      desc: '自动拉取并管理',
    },
    {
      name: '新增已有项目',
      icon: <SnippetsOutlined />,
      route: '/menu/addHaveProject',
      desc: '将已有项目纳入管理',
    },
    {
      name: '批量执行',
      icon: <PlayCircleOutlined />,
      desc: '选中多个项目进行执行',
      onClick: () => {
        batchRunsRef?.current?.showDrawer?.();
      },
    },
  ];
  return (
    <div className={styles.project_div}>
      <div className={styles.header_title}>项目管理</div>
      <div className={styles.body_card_div}>
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item: any, index: number) => {
            return <Basics key={index} item={item} />;
          })}
      </div>
      <BatchRuns actions={actions} models={models} ref={batchRunsRef} />
    </div>
  );
}

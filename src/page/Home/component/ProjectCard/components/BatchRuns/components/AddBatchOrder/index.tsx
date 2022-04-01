/**
 * @file 新增快捷指令组件
 */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Empty } from 'antd';
import SeleteProject from './components/SeleteProject';
import AllProject from './components/AllProject';
import { EmptyCard } from 'components';
interface IProps {
  models: any;
  actions: any;
  selectList: any;
  setSelectList: any;
}
export default function index(props: IProps) {
  const {
    actions,
    models: { projectData },
    selectList,
    setSelectList,
  } = props;
  if (projectData.length === 0) {
    return <EmptyCard title="请先新增项目" />;
  }
  function setData(id: string, data: any) {
    if (selectList.length !== 0) {
      // 首先判断是否存在
      let isHave =
        selectList.filter((item: any) => item.id === id).length !== 0;
      if (isHave) {
        let newList = selectList.map((item: any) => {
          if (item.id === id) {
            return data;
          } else {
            return item;
          }
        });
        setSelectList(newList);
      } else {
        setSelectList([...selectList, data]);
      }
    } else {
      setSelectList([data]);
    }
  }
  return (
    <div className={styles.history_order_div}>
      <div className={styles.history_sub_title_div}>
        已选择项目执行指令(执行顺序自上而下-按下可拖动)
      </div>
      <SeleteProject list={selectList} setSelectList={setSelectList} />
      <div className={styles.history_sub_title_div}>项目指令选择</div>
      <AllProject
        selectList={selectList}
        setData={setData}
        projectData={projectData}
      />
    </div>
  );
}

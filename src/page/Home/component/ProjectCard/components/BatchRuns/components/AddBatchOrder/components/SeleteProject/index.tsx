/**
 * @file 已选择的项目执行指令
 */
import { Empty } from 'antd';
import { EmptyCard } from 'components';
import React from 'react';
import styles from '../../index.module.scss';
import { ReactSortable } from 'react-sortablejs';
import BasicsCard from './basics';
interface IProps {
  list: any[];
  setSelectList: any; // 排序时调用
}
export default function index(props: IProps) {
  const { list, setSelectList } = props;
  if (list.length === 0) {
    return <EmptyCard title="请选择项目指令进行配置" />;
  }
  function listChange(data: any) {
    setSelectList(data);
  }
  function del(id: string) {
    let newData = list.filter((item: any) => item.id !== id);
    setSelectList(newData);
  }
  return (
    <div className={styles.selete_project_div}>
      <ReactSortable list={list} setList={listChange}>
        {list.map((item: any, index: number) => {
          return <BasicsCard del={del} key={index} item={item} />;
        })}
      </ReactSortable>
    </div>
  );
}

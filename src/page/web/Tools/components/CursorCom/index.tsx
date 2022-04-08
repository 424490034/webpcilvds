/**
 * @file 鼠标指针样式组件
 */
import React from 'react';
import styles from './index.module.scss';
import { EmptyCard } from 'components';
import Basics from './Basics';
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
export default function index(props: IProps) {
  const {
    models: { cursorList },
    actions,
    show,
  } = props;
  if (show !== 'true') {
    return <></>;
  }
  return (
    <div className={styles.cursor_div}>
      {Array.isArray(cursorList) && cursorList.length > 0 ? (
        cursorList.map((item: any, key: number) => {
          return <Basics key={key} item={item} />;
        })
      ) : (
        <EmptyCard title="暂无数据" />
      )}
    </div>
  );
}

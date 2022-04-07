/**
 * @file 单个组件
 */
import React from 'react';
import { copyText } from 'utils';
import styles from './index.module.scss';
interface IProps {
  item: any;
}
export default function Basics(props: IProps) {
  const { item } = props;

  return (
    <div
      style={{
        cursor: item.label !== 'url()' && item.value,
      }}
      className={
        item.label === 'url()' ? styles.url_basics_div : styles.basics_div
      }
      onClick={() => {
        copyText(item.copy);
      }}
    >
      <div className={styles.icon_div}>{item.icon}</div>
      {item.label}
    </div>
  );
}

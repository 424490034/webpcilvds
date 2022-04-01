/**
 * @file 基础卡片
 */
import React from 'react';
import styles from './index.module.scss';
import { Tooltip } from 'antd';
import router from 'utils/History';
export default function Basics(props: any) {
  const { item } = props;
  function toRouter() {
    if (item.route) {
      router.push(item.route);
    } else if (item.onClick) {
      item.onClick();
    }
  }
  return (
    <Tooltip title={item.desc}>
      <div className={styles.basics_div} onClick={toRouter}>
        <div className={styles.basics_body_div}>
          <div className={styles.add_icon_div}>{item.icon}</div>
          <div className={styles.text_div}>{item.name}</div>
        </div>
      </div>
    </Tooltip>
  );
}

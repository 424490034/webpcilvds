/**
 * @file 基础卡片
 */
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Progress, Tooltip } from 'antd';
export default function BasicsCard(props: any) {
  const { item } = props;
  return (
    <div className={styles.basics_card}>
      <div className={styles['main__stat-block']}>
        <div className={styles['main__stat-graph']}>
          <Progress
            type="circle"
            percent={item.rateNum}
            width={60}
            strokeColor={{
              '0%': '#108ee9',
              '50%': '#87d068',
              '75%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
        <div className={styles['main__stat-detail']}>
          <Tooltip title={`频率:${item.mhz}`} placement="left">
            <strong className={styles['main__stat-value']}>
              cpu核心{item.idx + 1}
            </strong>
          </Tooltip>
          <Tooltip title="CPU使用率" placement="bottom">
            <span className={styles['main__stat-unit']}>{item.rate}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

/**
 * @file 基础卡片
 */
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Tooltip } from 'antd';
export default function BasicsCard(props: any) {
  const { item } = props;
  return (
    <div className={styles.basics_card}>
      <div className={styles['main__stat-block']}>
        <div className={styles['main__stat-graph']}>
          <svg
            className={styles.ring}
            viewBox="0 0 60 60"
            height="60"
            width="60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={styles['ring-track']}
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#7f7f7f"
              stroke-width="8"
            />
            <circle
              className={classNames(
                styles['ring-stroke'],
                styles['ring-stroke--cals']
              )}
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-width="8"
              stroke-dasharray="200 200"
              stroke-dashoffset="8"
              transform="rotate(-90,30,30)"
            />
          </svg>
          <svg
            role="img"
            aria-label="Flame"
            className={styles.icon}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles['no-fill']}
              fill="none"
              stroke="#000"
              stroke-width="2"
              d="M 14.505 1 C 11.546 1.356 10.354 12.419 10.272 12.478 C 10.189 12.538 6.773 6.184 6.773 6.184 C 6.773 6.184 3.855 8.381 4 14 C 4.2 18 5.868 23.067 12.177 22.999 C 18.488 22.932 20.1 18 20 14 C 19.9 10 17.533 10.05 15.964 6.738 C 14.638 3.939 14.505 1 14.505 1 Z"
            />
          </svg>
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

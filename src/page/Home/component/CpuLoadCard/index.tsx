/**
 * @file cpu负载卡片
 */
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import BasicsCard from './BasicsCard';
interface IProps {
  models: any;
}
export default function index(props: IProps) {
  const {
    models: { sysInfo },
  } = props;
  return (
    <div
      className={classNames(
        styles.cpu_load_div,
        'animate__animated',
        'animate__fadeInUp'
      )}
    >
      <svg className={styles['app__gradients']}>
        <defs>
          <linearGradient id="ring" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="hsl(184,66%,54%)" />
            <stop offset="100%" stop-color="hsl(184,66%,34%)" />
          </linearGradient>
        </defs>
      </svg>
      {sysInfo &&
        Array.isArray(sysInfo.cpuInfo) &&
        sysInfo.cpuInfo.map((item: any, index: number) => {
          return <BasicsCard key={index} item={item} />;
        })}
    </div>
  );
}

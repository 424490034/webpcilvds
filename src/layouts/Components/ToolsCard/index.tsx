/**
 * @file 工具库卡片
 */
import React from 'react';
import styles from './index.module.scss';
import tools from 'config/toolsConfig';
import router from 'utils/History';
import classNames from 'classnames';

export default function index() {
  // 点击跳转
  function toRouter(route: string) {
    route && router.push(route);
  }
  return (
    <div className={styles.tool_list_div}>
      {Array.isArray(tools) &&
        tools.length > 0 &&
        tools.map((item: any, index: number) => {
          return (
            <div
              title={item.name}
              key={index}
              className={classNames(
                styles.card_div,
                'animate__animated',
                'animate__pulse'
              )}
              onClick={() => {
                toRouter(item.route);
              }}
            >
              <div className={styles.text_bgc_div}>{item.name[0]}</div>
              <div>{item.name.slice(0, 4)}</div>
            </div>
          );
        })}
    </div>
  );
}

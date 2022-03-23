/**
 * @file 右侧内容卡片
 */
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { btnMenus } from 'config/router';
import router from 'utils/History';
export default function RightCard(props: any) {
  const {
    location: { pathname },
    history,
  } = props;
  function toRouter(path: string) {
    router.push(path);
  }
  return (
    <div className={styles.right_div}>
      <div className={styles.body_div}>
        <div className={styles.btns_div}>
          {Array.isArray(btnMenus) &&
            btnMenus.length > 0 &&
            btnMenus.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    styles.init_btn,
                    item.path === pathname ? styles.checked_btn : ''
                  )}
                  onClick={() => {
                    toRouter(item.path);
                  }}
                >
                  {item.name}
                </div>
              );
            })}
        </div>
        <div className={'content_body'}>{props.children}</div>
      </div>
      {pathname.indexOf('/menu/home') !== -1 && (
        <div className={styles.bgc_div}>
          <div className={styles.circle_div}></div>
        </div>
      )}
    </div>
  );
}

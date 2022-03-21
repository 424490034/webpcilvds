/**
 * @file 左侧路由卡片
 */
import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';
import Icon from 'assets/icon.png';
import { FormOutlined } from '@ant-design/icons';
import { routePaths } from 'config/router';
import RouteCard from './Components/RouteCard';
import SearchInput from './Components/SearchRoute';
let win = window.require('electron')?.remote?.getCurrentWindow();
let app = window.require('electron')?.remote?.app;
export default function LeftCard(props: any) {
  const [routesData, setRoutesData] = useState<any[]>(routePaths);
  function minWindow() {
    win.minimize();
  }
  function closeWindow() {
    app.quit();
  }
  let routerProps = useMemo(() => {
    return {
      data: routesData,
    };
  }, [routesData]);
  return (
    <div className={styles.left_div}>
      <div className={styles.left_header_div}>
        <div className={styles.title_div}>
          <span className={styles.img_span}>
            <img src={Icon} />
          </span>
          <span className={styles.title_span}>前端可视化平台</span>
        </div>
        <div className={styles.config_div}>
          <span className={styles.close_span}>
            <div
              className={styles['menu-big']}
              onClick={minWindow}
              title="最小化"
            ></div>
            <div
              className={styles['menu-close']}
              onClick={closeWindow}
              title="关闭窗口"
            ></div>
          </span>
        </div>
      </div>
      <SearchInput InputChange={setRoutesData} />
      <RouteCard {...routerProps} />
      <div className={styles.tool_div}>
        <div className={styles.subTitle_div}>
          前端工具库
          <span>
            <FormOutlined />
          </span>
        </div>
        <div className={styles.tool_list_div}>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
          <div className={styles.card_div}></div>
        </div>
      </div>
    </div>
  );
}

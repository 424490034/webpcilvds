/**
 * @file 左侧路由卡片
 */
import React from 'react';
import styles from './index.module.scss';
import Icon from 'assets/icon.png';
import { FormOutlined } from '@ant-design/icons';
let win = window.require('electron')?.remote?.getCurrentWindow();
let app = window.require('electron')?.remote?.app;
export default function LeftCard(props: any) {
  function minWindow() {
    win.minimize();
  }
  function closeWindow() {
    app.quit();
  }

  return (
    <div className={styles.left_div}>
      <div className={styles.left_header_div}>
        <div className={styles.title_div}>
          <span className={styles.img_span}>
            <img src={Icon} />
          </span>
          <span className={styles.title_span}>前端项目可视化平台</span>
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
      <div className={styles.route_div}>
        {/* <div className={styles.subTitle_div}>快捷路由</div> */}
      </div>
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

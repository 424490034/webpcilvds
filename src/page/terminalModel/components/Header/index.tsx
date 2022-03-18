/**
 * @file 顶部操作栏
 */
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import BasicsCard from './basicsCard';
import { connect } from 'dva';
import { message, Modal } from 'antd';
import pageConfig from '../../config/pageConfig';
import { errorCloseFormDesigner } from '../../unit/ipc';
let win = window.require('electron')?.remote?.getCurrentWindow();
let app = window.require('electron')?.remote?.app;
const { namespace } = pageConfig;
const { confirm } = Modal;
interface propsConfig {
  [name: string]: any;
  childOptions: {
    closeManyChildWin: Function; // 关闭子窗口函数
    registerChildWin: Function; // 子窗口注册函数
  };
}
interface listConfig {
  svgName: string;
  title: string;
  isSelected: boolean;
  onClick(value: any): void;
}
export default function index(props: propsConfig) {
  const {
    actions,
    [namespace]: { title = '终端执行平台', isSysBtn, terminalList },
    childOptions,
  } = props;
  // 右侧组件数组
  let rightList: listConfig[] = [
    {
      svgName: 'sys',
      title: '指令汇总',
      onClick: setIsSysBtnFunc,
      isSelected: isSysBtn,
    },
  ];
  /**
   * @function 是否展开操作栏
   * @param {boolean} bool 状态
   */
  function setIsSysBtnFunc(bool: boolean) {
    actions.updateSysBtnFunc({
      isSysBtn: bool, // 组件栏是否展示
    });
  }
  // 右侧组件数组
  let leftList: listConfig[] = [];
  function minWindow() {
    win.minimize();
  }
  async function closeWindow() {
    await childOptions.closeManyChildWin(() => {
      actions.sendToMainClose();
      errorCloseFormDesigner();
      win.destroy();
    });
    // if (Array.isArray(terminalList) && terminalList.length > 0) {
    //   message.error('存在执行终端,请关闭后重试');
    //   return;
    // }

    // app.quit();
  }
  function maxWindow() {
    const isMax = win.isMaximized();
    if (isMax) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  return (
    <div className={styles.header_all_div}>
      <div className={styles.header_left_div}>
        <div
          className={styles['menu-close']}
          onClick={closeWindow}
          title="关闭窗口"
        ></div>
        <div
          className={styles['menu-min']}
          onClick={maxWindow}
          title="最大化"
        ></div>
        <div
          className={styles['menu-big']}
          onClick={minWindow}
          title="最小化"
        ></div>
        {leftList.map((item: listConfig, index: number) => {
          return <BasicsCard item={item} key={index} />;
        })}
      </div>
      <div className={styles.header_center_div}>
        <div className={styles.center_left_btn_div}></div>
        <div className={styles.center_center_title_div}>{title}</div>
        <div className={styles.center_right_btn_div}></div>
      </div>
      <div className={styles.header_right_div}>
        <div className={styles.right_move_div}></div>
        {rightList.map((item: listConfig, index: number) => {
          return <BasicsCard item={item} key={index} />;
        })}
      </div>
    </div>
  );
}

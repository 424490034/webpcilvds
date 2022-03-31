/**
 * @file 终端窗口
 */
import { cloneDeep, isEmpty } from 'lodash';
import styles from './index.module.scss';
import React, { useState, useEffect } from 'react';
import { delTerminalTransFer, getTerminalTransFer } from 'utils';
import { errorCloseFormDesigner, windowHave } from './unit/ipc';
import { ipcRenderer } from 'electron';
import pageConfig from './config/pageConfig';
import { connect } from 'dva';
import HeaderCom from './components/Header';
import BodyCom from './components/BodyCard';
const { namespace } = pageConfig;
interface winIProps {
  [name: string]: Function | undefined;
}
// 关闭窗口时进行批量窗口关闭
let winStopMany: winIProps = {};
let win = window.require('electron')?.remote?.getCurrentWindow();
function index(props: any) {
  const { actions } = props;
  const { terminalList } = props[namespace];
  const childOptions = {
    closeManyChildWin, // 关闭子窗口函数
    registerChildWin, // 子窗口注册函数
  };
  useEffect(() => {
    // getWindowWidth();
    initElectron();
    return () => {
      // 退出时进行终端清除
      actions.sendToMainClose({});
      errorCloseFormDesigner();
      // 注册动态宽度获取
      ipcRenderer.removeListener('terminal-model', listener);
      actions.clearOrderList();
    };
  }, []);
  // electron 定制化
  function initElectron() {
    // 初始化钱去拿去暂存数据
    let res = getTerminalTransFer();
    if (res) {
      let data = cloneDeep(res);
      listener(undefined, data);
      delTerminalTransFer();
    }
    ipcRenderer.on('terminal-model', listener);
  }
  function listener(_: any, arg: any) {
    switch (arg.status) {
      case 'closeWindow':
        win.destroy();
        actions.editElectronConfig({
          status: 'closeWindow',
          terminalList: [], // 清空需要执行的终端
        });
        break;
      case 'createOrder': // 新建新终端执行
        actions.fetchAddTerminal({
          orderId: arg.id,
          status: 'createOrder',
          initOrderKey: arg.orderName,
        });
        break;
      case 'getIds': // 获取目前正在运行的终端id
        actions.sendToOrderWindow();
        break;
      default:
        actions.sendToOrderWindow();
        break;
    }
  }
  const bodyProps = {
    actions,
    models: props[namespace],
    childOptions,
  };
  // 窗口相关函数
  async function closeManyChildWin(callback: any) {
    if (!isEmpty(winStopMany)) {
      let list = Object.keys(winStopMany);
      await list.map(async (item) => {
        if (winStopMany[item] && typeof winStopMany[item] === 'function') {
          await winStopMany[item]();
        }
      });
      winStopMany = {};
    } else {
      winStopMany = {};
    }
    setTimeout(() => {
      callback && callback();
    }, 500);
  }
  // 注册窗口函数
  function registerChildWin(winId: string, closeFunc: Function) {
    winStopMany = {
      ...winStopMany,
      [winId]: closeFunc,
    };
  }
  return (
    <div className={styles.all_div}>
      <HeaderCom {...props} childOptions={childOptions} />
      <BodyCom {...bodyProps} />
    </div>
  );
}
const mapStateToProps = (props: any) => {
  return {
    [namespace]: props[namespace],
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      editElectronConfig(payload: any) {
        dispatch({
          type: `${namespace}/editElectronConfig`,
          payload,
        });
      },
      fetchAddTerminal(payload: any) {
        dispatch({
          type: `${namespace}/fetchAddTerminal`,
          payload,
        });
      },
      sendToOrderWindow(payload: any) {
        dispatch({
          type: `${namespace}/sendToOrderWindow`,
          payload,
        });
      },
      // 是否展开操作栏
      updateSysBtnFunc(payload: any) {
        dispatch({
          type: `${namespace}/editSysBtnFunc`,
          payload,
        });
      },
      // 删除指定终端
      fetchRemoveOrder(payload: any, callback: any) {
        dispatch({
          type: `${namespace}/fetchRemoveOrder`,
          payload,
          callback,
        });
      },
      // 退出时清空指令数组
      clearOrderList(payload: any, callback: any) {
        dispatch({
          type: `${namespace}/clearOrderList`,
          payload,
          callback,
        });
      },
      // 带通知的清空数组
      sendToMainClose(payload: any) {
        dispatch({
          type: `${namespace}/sendToMainClose`,
          payload,
        });
      },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);

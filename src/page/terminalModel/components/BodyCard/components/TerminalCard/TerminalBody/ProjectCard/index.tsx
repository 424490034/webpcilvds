/**
 * @file 指令输出弹框
 */
import React, { forwardRef, useImperativeHandle } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import PackageCard from './packageCard';
import { Modal } from 'antd';
import moment from 'moment';
const { confirm } = Modal;
interface IProps {
  actions: any;
  models: any;
  terData: any;
  height: string;
  runPackageOrder: any;
  stopOrder: any;
  projectRef: any;
}
function index(props: IProps, ref: any) {
  const { terData, height, stopOrder, projectRef } = props;
  useImperativeHandle(ref, () => ({
    updateOut,
    clearOut,
  }));
  function clearOut() {
    let divDom: any = document.querySelector(`.cus_${terData.id}`);
    divDom.innerHTML = undefined;
  }
  function updateOut(data: any) {
    let divDom: any = document.querySelector(`.cus_${terData.id}`);
    const { isWarning, isError, str } = data;
    let bodyClass = 'terminal_right_body';
    if (isWarning) {
      bodyClass = 'terminal_right_body_warring';
    } else if (isError) {
      bodyClass = 'terminal_right_body_error';
    }
    let spanDom = `
      <div class="terminal_row">
      <span class="terminal_left_title">${
        terData.webFilePath
          ? terData.webFilePath
          : terData.name || terData.webName
      }><span class="terminal_time_span">${moment().format(
      'YYYY年MM月DD日 HH时mm分ss秒'
    )}</span></span>
      <div class="${bodyClass}"><pre>${str}</pre></div>
      </div>
    `;
    // 基础div拼装
    var div = document.createElement('div');
    div.innerHTML = spanDom;
    div.className = 'terminal_basics_div';
    divDom.appendChild(div);
    divDom.scrollTop = divDom.scrollHeight;
  }
  function clearDiv() {
    confirm({
      title: `是否清除控制台的输出?`,
      content: '不会停止指令的执行',
      okType: 'danger',
      centered: true,
      onOk() {
        let divDom: any = document.querySelector(`.cus_${terData.id}`);
        divDom.innerHTML = '';
      },
    });
  }
  return (
    <>
      <PackageCard {...props} clearDiv={clearDiv} ref={projectRef} />
      <div
        className={classNames(styles.terminal_body_div, `cus_${terData.id}`)}
        style={{
          height: '100%',
          // maxHeight: height === '400px' ? 290 : undefined,
          // minHeight: height === '400px' ? 290 : undefined,
        }}
      ></div>
    </>
  );
}
export default forwardRef(index);

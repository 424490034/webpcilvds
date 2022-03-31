/**
 * @file 指令输出弹框
 */
import React, { forwardRef, useImperativeHandle } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import moment from 'moment';
interface IProps {
  actions: any;
  models: any;
  terData: any;
  height: string;
}
function index(props: IProps, ref: any) {
  const { terData = {}, height } = props;
  const { projectData = {} } = terData;
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
    const { isWarning, isError, str, isFileTo } = data;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>', isFileTo, data);
    let bodyClass = 'terminal_right_body';
    if (isWarning) {
      bodyClass = 'terminal_right_body_warring';
    } else if (isError) {
      bodyClass = 'terminal_right_body_error';
    } else if (isFileTo) {
      bodyClass = 'terminal_right_body_file';
    }
    let spanDom = `
      <div class="terminal_row">
      <span class="terminal_left_title">${
        projectData.path ? projectData.path : terData.name || projectData.name
      }>
      <span class="terminal_time_span">${moment().format(
        'YYYY年MM月DD日 HH时mm分ss秒'
      )}</span>
      </span>
    <div class="${bodyClass}"><pre>${str}</pre></div>
    </div>
    `;
    if (isFileTo) {
      spanDom = `<div class="${bodyClass}"><pre>${str}</pre></div>
      `;
    }
    // 基础div拼装
    var div = document.createElement('div');
    div.innerHTML = spanDom;
    div.className = 'terminal_basics_div';
    divDom.appendChild(div);
    divDom.scrollTop = divDom.scrollHeight;
  }
  return (
    <div
      className={classNames(styles.terminal_body_div, `cus_${terData.id}`)}
      style={{
        height: '100%',
        // maxHeight: height === '400px' ? 350 : undefined,
        // minHeight: height === '400px' ? 350 : undefined,
      }}
    ></div>
  );
}
export default forwardRef(index);

/**
 * @file 仓库地址获取和拉取
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import BodyBgc from '../bodyBgc';
import styles from '../index.module.scss';
import { Button, Input, message } from 'antd';
import classNames from 'classnames';
import { SeletePath } from 'components';
import iconImg from 'assets/kl.ico';
import { globalMessage } from 'utils';
import { executeOrder } from 'utils/xlOrder';
function index(props: any, ref: any) {
  const { setCurrent } = props;
  useImperativeHandle(ref, () => ({
    register,
  }));
  // 拉取前 init 拉取中 load 拉取后 成功 success 失败 error
  const [status, setStatus] = useState('init');
  const [gitValue, setGitValue] = useState(undefined);
  const [pathValue, setPathValue] = useState(undefined);
  function cloneGit() {
    if (gitValue && pathValue) {
      setStatus('load');
      runOrder();
    } else {
      message.error('请正确填写');
    }
  }
  function register() {
    setStatus('init');
    setPathValue(undefined);
    setGitValue(undefined);
    clearOut();
  }
  function inputChange(e: any) {
    setGitValue(e.target.value);
  }
  function pathChange(value: any) {
    setPathValue(value);
  }
  // 以下为输出相关
  /**
   * @function 运行配置指令
   */
  function runOrder() {
    executeOrder('仓库拉取', `git clone ${gitValue}`, outputStr, pathValue);
  }
  function toMessage(code: string) {
    if (code) {
      if (code.indexOf('子进程退出') !== -1) {
        if (code.indexOf('运行成功')) {
          globalMessage('仓库拉取执行成功', code, iconImg, () => {});
          setCurrent(1);
        } else {
          globalMessage('仓库拉取执行失败', code, iconImg, () => {});
        }
      }
    }
  }
  /**
   * @function 指令执行回调
   * @param data 指令执行时每次的回调数据
   * @param child
   */
  function outputStr(data: any, child: any, isClose: boolean = false) {
    if (isClose) {
      addStr(data);
      toMessage(data);
    } else {
      // 默认更新
      addStr('\n' + data);
    }
  }
  function addStr(dataStr: string) {
    if (dataStr.toLocaleUpperCase().indexOf('WARNING') !== -1) {
      updateOut({
        isWarning: true,
        isError: false,
        str: dataStr,
      });
    } else if (dataStr.toLocaleUpperCase().indexOf('ERROR') !== -1) {
      updateOut({
        isWarning: false,
        isError: true,
        str: dataStr,
      });
    } else {
      updateOut({
        isWarning: false,
        isError: false,
        str: dataStr,
      });
    }
  }
  function clearOut() {
    let divDom: any = document.querySelector(`#gitResult`);
    divDom.innerHTML = undefined;
  }
  function updateOut(data: any) {
    let divDom: any = document.querySelector(`#gitResult`);
    if (!divDom) {
      return;
    }
    const { isWarning, isError, str } = data;
    let bodyClass = 'terminal_right_body';
    if (isWarning) {
      bodyClass = 'terminal_right_body_warring';
    } else if (isError) {
      bodyClass = 'terminal_right_body_error';
    }
    let spanDom = `
          <div class="${bodyClass}"><pre>${str}</pre></div>
          </div>
        `;
    // 基础div拼装
    var div = document.createElement('div');
    div.innerHTML = spanDom;
    div.className = 'terminal_basics_div';
    divDom?.appendChild(div);
    divDom.scrollTop = divDom?.scrollHeight;
  }
  return (
    <BodyBgc width={'80%'}>
      <div className={styles.steps_one_div}>
        <div
          className={
            status === 'init' ? styles.address_div : styles.address_load_div
          }
        >
          <div className={styles.title_div}>
            请输入远程仓库地址(git仓库地址)
          </div>
          <div className={styles.input_div}>
            <Input
              value={gitValue}
              onChange={inputChange}
              placeholder="请输入远程仓库地址(git仓库地址)"
            />
          </div>
          <div className={styles.title_div}>
            请选择本地仓库存放地址(本地仓库地址)
          </div>
          <div className={styles.input_div}>
            <SeletePath
              value={pathValue}
              onChange={pathChange}
              placeholder="请选择本地仓库存放地址(本地仓库地址)"
            />
          </div>
          <div className={styles.git_result_div}>
            <div className={styles.result_title_div}>仓库拉取详情</div>
            <div id="gitResult" className={styles.result_body_div}></div>
          </div>
          <div className={styles.btn_div}>
            <Button
              disabled={status !== 'init'}
              onClick={cloneGit}
              type="primary"
            >
              拉取
            </Button>
            <Button
              onClick={register}
              danger
              style={{
                marginLeft: 12,
              }}
              type="primary"
            >
              重置
            </Button>
          </div>
        </div>
      </div>
    </BodyBgc>
  );
}
export default forwardRef(index);

/**
 * @file 终端执行卡片
 */
import React, { useState, useRef, useEffect } from 'react';
import { Col } from 'antd';
import styles from './index.module.scss';
import TerminalHeader from './TerminalHeader';
import { xlorderRun, executeOrder } from 'utils/xlOrder';
import OutputCard from './TerminalBody/OutputCard';
import ProjectCard from './TerminalBody/ProjectCard';
import { isEmpty } from 'lodash';
import { globalMessage } from 'utils';
import { showTerminalWindow } from 'electron/window/index';
import iconImg from 'assets/kl.ico';
const kill = require('tree-kill');
interface IProps {
  actions: any;
  models: any;
  ColConfig: any;
  height: string;
  terData: any; // 对应终端数据
  index: number; // 下标地址
  childOptions: {
    closeManyChildWin: Function; // 关闭子窗口函数
    registerChildWin: Function; // 子窗口注册函数
  };
}
let strData: any = [];
export default function index(props: IProps) {
  const { ColConfig = {}, height, terData, actions, childOptions } = props;
  const [cmdData, setCmdData] = useState<any>({});
  const outRef: any = useRef();
  const projectRef: any = useRef();
  const outHeaderRef: any = useRef();
  useEffect(() => {
    if (childOptions.registerChildWin) {
      childOptions.registerChildWin(terData.id, asynStopOrder);
    }
    if (terData.type === '1' && terData.initOrderKey === 'start') {
      if (!cmdData.pid) {
        runOrder();
      }
    }
    return () => {
      stopOrder();
    };
  }, []);
  // const [strData, setStrData] = useState<any[]>([]);
  function setStrData(data: any) {
    strData = data;
  }
  /**
   * @function 运行配置指令
   */
  function runOrder() {
    executeOrder(terData.name, terData.queue, outputStr, terData.orderPath);
  }
  /**
   * @function 运行指定指令
   */
  function runPackageOrder(order: string, isNoPrint: boolean = false) {
    executeOrder(
      terData.webName,
      order,
      isNoPrint ? () => {} : outputStr,
      terData.webFilePath
    );
  }
  /**
   * @function 停止执行指令
   */
  function stopOrder() {
    if (cmdData.pid) {
      if (terData.type === '2') {
        projectRef?.current?.clearKey();
      }
      kill(cmdData.pid, 'SIGKILL');
      setCmdData({});
    }
  }
  /**
   * @function 同步停止执行指令
   */
  async function asynStopOrder() {
    outHeaderRef.current?.removeWin?.();
  }
  /**
   * @function 停止当前指令 重新执行
   */
  function resetOrder() {
    if (cmdData.pid) {
      kill(cmdData.pid, 'SIGKILL');
      setCmdData({});
      runOrder();
    }
  }
  /**
   * @function 添加语句
   * @param dataStr
   */
  function addStr(dataStr: string) {
    if (dataStr.toLocaleUpperCase().indexOf('WARNING') !== -1) {
      outRef.current.updateOut({
        isWarning: true,
        isError: false,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: true,
          isError: false,
          str: dataStr,
        },
      ]);
    } else if (dataStr.toLocaleUpperCase().indexOf('ERROR') !== -1) {
      outRef.current.updateOut({
        isWarning: false,
        isError: true,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: false,
          isError: true,
          str: dataStr,
        },
      ]);
    } else {
      outRef.current.updateOut({
        isWarning: false,
        isError: false,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: false,
          isError: false,
          str: dataStr,
        },
      ]);
    }
  }
  /**
   * @提供给顶部删除按钮
   * @param params
   */
  function clearBodyOut() {
    outRef.current.clearOut();
  }
  function toMessage(code: string) {
    if (code) {
      if (code.indexOf('子进程退出') !== -1) {
        if (code.indexOf('运行成功') !== -1) {
          globalMessage(
            terData.name || terData.webName + '执行成功',
            code,
            iconImg,
            showTerminalWindow
          );
        } else {
          globalMessage(
            terData.name || terData.webName + '执行失败',
            code,
            iconImg,
            showTerminalWindow
          );
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
      toMessage(data);
      if (terData.type === '2') {
        projectRef?.current?.clearKey();
      }
      // 清空状态
      setCmdData({});
      addStr(data);
    } else {
      if (isEmpty(cmdData)) {
        // 为空时直接覆盖
        setCmdData(child);
        addStr(data);
      } else if (cmdData.pid !== child.pid) {
        // 旧pid与新pid不同 说明执行到其他指令了
        let str = `\n`;
        setCmdData(child);
        addStr(str + data);
      } else {
        // 默认更新
        addStr('\n' + data);
      }
    }
  }
  /**
   * @function 清除指令
   */
  function clearData() {
    setCmdData({});
    setStrData([]);
  }
  const headerCardProps = {
    ...props,
    terData,
    cmdData,
    runOrder,
    stopOrder,
    resetOrder,
    clearBodyOut,
  };
  return (
    <>
      <TerminalHeader {...props} {...headerCardProps} ref={outHeaderRef} />
      <div className={styles.col_body_div}>
        {terData.type === '1' ? (
          <OutputCard
            ref={outRef}
            models={props.models}
            actions={actions}
            terData={terData}
            height={height}
          />
        ) : (
          <ProjectCard
            ref={outRef}
            models={props.models}
            actions={actions}
            terData={terData}
            height={height}
            runPackageOrder={runPackageOrder}
            stopOrder={stopOrder}
            projectRef={projectRef}
          />
        )}
      </div>
    </>
  );
}

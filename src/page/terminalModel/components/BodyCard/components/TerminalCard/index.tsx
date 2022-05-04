/**
 * @file 终端执行卡片
 */
import React, { useState, useRef, useEffect } from 'react';
import { Col, message } from 'antd';
import styles from './index.module.scss';
import TerminalHeader from './TerminalHeader';
import { xlorderRun, executeOrder } from 'utils/xlOrder';
import OutputCard from './TerminalBody/OutputCard';
import ProjectCard from './TerminalBody/ProjectCard';
import { isEmpty } from 'lodash';
import { globalMessage } from 'utils';
import { showTerminalWindow } from 'electron/window/index';
import iconImg from 'assets/kl.ico';
import runOrderCustom from 'utils/customOrder';
import { openFileInFolder } from 'electron/download/util';
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
  const { ColConfig = {}, height, terData = {}, actions, childOptions } = props;
  const { projectData = {}, customData = {} } = terData;
  const [cmdData, setCmdData] = useState<any>({});
  const outRef: any = useRef();
  const projectRef: any = useRef();
  const outHeaderRef: any = useRef();
  const [projectRunKey, setProjectRunKey] = useState<any>();
  useEffect(() => {
    if (childOptions.registerChildWin) {
      childOptions.registerChildWin(terData.id, asynStopOrder);
    }
    if (
      terData.type === '5' &&
      (terData.initOrderKey === 'start' ||
        terData.initOrderKey === 'initRunOrder')
    ) {
      if (
        terData.terminalKey &&
        (terData.initOrderKey === 'start' ||
          terData.initOrderKey === 'initRunOrder')
      ) {
        runTypeFileProject(terData);
      } else {
        if (!cmdData.pid) {
          runOrder();
        }
      }
    }
    return () => {
      stopOrder();
    };
  }, []);
  // 为非项目时指令调用
  function runTypeFileProject(newData: any) {
    const { terminalKey } = newData;
    switch (terminalKey) {
      case 'orderOpenVSCode':
        codeRun();
        runOrder();
        break;
      case 'orderOpenExplorer':
        openPath();
        runOrder();
        break;
      case 'orderOpenCmd':
        codeCmd();
        runOrder();
        break;
      case 'orderOpenPowerShell':
        codePowerShell();
        runOrder();
        break;
      case 'orderOpenSmartGit':
        codeSmartGit();
        runOrder();
        break;
      default:
        console.error('项目指令未查询到匹配值!');
        runOrder();
        break;
    }
  }
  // const [strData, setStrData] = useState<any[]>([]);
  function setStrData(data: any) {
    strData = data;
  }
  /**
   * @function 运行配置指令
   */
  function runOrder() {
    executeOrder(
      terData.name,
      terData.orderQueue,
      outputStr,
      terData.orderPath
    );
  }
  // 打开文件路径
  async function openPath() {
    if (projectData && projectData.path) {
      openFileInFolder(projectData.path);
    } else if (terData.orderPath) {
      openFileInFolder(terData.orderPath);
    } else {
      message.error('文件路径丢失');
    }
  }
  function codeRun() {
    runPackageOrder(`code .`, true);
  }
  function codeCmd() {
    runPackageOrder(`start cmd`, true);
  }
  function codePowerShell() {
    runPackageOrder(`start PowerShell`, true);
  }
  function codeSmartGit() {
    runPackageOrder(`smartgit .`, true);
  }
  /**
   * @function 运行指定指令
   *  @param order  需要执行的指令
   * @param isNoPrint 是否需要打印结果
   * @param key 当前项目内部package执行key 根据定制化参数进行对应指令执行
   */
  function runPackageOrder(
    order: string,
    isNoPrint: boolean = false,
    key?: string
  ) {
    // 判断key是否存在
    if (key) {
      if (customData[key]) {
        runOrderCustom(key, terData, true, runCustomOrder, addStr)
          .then((data: any) => {
            window[terData.id] = key;
            runInitOrder(order, isNoPrint);
          })
          .catch((error: any) => {
            console.log('错误执行');
            addStr(`自定义指令执行异常`);
            message.error(`自定义指令,执行异常:error`);
            window[terData.id] = undefined;
            runInitOrder(order, isNoPrint);
          });
      } else {
        // 不存在额外逻辑 直接进行调用
        runInitOrder(order, isNoPrint);
      }
    } else {
      executeOrder(
        projectData.name,
        order,
        isNoPrint ? () => {} : initOutPutStr,
        projectData.path
      );
    }
  }
  function runCustomOrder(
    name: string,
    order: string,
    isNoPrint: boolean = false,
    pathStr: string
  ) {
    executeOrder(
      name,
      order,
      isNoPrint ? () => {} : outputStrNoMessage,
      pathStr
    );
  }
  function runInitOrder(order: string, isNoPrint: boolean = false) {
    executeOrder(
      projectData.name,
      order,
      isNoPrint ? () => {} : outputStr,
      projectData.path
    );
  }
  /**
   * @function 停止执行指令
   */
  function stopOrder() {
    if (cmdData.pid) {
      if (terData.type !== '5') {
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
    if (dataStr.indexOf('copy-filename:') !== -1) {
      outRef?.current?.updateOut({
        isWarning: false,
        isError: false,
        isFileTo: true,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: false,
          isError: false,
          isFileTo: true,
          str: dataStr,
        },
      ]);
      return;
    }
    if (dataStr.toLocaleUpperCase().indexOf('WARNING') !== -1) {
      outRef?.current?.updateOut({
        isWarning: true,
        isError: false,
        isFileTo: false,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: true,
          isError: false,
          isFileTo: false,
          str: dataStr,
        },
      ]);
    } else if (dataStr.toLocaleUpperCase().indexOf('ERROR') !== -1) {
      outRef?.current?.updateOut({
        isWarning: false,
        isError: true,
        isFileTo: false,
        str: dataStr,
      });
      setStrData([
        ...strData,
        {
          isWarning: false,
          isError: true,
          isFileTo: false,
          str: dataStr,
        },
      ]);
    } else {
      outRef?.current?.updateOut({
        isWarning: false,
        isError: false,
        str: dataStr,
        isFileTo: false,
      });
      setStrData([
        ...strData,
        {
          isWarning: false,
          isError: false,
          str: dataStr,
          isFileTo: false,
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
  function toError(code: string) {
    if (code) {
      if (code.indexOf('子进程退出') !== -1) {
        if (code.indexOf('运行成功') !== -1) {
        } else {
          message.error('自定义操作指令执行异常');
        }
      }
    }
  }
  function toMessage(code: string) {
    if (code) {
      if (code.indexOf('子进程退出') !== -1) {
        if (code.indexOf('运行成功') !== -1) {
          globalMessage(
            terData.name || projectData.name + '执行成功',
            code,
            iconImg,
            showTerminalWindow
          );
          if (terData.type !== '5') {
            projectRef?.current?.clearKey();
          }
          if (window[terData.id] && customData[window[terData.id]]) {
            runOrderCustom(
              window[terData.id],
              terData,
              false,
              runCustomOrder,
              addStr
            );
            window[terData.id] = undefined;
          }
        } else {
          globalMessage(
            terData.name || projectData.name + '执行失败',
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
  function outputStrNoMessage(data: any, child: any, isClose: boolean = false) {
    if (isClose) {
      toError(data);
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
   * @function 指令执行回调
   * @param data 指令执行时每次的回调数据
   * @param child
   */
  function outputStr(data: any, child: any, isClose: boolean = false) {
    if (isClose) {
      toMessage(data);
      // if (terData.type !== '5') {
      //   projectRef?.current?.clearKey();
      // }
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
   * @function 指令执行回调-为非项目指令调用时的方法不会全局消息提示
   * @param data 指令执行时每次的回调数据
   * @param child
   */
  function initOutPutStr(data: any, child: any, isClose: boolean = false) {
    if (isClose) {
      // if (terData.type !== '5') {
      //   projectRef?.current?.clearKey();
      // }
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
      <div className={styles.col_body_div} id={terData.id}>
        {terData.type === '5' ? (
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

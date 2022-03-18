/**
 * @file 每个终端执行卡片的顶部
 */
import { Col, Row, Tooltip, Modal, Button, message } from 'antd';
import React, { useImperativeHandle, forwardRef } from 'react';
import styles from '../index.module.scss';
const kill = require('tree-kill');
const { confirm } = Modal;
import {
  AimOutlined,
  RedoOutlined,
  PlayCircleOutlined,
  CloseSquareOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { openFileInFolder } from 'electron/download/util';
interface IProps {
  terData: any; // 对应终端数据
  cmdData: any; // 当前终端
  actions: any;
  index: number; // 代表下标
  runOrder: any; // 执行指令
  stopOrder: any; // 停止执行
  resetOrder: any; // 重启
  clearBodyOut: any; // 清除
}
function index(props: IProps, ref: any) {
  const {
    terData,
    actions,
    cmdData,
    index,
    runOrder,
    stopOrder,
    resetOrder,
    clearBodyOut,
  } = props;
  useImperativeHandle(ref, () => ({
    removeWin,
    openPath,
    removeCmd,
  }));
  // 默认删除终端
  function removeWin() {
    if (cmdData.pid) {
      kill(cmdData.pid, 'SIGKILL');
    }
    if (clearBodyOut) {
      clearBodyOut();
    }
    actions.fetchRemoveOrder({
      delId: terData.id,
    });
  }
  // 删除当前终端
  function removeCmd() {
    confirm({
      title: `移除${terData.name || terData.webName}指令执行框?`,
      content: '移除后可通过执行库重新打开',
      okType: 'danger',
      centered: true,
      onOk() {
        if (cmdData.pid) {
          kill(cmdData.pid, 'SIGKILL');
        }
        if (clearBodyOut) {
          clearBodyOut();
        }
        actions.fetchRemoveOrder({
          delId: terData.id,
        });
      },
    });
  }
  // 打开文件路径
  function openPath() {
    if (terData.webFilePath) {
      openFileInFolder(terData.webFilePath);
    } else {
      message.error('文件路径丢失');
    }
  }
  return (
    <Row
      onMouseDown={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
      onMouseMove={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
      onMouseUp={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
      className={styles.col_header_div}
    >
      <Tooltip title={terData.queue || terData.webFilePath} placement="topLeft">
        <Col span={15} className={styles.col_header_title_div}>
          {terData.name || terData.webName}
        </Col>
      </Tooltip>
      <Col span={9} className={styles.col_btn_div}>
        {terData.type === '1' && (
          <Tooltip title="执行指令">
            <Button
              type="link"
              disabled={cmdData.pid}
              className={styles.icon_btn}
              onClick={runOrder}
            >
              <PlayCircleOutlined />
            </Button>
          </Tooltip>
        )}

        {terData.type === '1' && (
          <Tooltip title="重新执行指令" placement="top">
            <Button
              type="link"
              className={styles.icon_btn}
              onClick={resetOrder}
            >
              <RedoOutlined />
            </Button>
          </Tooltip>
        )}
        {terData.type === '2' && (
          <Tooltip title="在资源管理器中打开项目">
            <Button type="link" className={styles.icon_btn} onClick={openPath}>
              <FolderOpenOutlined />
            </Button>
          </Tooltip>
        )}
        <Tooltip title="停止执行指令" placement="top">
          <Button
            type="link"
            disabled={!cmdData.pid}
            className={styles.icon_btn}
            onClick={stopOrder}
            danger
          >
            <AimOutlined />
          </Button>
        </Tooltip>
        {/* {index != 0 && ( */}
        <Tooltip title="结束并关闭当前终端" placement="top">
          <Button
            type="link"
            className={styles.icon_btn}
            onClick={removeCmd}
            danger
          >
            <CloseSquareOutlined />
          </Button>
        </Tooltip>
        {/* )} */}
      </Col>
    </Row>
  );
}
export default forwardRef(index);

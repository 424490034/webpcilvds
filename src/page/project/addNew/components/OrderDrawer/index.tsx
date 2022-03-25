/**
 * @file 配置完成后执行指令的模态框
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Button, Drawer, message, Modal, Space } from 'antd';
import styles from './index.module.scss';
import { formatOrder } from '../../utils/drawerOrder';
import OutPutOrder from 'utils/orderOutPut';
import { executeOrder } from 'utils/xlOrder';
import { ExclamationCircleOutlined } from '@ant-design/icons';
let outputOrder: any = undefined;
let isOperation: boolean = false;
const { confirm } = Modal;
function index(props: any, ref: any) {
  const { drawerOk } = props;
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  /**
   * @function 打开抽屉
   * @param twoData 配置相关
   */
  async function showDrawer(twoData: any) {
    const { path: projectPath } = twoData;
    const order = await formatOrder(twoData);
    if (!order) {
      message.success('当前不存在需要执行的指令,即将前往下一步');
      drawerOk();
      return;
    }
    // 实例化指令构造函数
    outputOrder = new OutPutOrder({
      selete: '#drawer_div',
      callback: orderCallback,
    });
    setVisible(true);
    message.info('开始执行项目初始化!');
    executeOrder('项目初始化', order, outputOrder.outputStr, projectPath);
    isOperation = true;
    drawerOk();
  }
  function onClose() {
    if (isOperation) {
      confirm({
        title: '项目初始化执行中,是否切换到后台运行',
        icon: <ExclamationCircleOutlined />,
        content: '切换到后台运行不影响后续配置',
        onOk() {
          setVisible(false);
          outputOrder?.clearOut();
        },
        onCancel() {},
      });
      return;
    }
    setVisible(false);
    outputOrder?.clearOut();
  }
  function orderCallback(isError: boolean) {
    if (!isError) {
      isOperation = false;
    } else {
      isOperation = false;
    }
  }
  return (
    <Drawer
      title="配置执行窗口"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      keyboard={false}
      maskClosable={false}
      className={styles.drawer_div}
      width={500}
      headerStyle={{
        background: '#2a2e33',
        color: '#fff',
      }}
      bodyStyle={{
        padding: 0,
      }}
      closable={false}
      extra={
        <Space>
          <Button type="primary" onClick={onClose}>
            后台执行
          </Button>
        </Space>
      }
    >
      <div className={styles.git_result_div}>
        <div className={styles.result_title_div}>项目初始化指令执行</div>
        <div id="drawer_div" className={styles.result_body_div}></div>
      </div>
    </Drawer>
  );
}
export default forwardRef(index);

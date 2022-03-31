/**
 * @file 指令执行抽屉
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Drawer, Space, Button, Form } from 'antd';
import styles from './index.module.scss';
interface IProps {
  actions: any;
  models: any;
  terData: any;
  height: string;
  runPackageOrder: any;
  stopOrder: any;
  clearDiv: any;
}
function index(props: IProps, ref: any) {
  const { clearDiv, terData = {}, runPackageOrder, stopOrder } = props;
  const { projectData = {} } = terData;
  const [packageData, setPackageData] = useState<any>({}); // script对应数据
  const [packageList, setPaceageList] = useState<any>([]); // 解析后的key集合
  const [isError, setError] = useState(false);
  const [runKey, setRunKey] = useState<string>('');
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  async function showDrawer() {
    setVisible(true);
  }
  function onClose() {
    setVisible(false);
  }
  return (
    <Drawer
      title="自定义指令修改窗口"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      width={500}
      closable={false}
      className={styles.drawer_div}
      headerStyle={{
        background: '#2a2e33',
        color: '#fff',
      }}
      bodyStyle={{
        padding: 0,
      }}
      // extra={
      //   <Space>
      //     <Button type="primary" onClick={onEdit}>
      //       确认修改
      //     </Button>
      //     <Button type="primary" danger onClick={onClose}>
      //       取消修改
      //     </Button>
      //   </Space>
      // }
    >
      <div className={styles.git_result_div}>
        <div className={styles.result_title_div}>项目常规指令</div>
        <div className={styles.result_title_div}>项目内部指令</div>
      </div>
    </Drawer>
  );
}
export default forwardRef(index);

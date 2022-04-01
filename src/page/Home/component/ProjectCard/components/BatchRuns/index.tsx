/**
 * @file 批量运行抽屉
 */
import { Drawer, Space, Button, Form, Tooltip, message } from 'antd';
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import HistoryOrder from './components/historyOrder';
import AddBatchOrder from './components/AddBatchOrder';
import OrderModal from './components/orderModal';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
function index(props: any, ref: any) {
  const {
    actions,
    models: { historyProjectOrders },
  } = props;
  const modalRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState<any>();
  const [isDel, setIsDel] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>();
  const [editData, setEditData] = useState<any>({});
  // 为下面卡片选择数据
  const [selectList, setSelectList] = useState<any>([]);
  // 为最终运行调用
  const [runData, setRunData] = useState({});
  function addProjectOrder() {
    if (isAdd) {
      setIsAdd(false);
    } else {
      setIsAdd(true);
      // 默认只能选择一个操作 所以其他全部设置为false
      setIsDel(false);
      setIsEdit(false);
      setRunData({});
    }
  }
  function delProjectOrder() {
    if (isDel) {
      setIsDel(false);
    } else {
      // 默认只能选择一个操作 所以其他全部设置为false
      setIsAdd(false);
      setIsDel(true);
      setIsEdit(false);
      setRunData({});
    }
  }
  function editProjectOrder() {
    if (isEdit) {
      setIsEdit(false);
      setEditData({});
    } else {
      message.info('请选择你需要修改的指令');
      // 默认只能选择一个操作 所以其他全部设置为false
      setIsEdit(true);
      setIsAdd(false);
      setIsDel(false);
      setRunData({});
    }
  }
  function editBatchOrder(editOldData: any) {
    setEditData(editOldData);
    editProjectOrder();
  }
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  async function showDrawer() {
    setVisible(true);
  }
  function onClose() {
    setIsAdd(undefined);
    setIsDel(undefined);
    setIsEdit(undefined);
    setVisible(false);
  }
  function onRuns() {}
  function openModal() {
    modalRef.current.showModel(selectList, editData);
  }
  return (
    <Drawer
      title="批量执行窗口"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      width={500}
      closable={false}
      bodyStyle={{
        padding: '0 2px 0 0',
      }}
      extra={
        <Space>
          <Button disabled={isEmpty(runData)} type="primary" onClick={onRuns}>
            确认执行
          </Button>
          <Button type="primary" danger onClick={onClose}>
            取消执行
          </Button>
        </Space>
      }
    >
      <div className={styles.runs_body_div}>
        <div className={styles.subtitle_div}>
          <div className={styles.text_div}>历史快捷指令</div>
          <div className={styles.btn_div}>
            <Space>
              <PlusCircleOutlined
                title="新增快捷指令"
                className={classNames(
                  styles.icon_span,
                  isAdd ? styles.icon_span_selete : ''
                )}
                onClick={addProjectOrder}
              />
              <HighlightOutlined
                title="修改快捷指令"
                className={classNames(
                  styles.icon_span,
                  isEdit ? styles.icon_span_selete : ''
                )}
                onClick={editProjectOrder}
              />
              <DeleteOutlined
                title="移除快捷指令"
                className={classNames(
                  styles.icon_span_del,
                  isDel ? styles.icon_span_del_selete : ''
                )}
                onClick={delProjectOrder}
              />
            </Space>
          </div>
        </div>
        <HistoryOrder
          isAdd={isAdd}
          isEdit={isEdit}
          isDel={isDel}
          list={historyProjectOrders}
          runData={runData}
          setRunData={setRunData}
          editBatchOrder={editBatchOrder}
        />
        {isAdd !== undefined && (
          <div
            className={classNames(
              'animate__animated',
              isAdd ? 'animate__backInLeft' : 'animate__backOutRight'
            )}
          >
            <div className={classNames(styles.subtitle_div)}>
              <div className={styles.text_div}>指令配置</div>
              <div className={styles.btn_div}>
                <Button
                  type="primary"
                  onClick={openModal}
                  disabled={selectList.length === 0}
                >
                  生成快捷指令
                </Button>
              </div>
            </div>
            <AddBatchOrder
              selectList={selectList}
              setSelectList={setSelectList}
              actions={actions}
              models={props.models}
            />
          </div>
        )}
        {isEdit !== undefined && (
          <div
            className={classNames(
              'animate__animated',
              isEdit ? 'animate__backInLeft' : 'animate__backOutRight'
            )}
          >
            <div className={classNames(styles.subtitle_div)}>
              <div className={styles.text_div}>{editData.name}指令配置</div>
              <div className={styles.btn_div}>
                <Button
                  type="primary"
                  onClick={openModal}
                  disabled={selectList.length === 0}
                >
                  修改快捷指令
                </Button>
              </div>
            </div>
            <AddBatchOrder
              selectList={selectList}
              setSelectList={setSelectList}
              actions={actions}
              models={props.models}
            />
          </div>
        )}
      </div>
      <OrderModal actions={actions} models={props.models} ref={modalRef} />
    </Drawer>
  );
}
export default forwardRef(index);

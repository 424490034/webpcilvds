/**
 * @file 基础卡片
 */
import React, { useRef } from 'react';
import styles from './index.module.scss';
import {
  WindowsOutlined,
  DeploymentUnitOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { removeProjectData } from 'utils';
import { Modal } from 'antd';
import UpdateDrawer from './components/updateDrawer';
const { confirm } = Modal;
interface IProps {
  type: '1' | '2' | '3' | '4' | '5'; // 类型
  showOptions: Boolean; // 是否为展示工具栏
  setOptionsData: any; // 同步函数
  optionsData: any; // 对应选中工具卡数据
  item: any; // 当前工具卡数据
  actions: any; // 调用model方法
}
export default function index(props: IProps) {
  const {
    type,
    showOptions,
    setOptionsData,
    item = {},
    optionsData,
    actions,
  } = props;
  const updateRef: any = useRef();
  let typeDesc = '其他';
  let iconDesc = (
    <DeploymentUnitOutlined
      style={{
        color:
          optionsData.id === item.id
            ? 'var(--ant-primary-color-active)'
            : undefined,
      }}
    />
  );
  function openSetting() {
    if (showOptions) {
      // 为true表示正在展示其他工具栏
      if (!isEmpty(optionsData)) {
        // 对比id是否为同一id
        if (optionsData.id === item.id) {
          setOptionsData(undefined);
        } else {
          setOptionsData(item);
        }
      } else {
        setOptionsData(item);
      }
    } else {
      // 直接同步数据
      setOptionsData(item);
    }
  }
  switch (type) {
    case '5':
      break;
    default:
      typeDesc = '浏览器';
      iconDesc = (
        <WindowsOutlined
          style={{
            color:
              optionsData.id === item.id
                ? 'var(--ant-primary-color-active)'
                : undefined,
          }}
        />
      );
      break;
  }
  function del() {
    confirm({
      title: '确认删除该项目么?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后可重新添加',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        removeProjectData(item.id);
        actions.fetchProjectDetail();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function updateDrawer() {
    updateRef?.current?.showDrawer();
  }

  return (
    <div className={styles.basics_project_div}>
      <div className={styles.left_text_div}>
        <div className={styles.left_icon_div} onClick={openSetting}>
          {iconDesc}
        </div>
        <div
          className={styles.left_icon_div}
          title="修改自定义项目"
          onClick={updateDrawer}
        >
          <EditOutlined />
        </div>
        <div
          className={classNames(styles.left_icon_div, styles.remove_icon_div)}
          title="删除该项目"
          onClick={del}
        >
          <CloseCircleOutlined />
        </div>
      </div>
      <div className={styles.right_text_div}>
        <div className={styles.right_header_div}>
          <div className={styles.right_title_div}>指令名称</div>
          <div className={styles.right_body_div} title={item.name}>
            {item.name || '-'}
          </div>
        </div>
        <div className={styles.right_header_div}>
          <div className={styles.right_title_div}>项目类型</div>
          <div className={styles.right_body_div}>{typeDesc}</div>
        </div>
        <div className={styles.right_header_div}>
          <div className={styles.right_title_div}>指令队列</div>
          <div className={styles.right_body_div} title={item.orderQueue}>
            {item.orderQueue || '-'}
          </div>
        </div>
        <div className={styles.right_header_div}>
          <div className={styles.right_title_div}>项目执行路径</div>
          <div className={styles.right_body_div} title={item.orderPath}>
            {item.orderPath || '-'}
          </div>
        </div>
        <div className={styles.fix_btn_div} onClick={openSetting}>
          {/* <SettingOutlined /> */}
          <PlayCircleOutlined
            style={{
              color:
                optionsData.id === item.id
                  ? 'var(--ant-primary-color-active)'
                  : undefined,
            }}
          />
        </div>
      </div>
      <UpdateDrawer item={item} ref={updateRef} actions={actions} />
    </div>
  );
}

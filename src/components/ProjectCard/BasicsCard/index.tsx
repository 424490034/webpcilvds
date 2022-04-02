/**
 * @file 基础卡片
 */
import React, { useRef } from 'react';
import styles from './index.module.scss';
import UpdateDrawer from './components/updateDrawer';
import UpdateCustomDrawer from './components/updateCustomDrawer';
import { createTerminal } from 'utils';
import {
  WindowsOutlined,
  MobileOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
  ForkOutlined,
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { removeProjectData } from 'utils';
import { Modal, Space } from 'antd';
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
  const { projectData = {} } = item;
  const updateRef: any = useRef();
  const updateCustomRef: any = useRef();
  let typeDesc = undefined;
  let iconDesc = undefined;
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
    case '2':
      typeDesc = '移动端';
      iconDesc = (
        <MobileOutlined
          style={{
            color:
              optionsData.id === item.id
                ? 'var(--ant-primary-color-active)'
                : undefined,
          }}
        />
      );
      break;
    case '3':
      typeDesc = '服务端';
      iconDesc = (
        <DatabaseOutlined
          style={{
            color:
              optionsData.id === item.id
                ? 'var(--ant-primary-color-active)'
                : undefined,
          }}
        />
      );
    case '4':
      typeDesc = '其他';
      iconDesc = (
        <DesktopOutlined
          style={{
            color:
              optionsData.id === item.id
                ? 'var(--ant-primary-color-active)'
                : undefined,
          }}
        />
      );
      break;
    case '5':
      typeDesc = '其他';
      iconDesc = (
        <DeploymentUnitOutlined
          style={{
            color:
              optionsData.id === item.id
                ? 'var(--ant-primary-color-active)'
                : undefined,
          }}
        />
      );
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
  function updateDrawer() {
    updateRef?.current?.showDrawer();
  }
  function updateCustomDrawer() {
    updateCustomRef?.current?.showDrawer();
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
        if (optionsData.id === item.id) {
          setOptionsData(undefined);
        }
        removeProjectData(item.id);
        actions.fetchProjectDetail();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function addTerminal(cmdOrder: string) {
    createTerminal({
      id: item.id,
      cmdOrder,
    });
  }
  return (
    <div className={styles.basics_project_div}>
      <div className={styles.basics_body_div}>
        <div className={styles.left_text_div}>
          <div className={styles.left_icon_div} onClick={openSetting}>
            {iconDesc}
          </div>
          <div
            className={styles.left_icon_div}
            title="修改基础项目"
            onClick={updateDrawer}
          >
            <EditOutlined />
          </div>
          <div
            className={styles.left_icon_div}
            title="定制指令执行操作"
            onClick={updateCustomDrawer}
          >
            <ForkOutlined />
          </div>
          <div
            className={classNames(styles.left_icon_div, styles.remove_icon_div)}
            title="删除该项目"
            onClick={del}
          >
            <CloseCircleOutlined
              style={{
                color: 'var(--ant-error-color)',
              }}
            />
          </div>
        </div>
        <div className={styles.right_text_div}>
          <div className={styles.right_header_div}>
            <div className={styles.right_title_div}>项目名称</div>
            <div className={styles.right_body_div} title={projectData.name}>
              {projectData.name || '-'}
            </div>
          </div>
          <div className={styles.right_header_div}>
            <div className={styles.right_title_div}>项目类型</div>
            <div className={styles.right_body_div}>{typeDesc}</div>
          </div>
          <div className={styles.right_header_div}>
            <div className={styles.right_title_div}>git仓库</div>
            <div className={styles.right_body_div} title={projectData.gitName}>
              {projectData.gitName || '-'}
            </div>
          </div>
          <div className={styles.right_header_div}>
            <div className={styles.right_title_div}>默认启动指令</div>
            <div
              className={styles.right_body_div}
              title={projectData.startCode}
            >
              {projectData.startCode || '-'}
            </div>
          </div>
          <div className={styles.right_header_div}>
            <div className={styles.right_title_div}>默认打包指令</div>
            <div
              className={styles.right_body_div}
              title={projectData.buildCode}
            >
              {projectData.buildCode || '-'}
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
      </div>
      <UpdateDrawer item={item} ref={updateRef} actions={actions} />
      <UpdateCustomDrawer item={item} ref={updateCustomRef} actions={actions} />
    </div>
  );
}

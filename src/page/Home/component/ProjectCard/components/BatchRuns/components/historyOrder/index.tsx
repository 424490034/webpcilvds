/**
 * @file 历史快捷指令
 */
import { Empty, Space, Tag } from 'antd';
import { EmptyCard } from 'components';
import React from 'react';
import styles from '../../index.module.scss';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
interface IProps {
  list: any[];
  isDel: boolean;
  isAdd: boolean;
  isEdit: boolean;
  runData: any; // 选中数据
  setRunData: any; // 为默认状态下选中运行的状态
  editBatchOrder: any; // 编辑时调用
}
export default function index(props: IProps) {
  const {
    editBatchOrder,
    isDel,
    list = [],
    isAdd,
    isEdit,
    runData,
    setRunData,
  } = props;
  let color = '#096dd9';
  let icon = <></>;
  let cursor = 'pointer';
  if (isDel) {
    color = '#ff4d4f';
    icon = <DeleteOutlined />;
  } else if (isAdd) {
    color = '#91d5ff';
    icon = <PlusCircleOutlined />;
    cursor = 'no-drop';
  } else if (isEdit) {
    color = '#faad14';
    icon = <HighlightOutlined />;
  }

  if (list.length === 0) {
    return <EmptyCard title="请新增快捷指令" />;
  }
  function tagClick(id: string, item: any) {
    if (isDel) {
      // 执行删除操作
    } else if (isAdd) {
      // 执行新增操作-这里不做处理
    } else if (isEdit) {
      // 执行编辑操作
      editBatchOrder(item);
    } else {
      // 执行默认运行操作
      setRunData(item);
    }
  }
  return (
    <div className={styles.history_order_div}>
      <Space>
        {list.map((item: any, index: number) => {
          console.log(item);
          return (
            <Tag
              key={index}
              color={runData && runData.id === item.id ? '#87d068' : color}
              icon={icon}
              onClick={() => {
                tagClick(item.id, item);
              }}
              style={{
                cursor: cursor,
              }}
            >
              {item.name}
            </Tag>
          );
        })}
      </Space>
    </div>
  );
}

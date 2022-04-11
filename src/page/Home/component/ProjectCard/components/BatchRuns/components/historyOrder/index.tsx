/**
 * @file 历史快捷指令
 */
import { Input, Modal, Space, Tag } from 'antd';
import { EmptyCard } from 'components';
import React, { useEffect, useState } from 'react';
import styles from '../../index.module.scss';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  HighlightOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { delBatchRunsOrders } from 'utils';
interface IProps {
  list: any[];
  isDel: boolean;
  isAdd: boolean;
  isEdit: boolean;
  runData: any; // 选中数据
  setRunData: any; // 为默认状态下选中运行的状态
  editBatchOrder: any; // 编辑时调用
  actions: any;
}
const { confirm } = Modal;
export default function index(props: IProps) {
  const {
    editBatchOrder,
    isDel,
    list = [],
    isAdd,
    isEdit,
    runData,
    setRunData,
    actions,
  } = props;
  if (list.length === 0) {
    return <EmptyCard title="请新增快捷指令" />;
  }
  useEffect(() => {
    setSearchValue(undefined);
    setSearchList(list);
  }, [list]);
  const [searchValue, setSearchValue] = useState<string>();
  const [searchList, setSearchList] = useState<any[]>(list);

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

  function tagClick(id: string, item: any) {
    if (isDel) {
      // 执行删除操作
      confirm({
        title: '确定删除该快捷指令吗?',
        icon: <ExclamationCircleOutlined />,
        content: '删除后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          delBatchRunsOrders(id);
          actions.fetchProjectReload();
        },
      });
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
  function onInputChange(e: any) {
    const text = e.target.value;
    setSearchValue(text);
    if (text) {
      let ary = list.filter((item: any) => {
        return item.name.indexOf(text) !== -1;
      });
      setSearchList(ary);
    } else {
      setSearchList(list);
    }
  }
  return (
    <div className={styles.history_order_div}>
      <div className={styles.search_input_div}>
        <Input
          onChange={onInputChange}
          prefix={<SearchOutlined />}
          className={styles.search_input}
          placeholder="搜索"
          value={searchValue}
        />
      </div>
      <div className={styles.history_over_div}>
        {searchList.length > 0 ? (
          <>
            {searchList.map((item: any, index: number) => {
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
                    margin: '0 8px 8px 0',
                  }}
                >
                  {item.name}
                </Tag>
              );
            })}
          </>
        ) : (
          <EmptyCard title="暂无匹配项" />
        )}
      </div>
    </div>
  );
}

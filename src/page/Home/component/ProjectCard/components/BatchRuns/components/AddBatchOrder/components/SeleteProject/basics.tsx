/**
 * @file 基础展示组件
 */
import React from 'react';
import styles from '../../index.module.scss';
import { initOrderLabels } from 'config/initOrder';
import { Space, Tag, Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
interface IProps {
  item: any; // 对应数据
  del: any;
}
export default function basics(props: IProps) {
  const { item, del } = props;
  return (
    <div className={styles.select_project_body_div}>
      <span className={styles.title_span}>
        {item?.name || item?.projectData?.name || '-'}
      </span>
      <span className={styles.tag_span}>
        <Space>
          {item.terminalKey && (
            <Tag
              color={'#f50'}
              style={{
                marginRight: 0,
              }}
            >
              {initOrderLabels[item.terminalKey]}
            </Tag>
          )}
          {item.terminalKey && item.initOrderKey && <span>+</span>}
          {item.initOrderKey && (
            <Tag
              color={'#2db7f5'}
              style={{
                marginRight: 0,
              }}
            >
              {item.initOrderKey === 'initRunOrder'
                ? '指令运行'
                : item.initOrderKey}
            </Tag>
          )}
        </Space>
      </span>
      <Popconfirm
        placement="left"
        onConfirm={() => {
          del(item.id);
        }}
        title={
          <div
            style={{
              width: 100,
            }}
          >
            确定删除吗？
          </div>
        }
        okText="确定"
        cancelText="取消"
      >
        <span className={styles.del_icon_span}>
          <CloseCircleOutlined />
        </span>
      </Popconfirm>
    </div>
  );
}

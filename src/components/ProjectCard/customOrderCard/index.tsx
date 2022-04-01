/**
 * @file 指令卡片
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { initOrders } from 'config/initOrder';
import { Tag, Space, Tooltip } from 'antd';
import { createTerminal } from 'utils';
import { getPackage } from 'utils/GitUtils';
import { orderNow } from 'utils/xlOrder';
import { openFileInFolder } from 'electron/download/util';
interface IProps {
  data: any;
}
export default function index(props: IProps) {
  const { data = {} } = props;

  function initOrderRun(order: string) {
    switch (order) {
      case 'custom1':
        data && data.orderPath && openFileInFolder(data.orderPath);
        break;

      default:
        orderNow(order, data.orderPath);
        break;
    }
  }
  function addTerminal() {
    createTerminal({
      id: data.id,
      orderName: data.orderQueue,
      status: 'createOrder',
    });
  }
  return (
    <div className={styles.order_div}>
      <div className={styles.order_name_div}>
        <div className={styles.title_text_div}>项目名称</div>
        <div className={styles.body_order_div}>{data.name}</div>
      </div>
      <div className={styles.order_custom_div}>
        <div className={styles.title_text_div}>常规指令</div>
        <div className={styles.body_order_div}>
          {Array.isArray(initOrders) &&
            initOrders.length > 0 &&
            initOrders.map((item: any, index: number) => {
              return (
                <Tooltip key={index} title={item.desc}>
                  <Tag
                    className={styles.tag_span}
                    onClick={() => {
                      initOrderRun(item.value);
                    }}
                    color={'#f50'}
                  >
                    {item.label}
                  </Tag>
                </Tooltip>
              );
            })}
        </div>
      </div>
      <div className={styles.order_body_div}>
        <div className={styles.title_text_div}>项目指令</div>
        <div className={styles.body_order_div}>
          <Tooltip title={data.orderQueue}>
            <Tag
              onClick={addTerminal}
              className={styles.tag_span}
              color={'#2db7f5'}
            >
              指令执行
            </Tag>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

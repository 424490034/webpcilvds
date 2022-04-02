/**
 * @file 根据item展示对应选项-非项目
 */
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styles from '../../index.module.scss';
import { initOrders } from 'config/initOrder';
import { getPackage } from 'utils/GitUtils';
import { Tag, Tooltip } from 'antd';
import classNames from 'classnames';
interface IProps {
  item: any; //  对应数据
  data: any | undefined; // 选中数据
  setData: any; // 同步函数
}
export default function Basics(props: IProps) {
  const { item, data, setData } = props;
  /**
   * @function 基础指令添加函数
   * @param terminalKey 对应终端识别key
   */
  function addBasicsOrder(terminalKey: string) {
    let orderData = undefined;
    if (isEmpty(data)) {
      orderData = {
        ...item,
        terminalKey,
      };
    } else {
      if (data.terminalKey === terminalKey) {
        // 取消选中
        orderData = {
          ...data,
          terminalKey: undefined,
        };
      } else {
        orderData = {
          ...data,
          terminalKey,
        };
      }
    }
    setData(item.id, orderData);
  }
  /**
   * @function 项目指令添加函数
   * @param initOrderKey
   */
  function addInitOrderKey(initOrderKey: string) {
    let orderData = undefined;
    if (isEmpty(data)) {
      orderData = {
        ...item,
        initOrderKey,
      };
    } else {
      if (data.initOrderKey === initOrderKey) {
        // 取消选中
        orderData = {
          ...data,
          initOrderKey: undefined,
        };
      } else {
        orderData = {
          ...data,
          initOrderKey,
        };
      }
    }
    setData(item.id, orderData);
  }
  return (
    <div
      className={classNames(
        styles.project_config_div,
        'animate__animated',
        'animate__backInRight'
      )}
    >
      <div className={styles.text_subtitle_div}>常规指令</div>
      <div className={styles.init_order_div}>
        {Array.isArray(initOrders) &&
          initOrders.length > 0 &&
          initOrders.map((res: any, index: number) => {
            const isPath = !!item.orderPath;
            if (!isPath && res.needPath) {
              return null;
            }
            return (
              <Tooltip key={index} title={res.desc}>
                <Tag
                  className={styles.tag_span}
                  onClick={() => {
                    addBasicsOrder(res.terminalKey);
                  }}
                  color={
                    data && data.terminalKey === res.terminalKey
                      ? '#87d068'
                      : '#f50'
                  }
                >
                  {res.label}
                </Tag>
              </Tooltip>
            );
          })}
      </div>
      <div className={styles.text_subtitle_div}>项目指令</div>
      <div className={styles.project_order_div}>
        <Tooltip title={item.orderQueue}>
          <Tag
            onClickCapture={() => {
              addInitOrderKey('initRunOrder');
            }}
            className={styles.tag_span}
            color={
              data && data.initOrderKey === 'initRunOrder'
                ? '#87d068'
                : '#2db7f5'
            }
          >
            指令运行
          </Tag>
        </Tooltip>
      </div>
    </div>
  );
}

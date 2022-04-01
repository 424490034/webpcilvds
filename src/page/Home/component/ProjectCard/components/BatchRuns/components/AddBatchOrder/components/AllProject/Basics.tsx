/**
 * @file 根据item展示对应选项
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
  const { item, data = {}, setData } = props;
  const { projectData } = item;
  const [packageScripts, setPaceageScripts] = useState<any>([]);
  useEffect(() => {
    if (!isEmpty(projectData) && packageScripts.length === 0) {
      getPackageData();
    }
  }, []);
  async function getPackageData() {
    let data = await getPackage(projectData.path);
    let Enum = !isEmpty(data)
      ? Object.keys(data).map((item: any) => {
          return {
            label: item,
            value: data[item],
          };
        })
      : [];
    setPaceageScripts(Enum);
  }
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
      orderData = {
        ...data,
        terminalKey,
      };
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
      orderData = {
        ...data,
        initOrderKey,
      };
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
          initOrders.map((item: any, index: number) => {
            return (
              <Tooltip key={index} title={item.desc}>
                <Tag
                  className={styles.tag_span}
                  onClick={() => {
                    addBasicsOrder(item.terminalKey);
                  }}
                  color={
                    data && data.terminalKey === item.terminalKey
                      ? '#87d068'
                      : '#f50'
                  }
                >
                  {item.label}
                </Tag>
              </Tooltip>
            );
          })}
      </div>
      <div className={styles.text_subtitle_div}>项目指令</div>
      <div className={styles.project_order_div}>
        {Array.isArray(packageScripts) &&
          packageScripts.length > 0 &&
          packageScripts.map((item: any, index: number) => {
            return (
              <Tooltip key={index} title={item.value}>
                <Tag
                  className={styles.tag_span}
                  onClick={() => {
                    addInitOrderKey(item.label);
                  }}
                  color={
                    data && data.initOrderKey === item.label
                      ? '#87d068'
                      : '#2db7f5'
                  }
                >
                  {item.label}
                </Tag>
              </Tooltip>
            );
          })}
      </div>
    </div>
  );
}

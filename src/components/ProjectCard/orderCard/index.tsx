/**
 * @file 指令卡片
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { initOrders } from 'config/initOrder';
import { Tag, Space, Tooltip } from 'antd';
import { getPackage } from 'utils/GitUtils';
import { createTerminal } from 'utils';
import { orderNow } from 'utils/xlOrder';
import { openFileInFolder } from 'electron/download/util';
interface IProps {
  data: any;
}
export default function index(props: IProps) {
  const { data = {} } = props;
  const { projectData = {} } = data;
  const [sctipts, setScripts] = useState<any>([]);
  useEffect(() => {
    if (projectData.path) {
      getData();
    }
  }, [data]);
  async function getData() {
    if (projectData.path) {
      let list = await getPackage(projectData.path);
      list = Object.keys(list).map((item: any) => {
        return {
          label: item,
          value: list[item],
        };
      });
      setScripts(list);
    }
  }
  function initOrderRun(order: string) {
    switch (order) {
      case 'custom1':
        projectData && projectData.path && openFileInFolder(projectData.path);
        break;

      default:
        orderNow(order, projectData.path);
        break;
    }
  }
  function addTerminal(cmdOrder: string) {
    createTerminal({
      id: data.id,
      status: 'createOrder',
      orderName: cmdOrder,
    });
  }
  return (
    <div className={styles.order_div}>
      <div className={styles.order_name_div}>
        <div className={styles.title_text_div}>项目名称</div>
        <div className={styles.body_order_div}>{projectData.name}</div>
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
          {Array.isArray(sctipts) &&
            sctipts.length > 0 &&
            sctipts.map((item: any, index: number) => {
              return (
                <Tooltip key={index} title={item.value}>
                  <Tag
                    onClick={() => {
                      addTerminal(item.label);
                    }}
                    className={styles.tag_span}
                    color={'#2db7f5'}
                  >
                    {item.label}
                  </Tag>
                </Tooltip>
              );
            })}
        </div>
      </div>
    </div>
  );
}

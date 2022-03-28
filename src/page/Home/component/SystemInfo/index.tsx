/**
 * @file 系统信息卡片
 */
import React from 'react';
import allStyles from '../../index.module.scss';
import pageConfig from '../../config/pageConfig';
import styles from './index.module.scss';
import { Tooltip } from 'antd';
enum winOS {
  'Windows_NT' = 'window系统',
  'linux' = 'linux系统',
  'Darwin' = '苹果系统',
}
const { namespace } = pageConfig;
export default function index(props: any) {
  const {
    [namespace]: { sysInfo = {} },
  } = props;
  return (
    <div className={allStyles.left_card_div}>
      {/* 主机名称 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="主机名">
          主机名
        </span>
        <span className={styles.body_span}>{sysInfo.hostName}</span>
      </div>
      {/* 操作系统 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="操作系统">
          操作系统
        </span>
        <span className={styles.body_span}>
          {winOS[sysInfo.os]}
          <span
            className={styles.sub_body_span}
            style={{
              marginLeft: 8,
            }}
          >
            版本号:{sysInfo.release}
          </span>
        </span>
      </div>
      {/* cpu架构 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="cpu架构">
          cpu架构
        </span>
        <span className={styles.body_span}>
          {sysInfo?.cpuDetail?.model}-{sysInfo.arch}处理器
        </span>
      </div>
      {/* cpu信息 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="cpu信息">
          cpu信息
        </span>
        <span className={styles.body_span}>
          <span className={styles.sub_body_span}> 频率: </span>
          {sysInfo?.cpuDetail?.mhz}
          <span className={styles.sub_body_span}> 频率-运行时间: </span>
          {sysInfo.upTime}
        </span>
      </div>
      {/* 内存信息 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="内存信息">
          内存信息
        </span>
        <span className={styles.body_span}>
          <span
            className={styles.sub_body_span}
            style={{
              marginRight: 8,
            }}
          >
            总内存:
          </span>
          {sysInfo?.ram?.totalMem}
          <span
            className={styles.sub_body_span}
            style={{
              margin: '0 8px',
            }}
          >
            空闲内存:
          </span>
          {sysInfo?.ram?.freeMem}
          <span
            className={styles.sub_body_span}
            style={{
              margin: '0 8px',
            }}
          >
            已使用:
          </span>
          {sysInfo?.ram?.useMem}
        </span>
      </div>
      {/* node信息 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="node信息">
          node信息
        </span>
        <span className={styles.body_span}>
          <span
            className={styles.sub_body_span}
            style={{
              marginRight: 8,
            }}
          >
            node版本:
          </span>
          {sysInfo?.nodeVer?.node}
          <span
            className={styles.sub_body_span}
            style={{
              margin: '0 8px',
            }}
          >
            electron版本:
          </span>
          {sysInfo?.nodeVer?.electron}
        </span>
      </div>
      {/* 系统负载 */}
      <div className={styles.name_title_div}>
        <span className={styles.title_span} title="系统负载">
          系统负载
        </span>
        <span className={styles.body_span}>{`${sysInfo.load}`}</span>
      </div>
    </div>
  );
}

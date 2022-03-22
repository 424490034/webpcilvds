/**
 * @file 系统信息卡片
 */
import React from 'react';
import styles from './index.module.scss';
import { Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import { copyText } from 'utils';
enum winOS {
  'Windows_NT' = 'window系统',
  'linux' = 'linux系统',
  'Darwin' = '苹果系统',
}
export default function index(props: any) {
  const {
    models: { sysInfo },
  } = props;
  const gateKeys = !isEmpty(sysInfo.networks)
    ? Object.keys(sysInfo.networks)
    : [];
  return (
    <div className={styles.gateWay_card_div}>
      <div className={styles.auto_scroll_div}>
        {Array.isArray(gateKeys) && gateKeys.length > 0
          ? gateKeys.map((item: string, index: number) => {
              let data = sysInfo.networks[item];
              return (
                <>
                  <div key={index} className={styles.name_title_div}>
                    <span className={styles.title_span} title="网关名">
                      网关名
                    </span>
                    <span className={styles.body_span}>{item}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: 16,
                    }}
                  >
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((res: any, ind: number) => {
                        return (
                          <Tooltip
                            title={`网关${item}-${index}参数`}
                            placement="left"
                            key={ind}
                          >
                            <div className={styles.name_title_div}>
                              <span
                                className={styles.body_span}
                                style={{
                                  marginLeft: -8,
                                }}
                              >
                                网关{ind}
                              </span>
                            </div>
                            <div className={styles.name_title_div}>
                              <span className={styles.title_span}>网关ip</span>
                              <span className={styles.body_span}>
                                <a
                                  onClick={() => {
                                    copyText(res.address);
                                  }}
                                >
                                  {res.address}
                                </a>
                              </span>
                            </div>
                            <div className={styles.name_title_div}>
                              <span className={styles.title_span}>
                                网关掩码
                              </span>
                              <span className={styles.body_span}>
                                <a
                                  onClick={() => {
                                    copyText(res.netmask);
                                  }}
                                >
                                  {res.netmask}
                                </a>
                              </span>
                            </div>
                            <div className={styles.name_title_div}>
                              <span className={styles.title_span}>
                                物理地址
                              </span>
                              <span className={styles.body_span}>
                                <a
                                  onClick={() => {
                                    copyText(res.mac);
                                  }}
                                >
                                  {res.mac}
                                </a>
                              </span>
                            </div>
                            <div className={styles.name_title_div}>
                              <span className={styles.title_span}>协议族</span>
                              <span className={styles.body_span}>
                                <a
                                  onClick={() => {
                                    copyText(res.family);
                                  }}
                                >
                                  {res.family}
                                </a>
                              </span>
                            </div>
                          </Tooltip>
                        );
                      })}
                  </div>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
}

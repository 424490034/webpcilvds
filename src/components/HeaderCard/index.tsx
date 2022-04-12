/**
 * @file 定制化页面展示卡片
 */
import React from 'react';
import styles from './index.module.scss';
import { LogoutOutlined } from '@ant-design/icons';
import router from 'utils/History';
import bgcSvg from 'assets/bg.svg';
interface IProps {
  title: string; // 标头
  id?: string; // id跳转
  customCom?: any; // 右侧自定义组件
  [name: string]: any;
}
export default function index(props: IProps) {
  const { children, title, id, customCom } = props;
  return (
    <div className={styles.header_card_div} id={id}>
      <div className={styles.header_title_div}>
        <div className={styles.header_text_div}>
          <div className={styles.content_div}>{title}</div>
        </div>
        <div className={styles.back_div} title="返回上一页">
          {customCom && (
            <div
              style={{
                marginRight: 8,
              }}
            >
              {customCom}
            </div>
          )}
          <LogoutOutlined onClick={router.goBack} />
        </div>
      </div>
      <div
        className={styles.bgc_div}
        style={{
          maxHeight: 'calc(100% - 45px)',
        }}
      >
        <div className={styles.header_body_div}>
          {children && React.cloneElement(children, { show: `${props.show}` })}
          <div className={styles.bgc_img_div}>
            <img src={bgcSvg} />
          </div>
        </div>
      </div>
    </div>
  );
}

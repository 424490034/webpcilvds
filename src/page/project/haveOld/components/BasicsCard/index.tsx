/**
 * @file 基础选择卡片
 */
import React from 'react';
import styles from '../../index.module.scss';
import {
  FolderOpenOutlined,
  FileWordOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
export default function index(props: any) {
  const { setProjectData } = props;
  return (
    <div className={styles.selete_card}>
      <div
        onClick={() => {
          setProjectData(1);
        }}
        className={classNames(
          styles.selete_body_card,
          'animate__animated',
          'animate__bounceInLeft'
        )}
      >
        <div className={styles.basics_body_div}>
          <div className={styles['body-ribbon']}>
            <span className={styles['body-ribbon-text']}>{'自定义指令'}</span>
            <div className={styles['body-ribbon-corner']}></div>
          </div>
          <div className={styles.add_icon_div}>
            <FolderOpenOutlined />
          </div>
          <div className={styles.text_div}>自定义指令</div>
          <Tooltip title="类似于需要进入到某个文件夹执行的指令,如mongod --dbpath D:/sjk/">
            <div className={styles.header_title_div}>
              <div className={styles.header_text_div}>
                <div className={styles.content_div}>
                  自定义
                  <QuestionCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
      <div
        onClick={() => {
          setProjectData(2);
        }}
        className={classNames(
          styles.selete_body_card,
          'animate__animated',
          'animate__bounceInRight'
        )}
        style={{
          marginLeft: 12,
        }}
      >
        <div className={styles.basics_body_div}>
          <div className={styles['body-ribbon']}>
            <span className={styles['body-ribbon-text']}>{'前端项目'}</span>
            <div className={styles['body-ribbon-corner']}></div>
          </div>
          <div className={styles.add_icon_div}>
            <FileWordOutlined />
          </div>
          <div className={styles.text_div}>前端项目</div>
          <Tooltip title="对已存在电脑中的前端项目进行统一管理">
            <div className={styles.header_title_div}>
              <div className={styles.header_text_div}>
                <div className={styles.content_div}>
                  web项目
                  <QuestionCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

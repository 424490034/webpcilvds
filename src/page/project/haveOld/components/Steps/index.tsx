/**
 * @file 步骤条组件
 */
import React from 'react';
import { Steps } from 'antd';
import styles from './index.module.scss';
const { Step } = Steps;
interface IProps {
  current: number;
  models: any;
  isProject: number;
}
export default function index(props: IProps) {
  const {
    current,
    models: { stepsEnum, INITENUM },
    isProject,
  } = props;
  let list = isProject === 1 ? INITENUM : stepsEnum;
  return (
    <div className={styles.steps_div}>
      <Steps current={current}>
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item: any, index: number) => {
            return <Step key={index} title={item.title} icon={item.icon} />;
          })}
      </Steps>
    </div>
  );
}

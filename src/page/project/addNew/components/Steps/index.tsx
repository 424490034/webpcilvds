/**
 * @file 步骤条组件
 */
import React from 'react';
import { Steps } from 'antd';
import styles from './index.module.scss';
const { Step } = Steps;
interface IProps {
  setCurrent: any;
  current: number;
  models: any;
}
export default function index(props: IProps) {
  const {
    current,
    setCurrent,
    models: { stepsEnum },
  } = props;
  return (
    <div className={styles.steps_div}>
      <Steps current={current}>
        {Array.isArray(stepsEnum) &&
          stepsEnum.length > 0 &&
          stepsEnum.map((item: any, index: number) => {
            return <Step key={index} title={item.title} icon={item.icon} />;
          })}
      </Steps>
    </div>
  );
}

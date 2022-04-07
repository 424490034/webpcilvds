/**
 * @file 拟态按钮设计
 */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Row, Col } from 'antd';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
export default function index(props: IProps) {
  const { show } = props;
  if (show !== 'true') {
    return <></>;
  }
  const [select, setSelect] = useState('leftTop');
  // 样式对象
  const [codeObj, setCodeObj] = useState<any>({});
  let leftCardProps = {
    select,
    setSelect,
    codeObj,
  };
  return (
    <Row
      className={styles.mimesis_div}
      style={{
        background:
          codeObj && codeObj.background ? codeObj.background : '#cccccc',
      }}
    >
      <Col span={12}>
        <LeftCard {...leftCardProps} />
      </Col>
      <Col span={12}>
        <RightCard select={select} codeObj={codeObj} setCodeObj={setCodeObj} />
      </Col>
    </Row>
  );
}

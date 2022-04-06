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
}
export default function index(props: IProps) {
  const [select, setSelect] = useState('leftTop');
  let leftCardProps = {
    select,
    setSelect,
  };
  return (
    <Row
      className={styles.mimesis_div}
      style={{
        background: '#cccccc',
      }}
    >
      <Col span={12}>
        <LeftCard {...leftCardProps} />
      </Col>
      <Col span={12}>
        <RightCard />
      </Col>
    </Row>
  );
}

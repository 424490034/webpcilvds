/**
 * @file 为空的占位组件
 */
import { Empty } from 'antd';
import React from 'react';
interface IProps {
  title: string;
}
export default function index(props: IProps) {
  const { title } = props;
  return (
    <div className={'empty_div'}>
      <Empty description={title} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}

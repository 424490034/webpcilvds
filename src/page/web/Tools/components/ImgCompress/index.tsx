/**
 * @file 图片压缩组件
 */
import React from 'react';
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
export default function index(props: IProps) {
  const { models, actions, show } = props;
  if (show !== 'true') {
    return <></>;
  }
  return <div>index</div>;
}

/**
 * @file 颜色转换组件
 */
import React from 'react';
import { Filter } from 'xl-study-com';
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

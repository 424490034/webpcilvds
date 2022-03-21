/**
 * @file 用于搜索对应输入路由
 */
import { Input } from 'antd';
import styles from './index.module.scss';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { routePaths } from 'config/router';
interface IProps {
  InputChange: any;
}
export default function index(props: IProps) {
  const { InputChange } = props;
  function onInputChange(e: any) {
    const text = e.target.value;
    if (text) {
      let ary = routePaths.filter(
        (item: any) => item.name.indexOf(text) !== -1
      );
      InputChange(ary);
    } else {
      InputChange(routePaths);
    }
  }
  return (
    <div className={styles.search_input_div}>
      <Input
        onChange={onInputChange}
        prefix={<SearchOutlined />}
        className={styles.search_input}
        placeholder="搜索"
      />
    </div>
  );
}

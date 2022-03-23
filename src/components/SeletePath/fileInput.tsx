/**
 * @file 路径选择组件
 * @description electron特有
 */
import { Input } from 'antd';
import React, { useState } from 'react';
import { INewDownloadFile } from './interface';
import { EllipsisOutlined } from '@ant-design/icons';
import { openSeleteFile } from './ipc-renderer';
interface IProps {
  placeholder: any;
  onChange: any;
  onBlur: any;
  id: string;
  value: any;
  disabled?: any;
}
export default function index(props: IProps) {
  const { placeholder, id, value, onChange, disabled } = props;
  // 选择保存位置
  const handleChoosePath = async () => {
    const newPath = await openSeleteFile(value || '');
    handleFormChange(newPath);
  };
  // 设置表单值
  const handleFormChange = (data: string) => {
    onChange(data);
  };
  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      readOnly
      value={value}
      allowClear
      addonAfter={
        <EllipsisOutlined onClick={disabled ? () => {} : handleChoosePath} />
      }
      onClick={handleChoosePath}
    />
  );
}

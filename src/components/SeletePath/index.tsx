/**
 * @file 路径选择组件
 * @description electron特有
 */
import { Input } from 'antd';
import React, { useState } from 'react';
import { INewDownloadFile } from './interface';
import { EllipsisOutlined } from '@ant-design/icons';
import {
  retryDownloadFile,
  getDownloadPath,
  newDownloadFile,
  openFileDialog,
} from './ipc-renderer';
interface IProps {
  placeholder: any;
  onChange: any;
  onBlur?: any;
  id?: string;
  value: any;
  disabled?: boolean;
}
export default function index(props: IProps) {
  const { placeholder, id, value, onChange, disabled } = props;
  // 选择保存位置
  const handleChoosePath = async () => {
    const newPath = await openFileDialog(value || '');
    handleFormChange(newPath);
  };
  // 设置表单值
  const handleFormChange = (data: string) => {
    onChange(data);
  };
  return (
    <Input
      placeholder={placeholder}
      readOnly
      value={value}
      disabled={disabled}
      addonAfter={
        <EllipsisOutlined onClick={disabled ? () => {} : handleChoosePath} />
      }
      onClick={handleChoosePath}
    />
  );
}

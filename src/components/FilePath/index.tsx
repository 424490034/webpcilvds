/**
 * @file 文件选择封装
 */
import React from 'react';
import { Input } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { openSeleteFile } from '../SeletePath/ipc-renderer';
interface IProps {
  placeholder: any;
  onChange: any;
  onBlur?: any;
  id?: string;
  value: any;
  disabled?: boolean;
  accept?: string;
}
export default function index(props: IProps) {
  const { value, disabled, placeholder, onBlur, onChange, accept } = props;
  // 选择保存位置
  const handleChoosePath = async () => {
    const newPath = await openSeleteFile(value || '', {
      filters: [{ name: 'Images', extensions: ['jpg', '.jpeg', 'png'] }],
    });
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
      onBlur={onBlur}
      accept={accept}
      addonAfter={
        <EllipsisOutlined onClick={disabled ? () => {} : handleChoosePath} />
      }
      onClick={handleChoosePath}
    />
  );
}

import React from 'react';
export const ColConfig = {
  xs: 24, // <576
  sm: 24, // >= 576
  md: 24, // >= 768
  lg: 24, // >= 992
  xl: 24, // >= 1200
  xxl: 24, // >= 1600
};

export const formItemLayout = {
  labelCol: {
    span: 8,
  }, // 左侧 label 宽度
  wrapperCol: {
    span: 16,
  }, // 右侧 控件 宽度
  style: {
    marginBottom: 24,
  },
};

/**
 * @file 定向打包指令执行补充表单
 */
export default [
  {
    inputType: 'input',
    title: 'buildFilePath',
    label: '项目打包路径',
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入项目打包路径',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请输入',
      autoComplete: 'off',
      allowClear: true,
      maxLength: 100,
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'custom3',
    label: '项目复制路径',
    title: 'movePath',
    formItemLayout,
    // isCom: true,
    ColConfig,
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请选择项目复制路径',
        },
      ],
    },
    componentsConfig: {},
    render: () => <div></div>,
  },
  {
    inputType: 'radio',
    title: 'isClear',
    label: '路径存在文件',
    itemConfig: {
      initialValue: '1',
      rules: [
        {
          required: true,
          message: '请选择项目类型',
        },
      ],
    },
    componentsConfig: {
      defaultValue: '1',
      options: [
        {
          label: '清空',
          value: '1',
        },
        {
          label: '覆盖',
          value: '2',
        },
        {
          label: '停止',
          value: '3',
        },
      ],
    },
    formItemLayout,
    ColConfig,
  },
];

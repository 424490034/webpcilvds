import React from 'react';

export const ColConfig = {
  span: 24,
};

export const formItemLayout = {
  labelCol: { span: 8 }, // 左侧 label 宽度
  wrapperCol: { span: 12 }, // 右侧 控件 宽度
  style: {
    marginBottom: 24,
  },
};

export const customFormNames = {
  name: 'name',
  orderQueue: 'orderQueue',
  orderPath: 'orderPath',
};

export const customFormConditions = [
  {
    inputType: 'input',
    title: customFormNames.name,
    label: '指令名称',

    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入',
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
    inputType: 'input',
    title: customFormNames.orderQueue,
    label: '指令队列',

    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入',
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
    label: '项目执行路径',
    title: customFormNames.orderPath,
    formItemLayout,
    // isCom: true,
    ColConfig,
    itemConfig: {
      rules: [
        {
          required: false,
          message: '请选择项目执行路径',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择执行路径,不选即为默认路径',
    },
    render: () => <div></div>,
  },
];

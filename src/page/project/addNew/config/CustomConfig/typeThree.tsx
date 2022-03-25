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
 * @file 自定义指令执行补充表单
 */
export default [
  {
    inputType: 'input',
    title: 'customOrder',
    label: '自定义指令',
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入自定义指令',
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
];

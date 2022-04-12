import React from 'react';

export const ColConfig = {
  span: 12,
};

export const formItemLayout = {
  labelCol: {
    span: 6,
  }, // 左侧 label 宽度
  wrapperCol: {
    span: 16,
  }, // 右侧 控件 宽度
  style: {
    marginBottom: 24,
  },
};

export const imgCompressFormNames = {
  type: 'type',
  folderPath: 'folderPath',
  imgPath: 'imgPath',
  outputPath: 'outputPath',
  outputOption: 'outputOption',
};
// 默认展示文件夹key集合
export const initKeys = [
  imgCompressFormNames.type,
  imgCompressFormNames.folderPath,
  imgCompressFormNames.outputPath,
  // imgCompressFormNames.outputOption,
];
// 选择图片时展示key集合
export const initImgKeys = [
  imgCompressFormNames.type,
  imgCompressFormNames.imgPath,
  imgCompressFormNames.outputPath,
  // imgCompressFormNames.outputOption,
];
export const imgCompressFormConditions = [
  {
    inputType: 'radio',
    title: imgCompressFormNames.type,
    label: '文件类型',

    itemConfig: {
      initialValue: '1',

      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },

    componentsConfig: {
      defaultValue: '1',
      accept: '.jpg, .jpeg, .png,',
      options: [
        {
          label: '文件夹',
          value: '1',
        },
        {
          label: '图片',
          value: '2',
        },
      ],
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'custom3',
    title: imgCompressFormNames.folderPath,
    label: '文件夹路径',
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择对应文件夹路径',
      autoComplete: 'off',
      allowClear: true,
      maxLength: 100,
    },
    formItemLayout,
    ColConfig,
    render: () => <div></div>,
  },
  {
    inputType: 'custom3',
    title: imgCompressFormNames.imgPath,
    label: '图片路径',

    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入',
        },
      ],
    },

    componentsConfig: {
      placeholder: '请选择图片路径',
      autoComplete: 'off',
      allowClear: true,
      maxLength: 100,
    },
    formItemLayout,
    ColConfig,
    render: () => <div></div>,
  },
  {
    inputType: 'custom3',
    title: imgCompressFormNames.outputPath,
    label: '输出路径',

    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入',
        },
      ],
    },

    componentsConfig: {
      placeholder: '请选择图片输出路径',
      autoComplete: 'off',
      allowClear: true,
      maxLength: 100,
    },
    formItemLayout,
    ColConfig,
    render: () => <div></div>,
  },
  // {
  //   inputType: 'radio',
  //   title: imgCompressFormNames.outputOption,
  //   label: '输出路径非空',

  //   itemConfig: {
  //     initialValue: '2',

  //     rules: [
  //       {
  //         required: true,
  //         message: '请选择',
  //       },
  //     ],
  //   },

  //   componentsConfig: {
  //     defaultValue: '2',

  //     options: [
  //       {
  //         label: '清空',
  //         value: '1',
  //       },
  //       {
  //         label: '覆盖',
  //         value: '2',
  //       },
  //       {
  //         label: '停止',
  //         value: '3',
  //       },
  //     ],
  //   },
  //   formItemLayout,
  //   ColConfig,
  // },
];

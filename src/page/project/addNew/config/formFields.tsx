export const ColConfig = {
  span: 12,
};

export const formItemLayout = {
  labelCol: { span: 6 }, // 左侧 label 宽度
  wrapperCol: { span: 18 }, // 右侧 控件 宽度
  style: {
    marginBottom: 24,
  },
};

export const formNames = {
  gitName: 'gitName',
  name: 'name',
  path: 'path',
  type: 'type',
  startCode: 'startCode',
  buildCode: 'buildCode',
  package: 'package',
  installOrder: 'installOrder',
};

export const formConditions = [
  {
    inputType: 'input',
    title: formNames.gitName,
    label: 'git名称',
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
      disabled: true,
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'input',
    title: formNames.name,
    label: '项目名称',
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
    title: formNames.path,
    label: '项目路径',
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
      disabled: true,
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'radioButton',
    title: formNames.type,
    label: '项目类型',
    radioCondition: [
      {
        label: 'PC端',
        value: '1',
      },
      {
        label: '移动端',
        value: '2',
      },
      {
        label: '服务端',
        value: '3',
      },
      {
        label: '其他',
        value: '4',
      },
    ],
    itemConfig: {
      initialValue: '1',
      rules: [
        {
          required: true,
          message: '请输入',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'select',
    title: formNames.startCode,
    label: '默认启动指令',
    isAll: false,
    selectCondition: [],
    itemConfig: {
      rules: [
        {
          required: false,
          message: '请选择',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: false,
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'select',
    title: formNames.buildCode,
    label: '默认打包指令',
    isAll: false,
    selectCondition: [],
    itemConfig: {
      rules: [
        {
          required: false,
          message: '请选择',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: false,
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'radioButton',
    title: formNames.package,
    label: '依赖包安装',
    radioCondition: [
      {
        label: '默认安装',
        value: '1',
      },
      {
        label: '取消安装',
        value: '2',
      },
      {
        label: '自定义指令安装',
        value: '3',
      },
    ],
    itemConfig: {
      initialValue: '1',
      rules: [
        {
          required: true,
          message: '请输入',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'select',
    title: formNames.installOrder,
    label: '安装指令配置',
    isAll: false,
    selectCondition: [],
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: false,
    },
    formItemLayout,
    ColConfig,
  },
];

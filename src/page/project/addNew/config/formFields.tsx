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
  seleteGit: 'seleteGit',
  startCode: 'startCode',
  buildCode: 'buildCode',
  package: 'package',
  installOrder: 'installOrder',
};
// 默认展示项配置
export const initShowConfig = [
  formNames.gitName,
  formNames.name,
  formNames.path,
  formNames.type,
  formNames.seleteGit,
  formNames.startCode,
  formNames.buildCode,
  formNames.package,
];
// 全部展示项
export const allShowConfig = [...initShowConfig, formNames.installOrder];
export const formConditions = [
  {
    inputType: 'input',
    title: formNames.gitName,
    label: 'git名称',
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入git名称',
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
    title: formNames.path,
    label: '项目路径',
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请输入项目路径',
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
          message: '请输入项目名称',
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
    inputType: 'radio',
    title: formNames.type,
    label: '项目类型',
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
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'select',
    title: formNames.seleteGit,
    label: '当前分支',
    selectCondition: [],
    itemConfig: {
      rules: [
        {
          required: true,
          message: '请选择当前分支',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: false,
      showSearch: true,
      optionFilterProp: 'label',
      filterOption: (input: any, option: any) => {
        let { label } = option;
        return label.indexOf(input) > -1;
      },
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
          message: '请选择默认启动指令',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: true,
      showSearch: true,
      optionFilterProp: 'label',
      filterOption: (input: any, option: any) => {
        let { label } = option;
        return label.indexOf(input) > -1;
      },
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
          message: '请选择默认打包指令',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: true,
      showSearch: true,
      optionFilterProp: 'label',
      filterOption: (input: any, option: any) => {
        let { label } = option;
        return label.indexOf(input) > -1;
      },
    },
    formItemLayout,
    ColConfig,
  },
  {
    inputType: 'radio',
    title: formNames.package,
    label: '依赖安装方式',
    itemConfig: {
      initialValue: '1',
      rules: [
        {
          required: false,
          message: '请输入依赖安装方式',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      options: [
        {
          label: '默认',
          value: '1',
        },
        {
          label: '取消',
          value: '2',
        },
        {
          label: '自选指令',
          value: '3',
        },
      ],
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
          message: '请选择安装指令配置',
        },
      ],
    },
    componentsConfig: {
      placeholder: '请选择',
      allowClear: true,
      showSearch: true,
      optionFilterProp: 'label',
      filterOption: (input: any, option: any) => {
        let { label } = option;
        return label.indexOf(input) > -1;
      },
    },
    formItemLayout,
    ColConfig,
  },
];

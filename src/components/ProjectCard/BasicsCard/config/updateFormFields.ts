import { typeEnum,formNames } from 'page/project/addNew/config/formFields'
export const ColConfig = {
    span: 24,
  };
  
  export const formItemLayout = {
    labelCol: { span: 6 }, // 左侧 label 宽度
    wrapperCol: { span: 18 }, // 右侧 控件 宽度
    style: {
      marginBottom: 24,
    },
  };
  
export const FromNames = formNames; 
export const formConditions = [
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
          disabled: false,
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
          options: typeEnum,
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
]
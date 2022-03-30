/**
 * @file 新增定制化弹框
 */
/**
 * @file 新增弹框
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { SeletePath } from 'components';
import { EnhanceModal, FormBasics, ItemUtils } from 'xl-study-com';
import classNames from 'classnames';
import { Form, message } from 'antd';
import styles from '../../index.module.scss';
import {
  threeFormNames,
  threeFormConditions,
  extraEnum,
} from 'page/project/addNew/config/threeFormFields';
import customFormFields from 'page/project/addNew/config/CustomConfig';
import { cloneDeep } from 'lodash';
import { genID } from 'utils';
interface IProps {
  scriptEnum: any;
  actions: any;
  item: any;
  addData: any;
}
function index(props: IProps, ref: any) {
  const { scriptEnum, actions, item, addData } = props;
  const [extraAry, setExtraAry] = useState<any>();
  const [extraFilterEnum, setExtraFilterEnum] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  // 进行form表单配置
  const queryCondition: any = ItemUtils.getItemType(
    cloneDeep(threeFormConditions)
  )
    .extend([
      {
        title: threeFormNames.seleteOrder,
        selectCondition: scriptEnum,
      },
      {
        title: threeFormNames.timing,
        componentsConfig: {
          onChange: (value: any) => {
            form.setFieldsValue({
              [threeFormNames.extra]: undefined,
            });
            setExtraAry([]);
            if (value === '1') {
              // 筛选执行指令之前的枚举
              let data = extraEnum.filter(
                (item: any) => item.type === '1' || item.type === '3'
              );
              setExtraFilterEnum(data);
            } else if (value === '2') {
              // 筛选执行指令之后的枚举
              let data = extraEnum.filter(
                (item: any) => item.type === '2' || item.type === '3'
              );
              setExtraFilterEnum(data);
            }
          },
        },
      },
      {
        title: threeFormNames.extra,
        selectCondition: extraFilterEnum,
        componentsConfig: {
          disabled: extraFilterEnum.length == 0,
          onChange: (value: any) => {
            let data = customData(value);
            if (Array.isArray(data) && data.length > 0) {
              setExtraAry(data);
            } else {
              setExtraAry([]);
            }
          },
        },
      },
    ])
    .values();
  useImperativeHandle(ref, () => ({
    showModel,
  }));
  /**
   * @function 定制指令表单注入函数
   * @param value 当前用户选择
   */
  function customData(value: string) {
    let data = customFormFields[value];
    switch (value) {
      case '2': // 为定向打包是需要额外注入
        return ItemUtils.getItemType(cloneDeep(data))
          .extend([
            {
              title: 'buildFilePath',
              itemConfig: {
                initialValue:
                  item && item.projectData && item.projectData.path
                    ? item.projectData.path + '\\dist'
                    : undefined,
              },
            },
            {
              title: 'movePath',
              render: SeletePath,
            },
          ])
          .values();
      default:
        return data;
    }
  }
  function showModel() {
    setVisible(true);
  }
  function cancelModel() {
    form.resetFields();
    setExtraAry([]);
    setVisible(false);
  }
  function saveDownloadFile(values: any) {
    addData({
      ...values,
      id: genID(8) + '',
    });
    cancelModel();
  }
  const modalProps = {
    form,
    visible,
    queryCondition: queryCondition,
    // width: 740,
    title: '新增定制化分类',
    bodyStyle: {
      padding: '20px',
    },
    onCancel: cancelModel,
    onOk: saveDownloadFile,
    saveText: '确定',
  };
  let ItemProps = {
    form: form,
    queryCondition: queryCondition,
  };
  let fromProps = {
    form: form,
  };
  let customItemProps = {
    form: form,
    queryCondition: extraAry,
  };
  return (
    <EnhanceModal {...modalProps}>
      <div className={styles.git_result_div}>
        <FormBasics fromProps={fromProps} itemProps={ItemProps} />
        <div
          className={classNames(
            'animate__animated',
            Array.isArray(extraAry) && extraAry.length > 0
              ? 'animate__pulse'
              : 'animate__bounceOutRight'
          )}
        >
          {Array.isArray(extraAry) && extraAry.length > 0 && (
            <div className={styles.subtitle_div}>额外补充数据</div>
          )}
          <FormBasics fromProps={fromProps} itemProps={customItemProps} />
        </div>
      </div>
    </EnhanceModal>
  );
}
export default forwardRef(index);

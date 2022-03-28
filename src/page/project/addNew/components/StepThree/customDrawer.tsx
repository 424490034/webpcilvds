/**
 * @file 新增定制化抽屉
 */
import { Drawer, Space, Button, Form } from 'antd';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import styles from '../index.module.scss';
import { FormBasics, ItemUtils } from 'xl-study-com';
import { cloneDeep } from 'lodash';
import { SeletePath } from 'components';
import classNames from 'classnames';
import { genID } from 'utils';
function customDrawer(props: any, ref: any) {
  const {
    twoData,
    scriptEnum,
    addData,
    models: {
      threeFormNames,
      threeFormConditions,
      customFormFields,
      formNames,
      extraEnum, // 定向操作可选枚举
    },
  } = props;
  const [extraAry, setExtraAry] = useState<any>();
  const [extraFilterEnum, setExtraFilterEnum] = useState<any[]>([]);
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
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  function showDrawer() {
    setVisible(true);
  }
  function onClose() {
    setExtraAry([]);
    form.resetFields();
    setVisible(false);
  }
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
                initialValue: twoData[formNames.path] + '\\dist',
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
  function sumbitCustom() {
    form
      .validateFields()
      .then((values: any) => {
        console.log(values);
        addData({
          ...values,
          id: genID(8) + '',
        });
        onClose();
      })
      .catch(() => {});
  }
  return (
    <Drawer
      title="定制化配置窗口"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      //   keyboard={false}
      //   maskClosable={false}
      className={styles.order_drawer_div}
      width={500}
      closable={false}
      extra={
        <Space>
          <Button type="primary" onClick={sumbitCustom}>
            确认定制
          </Button>
          <Button type="primary" danger onClick={onClose}>
            取消
          </Button>
        </Space>
      }
    >
      <div className={styles.git_result_div}>
        <FormBasics fromProps={fromProps} itemProps={ItemProps} />
        <div
          className={classNames(
            'animate__animated',
            Array.isArray(extraAry) && extraAry.length > 0
              ? 'animate__bounceInRight'
              : 'animate__bounceOutRight'
          )}
        >
          {Array.isArray(extraAry) && extraAry.length > 0 && (
            <div className={styles.subtitle_div}>额外补充数据</div>
          )}
          <FormBasics fromProps={fromProps} itemProps={customItemProps} />
        </div>
      </div>
    </Drawer>
  );
}
export default forwardRef(customDrawer);

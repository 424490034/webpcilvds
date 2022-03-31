/**
 * @file 修改项目数据
 */
import { Drawer, Space, Button, Form } from 'antd';
import { createTerminal } from 'utils';
import { FormBasics, ItemUtils } from 'xl-study-com';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { SeletePath } from 'components';
import styles from '../../index.module.scss';
import {
  customFormNames,
  customFormConditions,
} from 'page/project/haveOld/config/customFormFields';
import { cloneDeep } from 'lodash';
import { updateProject } from 'utils';
function index(props: any, ref: any) {
  const { item, actions } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [scripts, setScripts] = useState([]);
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  // 进行form表单配置
  const queryCondition: any = ItemUtils.getItemType(
    cloneDeep(customFormConditions)
  )
    .extend([
      {
        title: customFormNames.orderPath,
        render: SeletePath,
      },
    ])
    .values();
  async function showDrawer() {
    form.setFieldsValue(item);
    setVisible(true);
  }
  function onClose() {
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
  function onEdit() {
    form
      .validateFields()
      .then((values: any) => {
        let data = {
          ...item,
          ...values,
        };
        updateProject(item.id, data);
        onClose();
        actions.fetchProjectDetail();
      })
      .catch(() => {});
  }

  return (
    <Drawer
      title="自定义指令修改窗口"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      width={500}
      closable={false}
      extra={
        <Space>
          <Button type="primary" onClick={onEdit}>
            确认修改
          </Button>
          <Button type="primary" danger onClick={onClose}>
            取消修改
          </Button>
        </Space>
      }
    >
      <div className={styles.drawer_div}>
        <FormBasics fromProps={fromProps} itemProps={ItemProps} />
      </div>
    </Drawer>
  );
}
export default forwardRef(index);

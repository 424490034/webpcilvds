/**
 * @file 修改项目数据抽屉
 */
import { Drawer, Space, Button, Form } from 'antd';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { FormBasics, ItemUtils } from 'xl-study-com';
import { formConditions, FromNames } from '../../config/updateFormFields';
import styles from '../../index.module.scss';
import { cloneDeep } from 'lodash';
import { getPackage } from 'utils/GitUtils';
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
  const queryCondition: any = ItemUtils.getItemType(cloneDeep(formConditions))
    .extend([
      {
        title: FromNames.startCode,
        selectCondition: scripts,
      },
      {
        title: FromNames.buildCode,
        selectCondition: scripts,
      },
    ])
    .values();
  async function showDrawer() {
    console.log(item);
    let list = await getPackage(item.projectData.path);
    list = Object.keys(list).map((item: any) => {
      return {
        label: item,
        value: item,
      };
    });
    setScripts(list);
    form.setFieldsValue(item.projectData);
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
          projectData: {
            ...item.projectData,
            ...values,
          },
        };
        updateProject(item.id, data);
        onClose();
        actions.fetchProjectDetail();
      })
      .catch(() => {});
  }
  return (
    <Drawer
      title="项目信息修改窗口"
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

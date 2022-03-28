/**
 * @file 自定义指令配置
 */
import React from 'react';
import BodyBgc from '../bodyBgc';
import { FormBasics, ItemUtils } from 'xl-study-com';
import { cloneDeep } from 'lodash';
import { SeletePath } from 'components';
import styles from '../index.module.scss';
import { Button, Form } from 'antd';
import { addProject, genID } from 'utils';
import classNames from 'classnames';
export default function index(props: any) {
  const {
    toTop,
    models: { customFormConditions, customFormNames },
    setCurrent,
  } = props;
  const [form] = Form.useForm();
  const queryCondition = ItemUtils.getItemType(cloneDeep(customFormConditions))
    .extend([
      {
        title: customFormNames.orderPath,
        render: SeletePath,
      },
    ])
    .values();
  let fromProps = {
    form: form,
    name: 'test',
  };
  let ItemProps = {
    form: form,
    queryCondition: queryCondition,
  };
  function resetFields() {
    form.resetFields();
  }
  function saveOrder() {
    form
      .validateFields()
      .then((values: any) => {
        addProject({
          ...values,
          id: genID(10) + '',
          type: '5',
        });
        setCurrent(1);
      })
      .catch(() => {});
  }
  return (
    <BodyBgc width={'80%'}>
      <div className={styles.custom_div}>
        <div className={styles.body_div}>
          <div className={styles.title_div}>自定义指令配置</div>
          <div className={styles.from_div}>
            <FormBasics fromProps={fromProps} itemProps={ItemProps} />
          </div>
          <div className={styles.btn_div}>
            <Button type="primary" onClick={toTop}>
              重新选择
            </Button>
            <Button
              type="primary"
              style={{
                marginLeft: 12,
              }}
              onClick={saveOrder}
            >
              确定
            </Button>
            <Button
              onClick={resetFields}
              danger
              style={{
                marginLeft: 12,
              }}
              type="primary"
            >
              重置
            </Button>
          </div>
        </div>
      </div>
    </BodyBgc>
  );
}

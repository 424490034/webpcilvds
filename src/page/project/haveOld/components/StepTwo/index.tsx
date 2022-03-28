/**
 * @file 项目配置
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import BodyBgc from '../bodyBgc';
import styles from '../index.module.scss';
import { Button } from 'antd';
import { FormBasics } from 'xl-study-com';
import { cloneDeep } from 'lodash';
import { ItemUtils } from 'xl-study-com';

function index(props: any, ref: any) {
  const {
    oneData,
    models: {},
    form,
    formFields,
    formInit,
    twoDataChange,
    setCurrent,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  // 进行form表单配置
  const queryCondition: any = ItemUtils.getItemType(
    cloneDeep(formFields)
  ).values();
  useImperativeHandle(ref, () => ({
    register,
  }));
  function register() {
    form.resetFields();
    form.setFieldsValue(formInit);
  }
  let ItemProps = {
    form: form,
    queryCondition: queryCondition,
  };
  let fromProps = {
    form: form,
    name: 'test',
  };
  function sumbitData() {
    setLoading(true);
    form
      .validateFields()
      .then((values: any) => {
        setLoading(false);
        twoDataChange(values);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  function toLeft() {
    setCurrent(0);
  }
  return (
    <BodyBgc width={'80%'}>
      <div className={styles.steps_two_div}>
        <div className={styles.body_div}>
          <div className={styles.title_div}>项目基础配置</div>
          <div className={styles.from_div}>
            <FormBasics fromProps={fromProps} itemProps={ItemProps} />
          </div>
          <div className={styles.btn_div}>
            <Button disabled={loading} type="primary" onClick={toLeft}>
              上一步
            </Button>
            <Button
              style={{
                marginLeft: 12,
              }}
              loading={loading}
              onClick={sumbitData}
              type="primary"
            >
              下一步
            </Button>
            <Button
              onClick={register}
              disabled={loading}
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
export default forwardRef(index);

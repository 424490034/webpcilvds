/**
 * @file 项目配置
 */
import React, { useImperativeHandle, forwardRef } from 'react';
import BodyBgc from '../bodyBgc';
import styles from '../index.module.scss';
import { Form } from 'antd';
import { ItemType } from 'xl-study-com';
function index(props: any, ref: any) {
  const {
    setCurrent,
    models: { formConditions },
  } = props;
  console.log(formConditions);

  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    register,
  }));
  function register() {
    form.resetFields();
  }
  let ItemProps = {
    queryCondition: formConditions,
    form,
  };
  return (
    <BodyBgc width={'80%'}>
      <div className={styles.steps_two_div}>
        <div className={styles.body_div}>
          <Form form={form}>
            <ItemType {...ItemProps} />
          </Form>
        </div>
      </div>
    </BodyBgc>
  );
}
export default forwardRef(index);

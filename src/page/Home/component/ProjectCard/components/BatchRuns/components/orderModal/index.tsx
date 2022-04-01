/**
 * @新增/修改批量执行指令数据
 */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { EnhanceModalForm } from 'xl-study-com';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { addBatchRunsOrders, editBatchRunsOrders, genID } from 'utils';
interface IProps {
  models: any;
  actions: any;
}
function index(props: IProps, ref: any) {
  const {
    models: { batchFormConditions },
    actions,
  } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  // 用户当前选中的匹配数据
  const [selectData, setSelectData] = useState<any>({});
  // 用户是否为修改数据
  const [oldData, setOldData] = useState<any>({});
  useImperativeHandle(ref, () => ({
    showModel,
  }));
  function showModel(selectList: any, editData?: any) {
    setSelectData(selectList);
    if (!isEmpty(editData)) {
      form.setFieldsValue({
        name: editData.name,
      });
      setOldData(editData);
    }
    setVisible(true);
  }
  function cancelModel() {
    setVisible(false);
  }
  function saveDownloadFile(values: any) {
    if (!isEmpty(oldData)) {
      editBatchRunsOrders(oldData.id, {
        id: oldData.id,
        name: values.name,
        batchData: selectData,
      });
    } else {
      addBatchRunsOrders({
        id: genID(8) + '',
        name: values.name,
        batchData: selectData,
      });
    }
    cancelModel();
    actions.fetchProjectReload();
  }
  const modalProps = {
    form,
    visible,
    queryCondition: batchFormConditions,
    // width: 740,
    title: '快捷指令操作',
    bodyStyle: {
      padding: '20px',
    },
    onCancel: cancelModel,
    onSave: saveDownloadFile,
    saveText: '确定',
  };
  return <EnhanceModalForm {...modalProps} />;
}
export default forwardRef(index);

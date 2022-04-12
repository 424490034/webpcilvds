/**
 * @file 图片压缩组件
 */
import { Button, Form, Space } from 'antd';
import React, { useState } from 'react';
import { FormBasics, ItemUtils } from 'xl-study-com';
import { SeletePath, FilePath } from 'components';
import styles from './index.module.scss';
import { cloneDeep } from 'lodash';
import { nodeImg } from 'utils/nodeFS/imgCompress';
const { imgCompress, floderCompress } = nodeImg;
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
export default function index(props: IProps) {
  const {
    models: { ToolFormFields = {} },
    actions,
    show,
  } = props;
  if (show !== 'true') {
    return <></>;
  }
  const {
    imgCompress: {
      imgCompressFormConditions = [],
      imgCompressFormNames = {},
      initKeys = [],
      initImgKeys = [],
    } = {},
  } = ToolFormFields;
  const [showKeys, setShowKeys] = useState(initKeys);
  // 进行form表单配置
  const queryCondition: any = ItemUtils.getItemType(
    cloneDeep(imgCompressFormConditions)
  )
    .extend([
      {
        title: imgCompressFormNames.type,
        componentsConfig: {
          onChange: (e: any) => {
            const value: string = e.target.value;
            if (value === '2') {
              setShowKeys(initImgKeys);
            } else {
              setShowKeys(initKeys);
            }
          },
        },
      },
      {
        title: imgCompressFormNames.folderPath,
        render: SeletePath,
      },
      {
        title: imgCompressFormNames.imgPath,
        render: FilePath,
      },
      {
        title: imgCompressFormNames.outputPath,
        render: SeletePath,
      },
    ])
    .pick(showKeys)
    .values();
  const [form] = Form.useForm();
  const fromProps = {
    form: form,
  };
  const itemProps = {
    form: form,
    queryCondition,
  };
  function init() {
    form.resetFields();
    setShowKeys(initKeys);
  }
  function start() {
    form
      .validateFields()
      .then((values: any) => {
        console.log(values);
        const type = values[imgCompressFormNames.type];
        const outPath = values[imgCompressFormNames.outputPath];
        // 文件夹批量转换
        if (type === '1') {
          const floderPath = values[imgCompressFormNames.folderPath];
          floderCompress(
            // 文件夹路径
            floderPath,
            // 导出路径
            outPath
          );
        }
        // 图片转换
        if (type === '2') {
          const imgPath = values[imgCompressFormNames.imgPath];
          imgCompress(
            // 图片路径
            imgPath,
            // 导出路径
            outPath
          );
        }
      })
      .catch(() => {});
  }
  return (
    <div className={styles.img_compress_dov}>
      <div className={styles.form_div}>
        <FormBasics fromProps={fromProps} itemProps={itemProps} />
      </div>
      <Space className={styles.btn_div}>
        <Button type="primary" danger onClick={start}>
          压缩
        </Button>
        <Button type="primary" onClick={init}>
          重置
        </Button>
      </Space>
    </div>
  );
}

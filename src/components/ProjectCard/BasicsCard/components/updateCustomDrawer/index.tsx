/**
 * @file 修改指定指令执行逻辑
 */
import { Drawer, Space, Button, Form } from 'antd';
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';
import { Table, TableUtils } from 'xl-study-com';
import { formConditions, FromNames } from '../../config/updateFormFields';
import styles from '../../index.module.scss';
import { cloneDeep } from 'lodash';
import { getPackage } from 'utils/GitUtils';
import { updateProject } from 'utils';
import { tableList } from '../../config/tablefields';
import AddModal from './AddModal';
const { getColumns } = TableUtils;
function index(props: any, ref: any) {
  const { item, actions } = props;
  const modelRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const [scripts, setScripts] = useState([]);
  const [cusList, setCusList] = useState([]);
  const [cusCriptEnum, setCusCriptEnum] = useState([]);
  useImperativeHandle(ref, () => ({
    showDrawer,
  }));
  console.log(cusList);

  async function showDrawer() {
    let list = await getPackage(item.projectData.path);
    list = Object.keys(list).map((item: any) => {
      return {
        label: item,
        value: item,
      };
    });
    setScripts(list);
    if (item.customData) {
      let data: any = [];
      Object.keys(item.customData).map((name: string) => {
        data.push(item.customData[name]);
      });
      setCusList(data);
    }
    setVisible(true);
  }
  function onClose() {
    setVisible(false);
  }

  function onEdit() {
    let data = {
      ...item,
      customData: cusList,
    };
    updateProject(item.id, data);
    onClose();
    actions.fetchProjectDetail();
  }
  function removeData(id: string) {
    let data = cusList.filter((item: any) => item != id);
    setCusList(data);
  }
  const extraColumns: any = [
    {
      key: 'operate',
      name: '操作',
      fixed: 'right',
      render: (text: any, { id }: any) => {
        return (
          <Space>
            <Button
              type="link"
              style={{
                padding: 0,
              }}
              danger
              onClick={() => {
                removeData(id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const tableProps = {
    scroll: { y: 200 },
    rowKey: 'id',
    columns: getColumns(tableList).extend(extraColumns).values(),
    dataSource: cusList,
    style: {
      marginTop: 20,
    },
    pagination: false,
  };
  function addData(data: any) {
    setCusList([...cusList, data]);
  }
  function showDrawe() {
    getNewEnum();
    modelRef.current.showModel();
  }
  function getNewEnum() {
    if (Array.isArray(cusList) && cusList.length > 0) {
      let keys = cusList.map((item: any) => item.seleteOrder);
      let datas = scripts.filter((res: any) => keys.indexOf(res.label) === -1);
      setCusCriptEnum(datas);
    } else {
      setCusCriptEnum(scripts);
    }
  }
  return (
    <Drawer
      title="定制指令执行逻辑修改"
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
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={showDrawe}>
            新增定制化
          </Button>
        </div>
        <Table {...tableProps} />
      </div>
      <AddModal
        item={item}
        scriptEnum={cusCriptEnum}
        ref={modelRef}
        addData={addData}
        actions={actions}
      />
    </Drawer>
  );
}
export default forwardRef(index);
